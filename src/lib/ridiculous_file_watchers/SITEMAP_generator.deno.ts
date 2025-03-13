import { ensureFileSync } from "@std/fs";
import path from "node:path";
import { deferFrom } from "~/lib/lib.dual.ts";
import { concatMap, debounceTime, filter, startWith, switchMap } from "rxjs";

interface FSFile {
  path: string;
  filename?: string;
  dirname: string;
  super_extension?: string;
  extension?: string;
  readSync?: string;
  publicPath?: string;
  importPath?: string;
  linkTag?: string;
  scriptTag?: string;
  dynamicImport?: string;
  index?: string; // Placeholder for index function
}

export const MakeSITEMAP_lol = (
  {
    outputFilePath,
    cwd = process.cwd(),
    extensions = [
      "ts",
      "tsx",
      "md",
      "css",
      "html",
      "json",
      "jsonc",
      "mts",
      "jpg",
      "png",
      "svg",
      "gif",
      "mp4",
    ],
  }: { outputFilePath: string; extensions?: string[]; cwd?: string },
) => {
  type FSRecord = Record<string, FSFile>;

  // Function to get file metadata
  function getFileMetadata(filePath: string, isDirectory: boolean): FSFile {
    const ext = isDirectory ? "" : path.extname(filePath);
    const basename = path.basename(filePath);
    const dirname = path.dirname(filePath);
    const relativePath = path.relative(cwd, filePath);

    const fsFile: FSFile = {
      path: relativePath,
      filename: isDirectory ? undefined : basename,
      dirname: dirname,
      super_extension: isDirectory
        ? undefined
        : basename.split(".").slice(1).join("."),
      extension: isDirectory ? undefined : ext.slice(1),
      importPath: relativePath.replace("src", "~"),
    };

    if (!isDirectory) {
      fsFile.readSync = `<FUN>() => Deno.readTextFileSync('${filePath}')</FUN>`;

      if (["ts", "tsx", "js", "jsx"].includes(ext.slice(1))) {
        fsFile.dynamicImport = `<FUN>() => import('./${
          path.join("./", relativePath.replace("src/", ""))
        }')</FUN>`;
      }

      if (ext === ".css") {
        fsFile.publicPath = `/${relativePath}`;
        fsFile.linkTag =
          `<FUN>() => \`<link rel='stylesheet' href='${fsFile.publicPath}' />\`</FUN>`;
      }
    } else {
      // fsFile.index =
      //   `<FUN>() => Object.fromEntries(Object.entries(FS).filter(([key, value])=>key.startsWith('${relativePath}/')))as{[K in keyof typeof FS extends \`${relativePath}\${string}\` ? K : never]: typeof FS[K]}</FUN>`;
    }

    return fsFile;
  }

  // Function to generate FS record using `find`
  async function generateFS() {
    const cmd = new Deno.Command("bash", {
      args: [
        "-c",
        `find src ${
          extensions.map((i) => `-name '*.${i}'`).join(" -o ")
        } -o -type d`,
      ],
      stdout: "piped",
      stderr: "piped",
    });
    const { code, stdout, stderr } = await cmd.output();
    // stdout & stderr are a Uint8Array
    const output = new TextDecoder().decode(stdout).split("\n").filter(Boolean); // hello world
    // console.log({ output });

    const fsRecord: FSRecord = {};
    for (const filePath of output) {
      const isDirectory = (await Deno.lstat(filePath)).isDirectory;
      const metadata = getFileMetadata(filePath, isDirectory);
      fsRecord[path.relative(cwd, filePath)] = metadata;
    }
    // console.log({ fsRecord });
    writeFSToFile(fsRecord);
  }

  // Function to write FS record to a TypeScript file
  function writeFSToFile(record: FSRecord) {
    const content = `
type Imploder<T> = T[keyof T];

export const FS = ${
      JSON.stringify(record, null, 2).replaceAll(
        /"<FUN>(.*)<\/FUN>"/g,
        "$1",
      )
    } as const;

export type FILESYSTEM = typeof FS;

export const SITEMAP = {
  startsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.startsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends \`\${T}\${string}\` ? K : never
      ]: FILESYSTEM[K];
    }
  >[],
  endsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.endsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends \`\${string}\${T}\` ? K : never
      ]: FILESYSTEM[K];
    }
  >[],
  includes: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.includes(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends \`\${string}\${T}\${string}\` ? K : never
      ]: FILESYSTEM[K];
    }
  >[]
};
`;
    ensureFileSync(outputFilePath);
    const it = Deno.readTextFileSync(outputFilePath);
    if (it !== content) {
      console.log("Need to rewrite SITEMAP");
      Deno.writeTextFileSync(outputFilePath, content);
    } else {
      console.log("Nah, these files are the same i think");
    }
  }

  const findSrcChange = deferFrom(() =>
    Deno.watchFs(`${cwd}/src`, { recursive: true })
  ).pipe(
    filter((i) =>
      (i.kind === "create" || i.kind === "remove" || i.kind === "rename") &&
      i.paths.some((i) => extensions.includes(path.extname(i)))
    ),
    startWith(null),
    debounceTime(1000),
    concatMap(
      () => generateFS(),
    ),
  );

  // Start the process
  return findSrcChange;
};

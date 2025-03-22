type Imploder<T> = T[keyof T]
export const FS = {
  "src/blog/hello-world/index.css": {
    path: "src/blog/hello-world/index.css",
    filename: "index.css",
    dirname: "src/blog/hello-world",
    super_extension: "css",
    extension: "css",
    importPath:
      "/Users/chrishafley/blog/hello-world/index.css",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/index.css",
      ),

    linkTag: () =>
      "<link rel='stylesheet' href='/blog/hello-world/index.css'/>",
    publicPath: "/blog/hello-world/index.css",
  },

  "src/blog/hello-world/index.render.deno.tsx": {
    path: "src/blog/hello-world/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/blog/hello-world",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath:
      "/Users/chrishafley/blog/hello-world/index.render.deno.tsx",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/index.render.deno.tsx",
      ),
    dynamicImport: () =>
      import(
        "/Users/chrishafley/blog/hello-world/index.render.deno.tsx"
      ),
    linkTag: () =>
      "<script type='module' src='/blog/hello-world/index.render.deno.tsx' />",
  },

  "src/blog/hello-world/example.png": {
    path: "src/blog/hello-world/example.png",
    filename: "example.png",
    dirname: "src/blog/hello-world",
    super_extension: "png",
    extension: "png",
    importPath:
      "/Users/chrishafley/blog/hello-world/example.png",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/example.png",
      ),

    imgTag: (alt: string) =>
      `<img alt="${alt}" src='/blog/hello-world/example.png' />`,
    publicPath: "/blog/hello-world/example.png",
  },

  "src/SITEMAP.deno.ts": {
    path: "src/SITEMAP.deno.ts",
    filename: "SITEMAP.deno.ts",
    dirname: "src",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "/Users/chrishafley/SITEMAP.deno.ts",
    readSync: () =>
      Deno.readTextFileSync("src/SITEMAP.deno.ts"),
    dynamicImport: () =>
      import("/Users/chrishafley/SITEMAP.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/SITEMAP.deno.ts' />",
  },
} as const
export type FILESYSTEM = typeof FS
export const SITEMAP = {
  startsWith: <T extends string>(it: T) =>
    Object.entries(FS)
      .filter(([k, v]) => k.startsWith(it))
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${T}${string}`
        ? K
        : never]: FILESYSTEM[K]
    }>[],
  endsWith: <T extends string>(it: T) =>
    Object.entries(FS)
      .filter(([k, v]) => k.endsWith(it))
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${string}${T}`
        ? K
        : never]: FILESYSTEM[K]
    }>[],
  includes: <T extends string>(it: T) =>
    Object.entries(FS)
      .filter(([k, v]) => k.includes(it))
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${string}${T}${string}`
        ? K
        : never]: FILESYSTEM[K]
    }>[],
}

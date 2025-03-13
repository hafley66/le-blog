/** @jsxImportSource ./rxjs-vhtml */
/** @jsxImportSourceTypes ./rxjs-vhtml */
import _ from "lodash";

import {
  MonoTypeOperatorFunction,
  Subject,
  catchError,
  debounceTime,
  from,
  pipe,
  switchMap,
  takeUntil,
  timer,
} from "rxjs";
import {
  FootnoteFlat,
  HeaderFlat,
  HeaderProps,
  LayoutProps,
  Layout as Layout_,
  TOC,
} from "./0_Layout.dual.tsx";
import { Remark } from "./00_Remark2.deno.tsx";

const MARKDOWN_REGEX_TO_NAIVELY_SPLIT_HEADERS__BEWARE_HASH_COMMENTS =
  /(#{2,} .+?)\n([\s\S]*?)(?=\n#{2,} |\n*$|$)/g;

export const Render$ = (
  importMetaFilename: string,
  tocTreePipe: MonoTypeOperatorFunction<any> = takeUntil<any>(
    timer(500),
  ),
) => {
  const OUTFILE = importMetaFilename.replace(
    ".render.deno.tsx",
    ".vite.html",
  );

  const writeToDist = pipe(
    debounceTime<string>(1000),
    switchMap(
      async (content: string) => (
        console.log("Writing...", OUTFILE, content.length),
        {
          writer: await Deno.writeTextFile(
            OUTFILE,
            content.replace(
              // deno-lint-ignore no-control-regex
              // biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
              /[\u0000-\u001F\u007F-\u009F]/g,
              "",
            ),
          ),
          content,
          renderedPath: OUTFILE,
          dirname: import.meta.dirname,
          filename: import.meta.filename,
        }
      ),
    ),
    catchError(e => {
      console.error(e);
      throw e;
    }),
  );
  // As we render H1...6, we capture their props as subject.next and we reduce over
  const header$ = new Subject<HeaderFlat>();
  const footnote$ = new Subject<FootnoteFlat>();

  const md = (
    strings: TemplateStringsArray,
    ...values: any[]
  ) => {
    const it = strings.join(" ");
    const sections = [
      ...it.matchAll(
        MARKDOWN_REGEX_TO_NAIVELY_SPLIT_HEADERS__BEWARE_HASH_COMMENTS,
      ),
    ];

    const them = sections
      .map(i => ({
        match: i[1],
        header: i[1].replace(/#{2,} /gi, ""),
        depth: i[1].split(/ /gi)[0].length,
        body: i[2],
      }))
      .map(i => ({
        ...i,
        id: _.kebabCase(i.header),
        value: i.header,
      }));

    const { byId, stack } = createNestedHeaders(them);
    const ConstructedMarkdown = them.map(
      it => `

${"#".repeat(it.depth)} ${byId[it.id].address} ${it.header}
${it.body}

`,
    );

    const meta = {
      sections: ConstructedMarkdown,
      byId,
      stack,
    };
    const out = from(
      Remark(ConstructedMarkdown.join("\n")),
    );

    Object.assign(out, meta);

    console.log({ ConstructedMarkdown });
    return {
      toc: TOC({ tocRoot: stack[0] }),
      children: out as typeof out & typeof meta,
    };
  };

  const createNestedHeaders = (flat: HeaderFlat[]) => {
    const stack = [
      {
        depth: 1,
        children: [],
        id: "",
        index: 0,
        parent: null,
        value: "root",
        slug: "#root",
        address: "",
      } as HeaderProps,
    ];
    const byId: Record<string, HeaderProps> = {};
    flat.forEach((next, index) => {
      const node: HeaderProps = {
        ...next,
        id: _.kebabCase(next.value),
        index,
        children: [],
        parent: null,
        get address() {
          let curr: HeaderProps | null = this;
          let n = [] as number[];
          while (curr) {
            n.push(curr.index);
            curr = curr.parent;
          }
          return `${n
            .reverse()
            .slice(1 /* slice the root h1 off */)
            .map(
              i => i + 1 /* Users start at index 1 base */,
            )
            .join(".")}. `;
        },
      };

      // Pop levels until we find the correct parent for this heading
      while (stack[stack.length - 1].depth >= next.depth) {
        stack.pop();
      }

      // Add node to current parent and push it onto current level
      node.index = stack[stack.length - 1].children.length;
      stack[stack.length - 1].children.push(node);
      node.parent = stack[stack.length - 1];
      stack.push(node);
      byId[node.id] = node;
    });
    return {
      byId,
      stack,
    };
  };

  const Layout = (props: LayoutProps) =>
    Layout_({
      ...props,
    });

  const SSGLayout = (props: LayoutProps) =>
    Layout(props).pipe(writeToDist);

  return {
    header$,
    md,
    writeToDist,
    Layout,
    SSGLayout,
  };
};

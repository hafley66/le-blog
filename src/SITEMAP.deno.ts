import { readFileSync } from "node:fs"
type Imploder<T> = T[keyof T]
export const FS = {
  "src/home/index.render.deno.tsx": {
    path: "src/home/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/home",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath: "~/home/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/home/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/home/index.render.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/home/index.render.deno.tsx'></script>",
    publicPath: "/home/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/home/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/home/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /home/index.render.deno.tsx
${readFileSync("src/home/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/home/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/main_ssg.deno.ts": {
    path: "src/main_ssg.deno.ts",
    filename: "main_ssg.deno.ts",
    dirname: "src",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/main_ssg.deno.ts",
    readSync: () =>
      readFileSync("src/main_ssg.deno.ts").toString(),
    dynamicImport: () => import("~/main_ssg.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/main_ssg.deno.ts'></script>",
    publicPath: "/main_ssg.deno.ts",
    markdownDemo: (diffName = "main_ssg.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/main_ssg.deno.ts").toString()}
~~~
<script type='module' src='/main_ssg.deno.ts' demo-for='main_ssg.deno.ts'></script>
`,
    frontendDemo: (diffName = "main_ssg.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /main_ssg.deno.ts
${readFileSync("src/main_ssg.deno.ts").toString()}
~~~
<script type='module' src='/main_ssg.deno.ts' demo-for='main_ssg.deno.ts'></script>
`,
  },

  "src/index.html": {
    path: "src/index.html",
    filename: "index.html",
    dirname: "src",
    super_extension: "html",
    extension: "html",
    importPath: "~/index.html",
    readSync: () =>
      readFileSync("src/index.html").toString(),

    public: "/index.html",
  },

  "src/resume/resume.html": {
    path: "src/resume/resume.html",
    filename: "resume.html",
    dirname: "src/resume",
    super_extension: "html",
    extension: "html",
    importPath: "~/resume/resume.html",
    readSync: () =>
      readFileSync("src/resume/resume.html").toString(),

    public: "/resume/resume.html",
  },

  "src/resume/index.css": {
    path: "src/resume/index.css",
    filename: "index.css",
    dirname: "src/resume",
    super_extension: "css",
    extension: "css",
    importPath: "~/resume/index.css",
    readSync: () =>
      readFileSync("src/resume/index.css").toString(),

    linkTag: () =>
      "<link rel='stylesheet' href='/resume/index.css'/>",
    publicPath: "/resume/index.css",
  },

  "src/resume/index.render.deno.tsx": {
    path: "src/resume/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/resume",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath: "~/resume/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/resume/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/resume/index.render.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/resume/index.render.deno.tsx'></script>",
    publicPath: "/resume/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/resume/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/resume/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /resume/index.render.deno.tsx
${readFileSync("src/resume/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/resume/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/BASH.deno.ts": {
    path: "src/BASH.deno.ts",
    filename: "BASH.deno.ts",
    dirname: "src",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/BASH.deno.ts",
    readSync: () =>
      readFileSync("src/BASH.deno.ts").toString(),
    dynamicImport: () => import("~/BASH.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/BASH.deno.ts'></script>",
    publicPath: "/BASH.deno.ts",
    markdownDemo: (diffName = "BASH.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/BASH.deno.ts").toString()}
~~~
<script type='module' src='/BASH.deno.ts' demo-for='BASH.deno.ts'></script>
`,
    frontendDemo: (diffName = "BASH.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /BASH.deno.ts
${readFileSync("src/BASH.deno.ts").toString()}
~~~
<script type='module' src='/BASH.deno.ts' demo-for='BASH.deno.ts'></script>
`,
  },

  "src/markdown.deno.mts": {
    path: "src/markdown.deno.mts",
    filename: "markdown.deno.mts",
    dirname: "src",
    super_extension: "deno.mts",
    extension: "mts",
    importPath: "~/markdown.deno.mts",
    readSync: () =>
      readFileSync("src/markdown.deno.mts").toString(),

    public: "/markdown.deno.mts",
  },

  "src/shiki.deno.ts": {
    path: "src/shiki.deno.ts",
    filename: "shiki.deno.ts",
    dirname: "src",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/shiki.deno.ts",
    readSync: () =>
      readFileSync("src/shiki.deno.ts").toString(),
    dynamicImport: () => import("~/shiki.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/shiki.deno.ts'></script>",
    publicPath: "/shiki.deno.ts",
    markdownDemo: (diffName = "shiki.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/shiki.deno.ts").toString()}
~~~
<script type='module' src='/shiki.deno.ts' demo-for='shiki.deno.ts'></script>
`,
    frontendDemo: (diffName = "shiki.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /shiki.deno.ts
${readFileSync("src/shiki.deno.ts").toString()}
~~~
<script type='module' src='/shiki.deno.ts' demo-for='shiki.deno.ts'></script>
`,
  },

  "src/blog/how-its-made/this-site/index.render.deno.tsx": {
    path: "src/blog/how-its-made/this-site/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/blog/how-its-made/this-site",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath:
      "~/blog/how-its-made/this-site/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/blog/how-its-made/this-site/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/blog/how-its-made/this-site/index.render.deno.tsx"
      ),
    linkTag: () =>
      "<script type='module' src='/blog/how-its-made/this-site/index.render.deno.tsx'></script>",
    publicPath:
      "/blog/how-its-made/this-site/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/how-its-made/this-site/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/how-its-made/this-site/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/how-its-made/this-site/index.render.deno.tsx
${readFileSync("src/blog/how-its-made/this-site/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/how-its-made/this-site/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/blog/translating-react-to-rxjs/index.render.deno.tsx":
    {
      path: "src/blog/translating-react-to-rxjs/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname: "src/blog/translating-react-to-rxjs",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/translating-react-to-rxjs/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/translating-react-to-rxjs/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/translating-react-to-rxjs/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/translating-react-to-rxjs/index.render.deno.tsx'></script>",
      publicPath:
        "/blog/translating-react-to-rxjs/index.render.deno.tsx",
      markdownDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/translating-react-to-rxjs/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/translating-react-to-rxjs/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/translating-react-to-rxjs/index.render.deno.tsx
${readFileSync("src/blog/translating-react-to-rxjs/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/translating-react-to-rxjs/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx",
      filename: "async.rxjs.deno.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "rxjs.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx",
      markdownDemo: (diffName = "async.rxjs.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx' demo-for='async.rxjs.deno.tsx'></script>
`,
      frontendDemo: (diffName = "async.rxjs.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx' demo-for='async.rxjs.deno.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx",
      filename: "sync.deno.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx",
      markdownDemo: (diffName = "sync.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx' demo-for='sync.deno.tsx'></script>
`,
      frontendDemo: (diffName = "sync.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx' demo-for='sync.deno.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx",
      filename: "state.1.dom.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "1.dom.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx",
      markdownDemo: (diffName = "state.1.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx' demo-for='state.1.dom.tsx'></script>
`,
      frontendDemo: (diffName = "state.1.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx' demo-for='state.1.dom.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx",
      filename: "5_interval.dom.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "dom.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx",
      markdownDemo: (diffName = "5_interval.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx' demo-for='5_interval.dom.tsx'></script>
`,
      frontendDemo: (diffName = "5_interval.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx' demo-for='5_interval.dom.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx",
      filename: "state.2.dom.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "2.dom.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx",
      markdownDemo: (diffName = "state.2.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx' demo-for='state.2.dom.tsx'></script>
`,
      frontendDemo: (diffName = "state.2.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx' demo-for='state.2.dom.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx",
      filename: "6_interval.dom.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "dom.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx",
      markdownDemo: (diffName = "6_interval.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx' demo-for='6_interval.dom.tsx'></script>
`,
      frontendDemo: (diffName = "6_interval.dom.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx' demo-for='6_interval.dom.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx",
      filename: "basic.deno.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx",
      markdownDemo: (diffName = "basic.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx' demo-for='basic.deno.tsx'></script>
`,
      frontendDemo: (diffName = "basic.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx' demo-for='basic.deno.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx",
      filename: "async.deno.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx",
      markdownDemo: (diffName = "async.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx' demo-for='async.deno.tsx'></script>
`,
      frontendDemo: (diffName = "async.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx' demo-for='async.deno.tsx'></script>
`,
    },

  "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx":
    {
      path: "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname:
        "src/blog/unholy-custom-jsx-with-observable-strings",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx'></script>",
      publicPath:
        "/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
      markdownDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx
${readFileSync("src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    },

  "src/blog/1-how-i-made-this-site/server_info.png": {
    path: "src/blog/1-how-i-made-this-site/server_info.png",
    filename: "server_info.png",
    dirname: "src/blog/1-how-i-made-this-site",
    super_extension: "png",
    extension: "png",
    importPath:
      "~/blog/1-how-i-made-this-site/server_info.png",
    readSync: () =>
      readFileSync(
        "src/blog/1-how-i-made-this-site/server_info.png",
      ).toString(),

    imgTag: (alt: string) =>
      `<img alt="${alt}" src='/blog/1-how-i-made-this-site/server_info.png' />`,
    publicPath:
      "/blog/1-how-i-made-this-site/server_info.png",
  },

  "src/blog/1-how-i-made-this-site/porkbun.png": {
    path: "src/blog/1-how-i-made-this-site/porkbun.png",
    filename: "porkbun.png",
    dirname: "src/blog/1-how-i-made-this-site",
    super_extension: "png",
    extension: "png",
    importPath: "~/blog/1-how-i-made-this-site/porkbun.png",
    readSync: () =>
      readFileSync(
        "src/blog/1-how-i-made-this-site/porkbun.png",
      ).toString(),

    imgTag: (alt: string) =>
      `<img alt="${alt}" src='/blog/1-how-i-made-this-site/porkbun.png' />`,
    publicPath: "/blog/1-how-i-made-this-site/porkbun.png",
  },

  "src/blog/1-how-i-made-this-site/index.render.deno.tsx": {
    path: "src/blog/1-how-i-made-this-site/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/blog/1-how-i-made-this-site",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath:
      "~/blog/1-how-i-made-this-site/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/blog/1-how-i-made-this-site/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/blog/1-how-i-made-this-site/index.render.deno.tsx"
      ),
    linkTag: () =>
      "<script type='module' src='/blog/1-how-i-made-this-site/index.render.deno.tsx'></script>",
    publicPath:
      "/blog/1-how-i-made-this-site/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/1-how-i-made-this-site/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/1-how-i-made-this-site/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/1-how-i-made-this-site/index.render.deno.tsx
${readFileSync("src/blog/1-how-i-made-this-site/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/1-how-i-made-this-site/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx":
    {
      path: "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
      filename: "sample.deno.tsx",
      dirname:
        "src/blog/rxjs/recreate-react-query-with-rxjs",
      super_extension: "deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx'></script>",
      publicPath:
        "/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
      markdownDemo: (diffName = "sample.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx").toString()}
~~~
<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx' demo-for='sample.deno.tsx'></script>
`,
      frontendDemo: (diffName = "sample.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx
${readFileSync("src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx").toString()}
~~~
<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx' demo-for='sample.deno.tsx'></script>
`,
    },

  "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx":
    {
      path: "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname:
        "src/blog/rxjs/recreate-react-query-with-rxjs",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx'></script>",
      publicPath:
        "/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
      markdownDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx
${readFileSync("src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    },

  "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx":
    {
      path: "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname:
        "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx'></script>",
      publicPath:
        "/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
      markdownDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx
${readFileSync("src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    },

  "src/blog/index.render.deno.tsx": {
    path: "src/blog/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/blog",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath: "~/blog/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/blog/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/blog/index.render.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/blog/index.render.deno.tsx'></script>",
    publicPath: "/blog/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/index.render.deno.tsx
${readFileSync("src/blog/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/blog/make-your-own-sitemap-with-typescript/example.css":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/example.css",
      filename: "example.css",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript",
      super_extension: "css",
      extension: "css",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/example.css",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/example.css",
        ).toString(),

      linkTag: () =>
        "<link rel='stylesheet' href='/blog/make-your-own-sitemap-with-typescript/example.css'/>",
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/example.css",
    },

  "src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx'></script>",
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx",
      markdownDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    },

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css",
      filename: "index.css",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      super_extension: "css",
      extension: "css",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css",
        ).toString(),

      linkTag: () =>
        "<link rel='stylesheet' href='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css'/>",
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css",
    },

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx",
      filename: "index2.render.deno.tsx",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx'></script>",
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx",
      markdownDemo: (
        diffName = "index2.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx' demo-for='index2.render.deno.tsx'></script>
`,
      frontendDemo: (
        diffName = "index2.render.deno.tsx",
      ) => `
~~~tsx
// @@filename ${diffName}
// @@src /blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx' demo-for='index2.render.deno.tsx'></script>
`,
    },

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png",
      filename: "example.png",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      super_extension: "png",
      extension: "png",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png",
        ).toString(),

      imgTag: (alt: string) =>
        `<img alt="${alt}" src='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png' />`,
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png",
    },

  "src/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts",
      filename: "SITEMAP.deno.ts",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript/src",
      super_extension: "deno.ts",
      extension: "ts",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts'></script>",
      publicPath:
        "/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts",
      markdownDemo: (diffName = "SITEMAP.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts' demo-for='SITEMAP.deno.ts'></script>
`,
      frontendDemo: (diffName = "SITEMAP.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts
${readFileSync("src/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts").toString()}
~~~
<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts' demo-for='SITEMAP.deno.ts'></script>
`,
    },

  "src/bash/_.watch.add-relative-fs-info.bash": {
    path: "src/bash/_.watch.add-relative-fs-info.bash",
    filename: "_.watch.add-relative-fs-info.bash",
    dirname: "src/bash",
    super_extension: "watch.add-relative-fs-info.bash",
    extension: "bash",
    importPath: "~/bash/_.watch.add-relative-fs-info.bash",
    readSync: () =>
      readFileSync(
        "src/bash/_.watch.add-relative-fs-info.bash",
      ).toString(),

    public: "/bash/_.watch.add-relative-fs-info.bash",
  },

  "src/bash/sitemap-watcher.bash": {
    path: "src/bash/sitemap-watcher.bash",
    filename: "sitemap-watcher.bash",
    dirname: "src/bash",
    super_extension: "bash",
    extension: "bash",
    importPath: "~/bash/sitemap-watcher.bash",
    readSync: () =>
      readFileSync(
        "src/bash/sitemap-watcher.bash",
      ).toString(),

    public: "/bash/sitemap-watcher.bash",
  },

  "src/bash/rsync-it.bash": {
    path: "src/bash/rsync-it.bash",
    filename: "rsync-it.bash",
    dirname: "src/bash",
    super_extension: "bash",
    extension: "bash",
    importPath: "~/bash/rsync-it.bash",
    readSync: () =>
      readFileSync("src/bash/rsync-it.bash").toString(),

    public: "/bash/rsync-it.bash",
  },

  "src/bash/_.watch.sitemap.bash": {
    path: "src/bash/_.watch.sitemap.bash",
    filename: "_.watch.sitemap.bash",
    dirname: "src/bash",
    super_extension: "watch.sitemap.bash",
    extension: "bash",
    importPath: "~/bash/_.watch.sitemap.bash",
    readSync: () =>
      readFileSync(
        "src/bash/_.watch.sitemap.bash",
      ).toString(),

    public: "/bash/_.watch.sitemap.bash",
  },

  "src/bash/README.md": {
    path: "src/bash/README.md",
    filename: "README.md",
    dirname: "src/bash",
    super_extension: "md",
    extension: "md",
    importPath: "~/bash/README.md",
    readSync: () =>
      readFileSync("src/bash/README.md").toString(),

    public: "/bash/README.md",
  },

  "src/bash/deno-settings-watcher.bash": {
    path: "src/bash/deno-settings-watcher.bash",
    filename: "deno-settings-watcher.bash",
    dirname: "src/bash",
    super_extension: "bash",
    extension: "bash",
    importPath: "~/bash/deno-settings-watcher.bash",
    readSync: () =>
      readFileSync(
        "src/bash/deno-settings-watcher.bash",
      ).toString(),

    public: "/bash/deno-settings-watcher.bash",
  },

  "src/bash/_.watch.images.optimizer.bash": {
    path: "src/bash/_.watch.images.optimizer.bash",
    filename: "_.watch.images.optimizer.bash",
    dirname: "src/bash",
    super_extension: "watch.images.optimizer.bash",
    extension: "bash",
    importPath: "~/bash/_.watch.images.optimizer.bash",
    readSync: () =>
      readFileSync(
        "src/bash/_.watch.images.optimizer.bash",
      ).toString(),

    public: "/bash/_.watch.images.optimizer.bash",
  },

  "src/tags/index.render.deno.tsx": {
    path: "src/tags/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/tags",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath: "~/tags/index.render.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/tags/index.render.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/tags/index.render.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/tags/index.render.deno.tsx'></script>",
    publicPath: "/tags/index.render.deno.tsx",
    markdownDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/tags/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/tags/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
    frontendDemo: (diffName = "index.render.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /tags/index.render.deno.tsx
${readFileSync("src/tags/index.render.deno.tsx").toString()}
~~~
<script type='module' src='/tags/index.render.deno.tsx' demo-for='index.render.deno.tsx'></script>
`,
  },

  "src/vite-env.d.ts": {
    path: "src/vite-env.d.ts",
    filename: "vite-env.d.ts",
    dirname: "src",
    super_extension: "d.ts",
    extension: "ts",
    importPath: "~/vite-env.d.ts",
    readSync: () =>
      readFileSync("src/vite-env.d.ts").toString(),
    dynamicImport: () => import("~/vite-env.d.ts"),
    linkTag: () =>
      "<script type='module' src='/vite-env.d.ts'></script>",
    publicPath: "/vite-env.d.ts",
    markdownDemo: (diffName = "vite-env.d.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/vite-env.d.ts").toString()}
~~~
<script type='module' src='/vite-env.d.ts' demo-for='vite-env.d.ts'></script>
`,
    frontendDemo: (diffName = "vite-env.d.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /vite-env.d.ts
${readFileSync("src/vite-env.d.ts").toString()}
~~~
<script type='module' src='/vite-env.d.ts' demo-for='vite-env.d.ts'></script>
`,
  },

  "src/unix_socket_test/c_child.deno.ts": {
    path: "src/unix_socket_test/c_child.deno.ts",
    filename: "c_child.deno.ts",
    dirname: "src/unix_socket_test",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/unix_socket_test/c_child.deno.ts",
    readSync: () =>
      readFileSync(
        "src/unix_socket_test/c_child.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/unix_socket_test/c_child.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/unix_socket_test/c_child.deno.ts'></script>",
    publicPath: "/unix_socket_test/c_child.deno.ts",
    markdownDemo: (diffName = "c_child.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/unix_socket_test/c_child.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/c_child.deno.ts' demo-for='c_child.deno.ts'></script>
`,
    frontendDemo: (diffName = "c_child.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /unix_socket_test/c_child.deno.ts
${readFileSync("src/unix_socket_test/c_child.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/c_child.deno.ts' demo-for='c_child.deno.ts'></script>
`,
  },

  "src/unix_socket_test/b_child.deno.ts": {
    path: "src/unix_socket_test/b_child.deno.ts",
    filename: "b_child.deno.ts",
    dirname: "src/unix_socket_test",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/unix_socket_test/b_child.deno.ts",
    readSync: () =>
      readFileSync(
        "src/unix_socket_test/b_child.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/unix_socket_test/b_child.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/unix_socket_test/b_child.deno.ts'></script>",
    publicPath: "/unix_socket_test/b_child.deno.ts",
    markdownDemo: (diffName = "b_child.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/unix_socket_test/b_child.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/b_child.deno.ts' demo-for='b_child.deno.ts'></script>
`,
    frontendDemo: (diffName = "b_child.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /unix_socket_test/b_child.deno.ts
${readFileSync("src/unix_socket_test/b_child.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/b_child.deno.ts' demo-for='b_child.deno.ts'></script>
`,
  },

  "src/unix_socket_test/test.deno.ts": {
    path: "src/unix_socket_test/test.deno.ts",
    filename: "test.deno.ts",
    dirname: "src/unix_socket_test",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/unix_socket_test/test.deno.ts",
    readSync: () =>
      readFileSync(
        "src/unix_socket_test/test.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/unix_socket_test/test.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/unix_socket_test/test.deno.ts'></script>",
    publicPath: "/unix_socket_test/test.deno.ts",
    markdownDemo: (diffName = "test.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/unix_socket_test/test.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/test.deno.ts' demo-for='test.deno.ts'></script>
`,
    frontendDemo: (diffName = "test.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /unix_socket_test/test.deno.ts
${readFileSync("src/unix_socket_test/test.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/test.deno.ts' demo-for='test.deno.ts'></script>
`,
  },

  "src/unix_socket_test/a_parent.deno.ts": {
    path: "src/unix_socket_test/a_parent.deno.ts",
    filename: "a_parent.deno.ts",
    dirname: "src/unix_socket_test",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/unix_socket_test/a_parent.deno.ts",
    readSync: () =>
      readFileSync(
        "src/unix_socket_test/a_parent.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/unix_socket_test/a_parent.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/unix_socket_test/a_parent.deno.ts'></script>",
    publicPath: "/unix_socket_test/a_parent.deno.ts",
    markdownDemo: (diffName = "a_parent.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/unix_socket_test/a_parent.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/a_parent.deno.ts' demo-for='a_parent.deno.ts'></script>
`,
    frontendDemo: (diffName = "a_parent.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /unix_socket_test/a_parent.deno.ts
${readFileSync("src/unix_socket_test/a_parent.deno.ts").toString()}
~~~
<script type='module' src='/unix_socket_test/a_parent.deno.ts' demo-for='a_parent.deno.ts'></script>
`,
  },

  "src/lib/shiki/gen.deno.ts": {
    path: "src/lib/shiki/gen.deno.ts",
    filename: "gen.deno.ts",
    dirname: "src/lib/shiki",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/lib/shiki/gen.deno.ts",
    readSync: () =>
      readFileSync("src/lib/shiki/gen.deno.ts").toString(),
    dynamicImport: () => import("~/lib/shiki/gen.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/shiki/gen.deno.ts'></script>",
    publicPath: "/lib/shiki/gen.deno.ts",
    markdownDemo: (diffName = "gen.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/shiki/gen.deno.ts").toString()}
~~~
<script type='module' src='/lib/shiki/gen.deno.ts' demo-for='gen.deno.ts'></script>
`,
    frontendDemo: (diffName = "gen.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/shiki/gen.deno.ts
${readFileSync("src/lib/shiki/gen.deno.ts").toString()}
~~~
<script type='module' src='/lib/shiki/gen.deno.ts' demo-for='gen.deno.ts'></script>
`,
  },

  "src/lib/Hex/index.dual.tsx": {
    path: "src/lib/Hex/index.dual.tsx",
    filename: "index.dual.tsx",
    dirname: "src/lib/Hex",
    super_extension: "dual.tsx",
    extension: "tsx",
    importPath: "~/lib/Hex/index.dual.tsx",
    readSync: () =>
      readFileSync("src/lib/Hex/index.dual.tsx").toString(),
    dynamicImport: () => import("~/lib/Hex/index.dual.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/Hex/index.dual.tsx'></script>",
    publicPath: "/lib/Hex/index.dual.tsx",
    markdownDemo: (diffName = "index.dual.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/Hex/index.dual.tsx").toString()}
~~~
<script type='module' src='/lib/Hex/index.dual.tsx' demo-for='index.dual.tsx'></script>
`,
    frontendDemo: (diffName = "index.dual.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/Hex/index.dual.tsx
${readFileSync("src/lib/Hex/index.dual.tsx").toString()}
~~~
<script type='module' src='/lib/Hex/index.dual.tsx' demo-for='index.dual.tsx'></script>
`,
  },

  "src/lib/rxjs-vhtml/vhtml.deno.ts": {
    path: "src/lib/rxjs-vhtml/vhtml.deno.ts",
    filename: "vhtml.deno.ts",
    dirname: "src/lib/rxjs-vhtml",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/lib/rxjs-vhtml/vhtml.deno.ts",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/vhtml.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/vhtml.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.ts'></script>",
    publicPath: "/lib/rxjs-vhtml/vhtml.deno.ts",
    markdownDemo: (diffName = "vhtml.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.ts' demo-for='vhtml.deno.ts'></script>
`,
    frontendDemo: (diffName = "vhtml.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/vhtml.deno.ts
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.ts' demo-for='vhtml.deno.ts'></script>
`,
  },

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts":
    {
      path: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts",
      filename: "jsx-runtime.d.ts",
      dirname: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      super_extension: "d.ts",
      extension: "ts",
      importPath:
        "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts",
      readSync: () =>
        readFileSync(
          "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts"
        ),
      linkTag: () =>
        "<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts'></script>",
      publicPath:
        "/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts",
      markdownDemo: (diffName = "jsx-runtime.d.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts' demo-for='jsx-runtime.d.ts'></script>
`,
      frontendDemo: (diffName = "jsx-runtime.d.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts' demo-for='jsx-runtime.d.ts'></script>
`,
    },

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js":
    {
      path: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js",
      filename: "jsx-runtime.js",
      dirname: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      super_extension: "js",
      extension: "js",
      importPath:
        "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js",
      readSync: () =>
        readFileSync(
          "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js"
        ),
      linkTag: () =>
        "<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js'></script>",
      publicPath:
        "/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js",
      markdownDemo: (diffName = "jsx-runtime.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js' demo-for='jsx-runtime.js'></script>
`,
      frontendDemo: (diffName = "jsx-runtime.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js' demo-for='jsx-runtime.js'></script>
`,
    },

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts":
    {
      path: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts",
      filename: "jsx-runtime.d.mts",
      dirname: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      super_extension: "d.mts",
      extension: "mts",
      importPath:
        "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts",
      readSync: () =>
        readFileSync(
          "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts",
        ).toString(),

      public:
        "/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts",
    },

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js": {
    path: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js",
    filename: "vhtml.deno.js",
    dirname: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml",
    super_extension: "deno.js",
    extension: "js",
    importPath:
      "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js"
      ),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js'></script>",
    publicPath:
      "/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js",
    markdownDemo: (diffName = "vhtml.deno.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js' demo-for='vhtml.deno.js'></script>
`,
    frontendDemo: (diffName = "vhtml.deno.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js' demo-for='vhtml.deno.js'></script>
`,
  },

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts": {
    path: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts",
    filename: "vhtml.deno.d.ts",
    dirname: "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml",
    super_extension: "deno.d.ts",
    extension: "ts",
    importPath:
      "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts"
      ),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts'></script>",
    publicPath:
      "/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts",
    markdownDemo: (diffName = "vhtml.deno.d.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts' demo-for='vhtml.deno.d.ts'></script>
`,
    frontendDemo: (diffName = "vhtml.deno.d.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts
${readFileSync("src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts' demo-for='vhtml.deno.d.ts'></script>
`,
  },

  "src/lib/rxjs-vhtml/v2/out/lib.dual.js": {
    path: "src/lib/rxjs-vhtml/v2/out/lib.dual.js",
    filename: "lib.dual.js",
    dirname: "src/lib/rxjs-vhtml/v2/out",
    super_extension: "dual.js",
    extension: "js",
    importPath: "~/lib/rxjs-vhtml/v2/out/lib.dual.js",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/out/lib.dual.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/v2/out/lib.dual.js"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.js'></script>",
    publicPath: "/lib/rxjs-vhtml/v2/out/lib.dual.js",
    markdownDemo: (diffName = "lib.dual.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/lib.dual.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.js' demo-for='lib.dual.js'></script>
`,
    frontendDemo: (diffName = "lib.dual.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/lib.dual.js
${readFileSync("src/lib/rxjs-vhtml/v2/out/lib.dual.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.js' demo-for='lib.dual.js'></script>
`,
  },

  "src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts": {
    path: "src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts",
    filename: "lib.dual.d.ts",
    dirname: "src/lib/rxjs-vhtml/v2/out",
    super_extension: "dual.d.ts",
    extension: "ts",
    importPath: "~/lib/rxjs-vhtml/v2/out/lib.dual.d.ts",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/v2/out/lib.dual.d.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.d.ts'></script>",
    publicPath: "/lib/rxjs-vhtml/v2/out/lib.dual.d.ts",
    markdownDemo: (diffName = "lib.dual.d.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.d.ts' demo-for='lib.dual.d.ts'></script>
`,
    frontendDemo: (diffName = "lib.dual.d.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/out/lib.dual.d.ts
${readFileSync("src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/out/lib.dual.d.ts' demo-for='lib.dual.d.ts'></script>
`,
  },

  "src/lib/rxjs-vhtml/v2/jsx-runtime.mts": {
    path: "src/lib/rxjs-vhtml/v2/jsx-runtime.mts",
    filename: "jsx-runtime.mts",
    dirname: "src/lib/rxjs-vhtml/v2",
    super_extension: "mts",
    extension: "mts",
    importPath: "~/lib/rxjs-vhtml/v2/jsx-runtime.mts",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/jsx-runtime.mts",
      ).toString(),

    public: "/lib/rxjs-vhtml/v2/jsx-runtime.mts",
  },

  "src/lib/rxjs-vhtml/v2/package.json": {
    path: "src/lib/rxjs-vhtml/v2/package.json",
    filename: "package.json",
    dirname: "src/lib/rxjs-vhtml/v2",
    super_extension: "json",
    extension: "json",
    importPath: "~/lib/rxjs-vhtml/v2/package.json",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/package.json",
      ).toString(),

    public: "/lib/rxjs-vhtml/v2/package.json",
  },

  "src/lib/rxjs-vhtml/v2/jsx-runtime.tsx": {
    path: "src/lib/rxjs-vhtml/v2/jsx-runtime.tsx",
    filename: "jsx-runtime.tsx",
    dirname: "src/lib/rxjs-vhtml/v2",
    super_extension: "tsx",
    extension: "tsx",
    importPath: "~/lib/rxjs-vhtml/v2/jsx-runtime.tsx",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/jsx-runtime.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/v2/jsx-runtime.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/jsx-runtime.tsx'></script>",
    publicPath: "/lib/rxjs-vhtml/v2/jsx-runtime.tsx",
    markdownDemo: (diffName = "jsx-runtime.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/v2/jsx-runtime.tsx").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/jsx-runtime.tsx' demo-for='jsx-runtime.tsx'></script>
`,
    frontendDemo: (diffName = "jsx-runtime.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/v2/jsx-runtime.tsx
${readFileSync("src/lib/rxjs-vhtml/v2/jsx-runtime.tsx").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/v2/jsx-runtime.tsx' demo-for='jsx-runtime.tsx'></script>
`,
  },

  "src/lib/rxjs-vhtml/vhtml.deno.js": {
    path: "src/lib/rxjs-vhtml/vhtml.deno.js",
    filename: "vhtml.deno.js",
    dirname: "src/lib/rxjs-vhtml",
    super_extension: "deno.js",
    extension: "js",
    importPath: "~/lib/rxjs-vhtml/vhtml.deno.js",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/vhtml.deno.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/vhtml.deno.js"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.js'></script>",
    publicPath: "/lib/rxjs-vhtml/vhtml.deno.js",
    markdownDemo: (diffName = "vhtml.deno.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.js' demo-for='vhtml.deno.js'></script>
`,
    frontendDemo: (diffName = "vhtml.deno.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/vhtml.deno.js
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.js").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.js' demo-for='vhtml.deno.js'></script>
`,
  },

  "src/lib/rxjs-vhtml/index.deno.test.tsx": {
    path: "src/lib/rxjs-vhtml/index.deno.test.tsx",
    filename: "index.deno.test.tsx",
    dirname: "src/lib/rxjs-vhtml",
    super_extension: "deno.test.tsx",
    extension: "tsx",
    importPath: "~/lib/rxjs-vhtml/index.deno.test.tsx",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/index.deno.test.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/index.deno.test.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/index.deno.test.tsx'></script>",
    publicPath: "/lib/rxjs-vhtml/index.deno.test.tsx",
    markdownDemo: (diffName = "index.deno.test.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/index.deno.test.tsx").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/index.deno.test.tsx' demo-for='index.deno.test.tsx'></script>
`,
    frontendDemo: (diffName = "index.deno.test.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/index.deno.test.tsx
${readFileSync("src/lib/rxjs-vhtml/index.deno.test.tsx").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/index.deno.test.tsx' demo-for='index.deno.test.tsx'></script>
`,
  },

  "src/lib/rxjs-vhtml/vhtml.deno.d.ts": {
    path: "src/lib/rxjs-vhtml/vhtml.deno.d.ts",
    filename: "vhtml.deno.d.ts",
    dirname: "src/lib/rxjs-vhtml",
    super_extension: "deno.d.ts",
    extension: "ts",
    importPath: "~/lib/rxjs-vhtml/vhtml.deno.d.ts",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/vhtml.deno.d.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/vhtml.deno.d.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.d.ts'></script>",
    publicPath: "/lib/rxjs-vhtml/vhtml.deno.d.ts",
    markdownDemo: (diffName = "vhtml.deno.d.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.d.ts' demo-for='vhtml.deno.d.ts'></script>
`,
    frontendDemo: (diffName = "vhtml.deno.d.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/rxjs-vhtml/vhtml.deno.d.ts
${readFileSync("src/lib/rxjs-vhtml/vhtml.deno.d.ts").toString()}
~~~
<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.d.ts' demo-for='vhtml.deno.d.ts'></script>
`,
  },

  "src/lib/fs_watcher.deno.ts": {
    path: "src/lib/fs_watcher.deno.ts",
    filename: "fs_watcher.deno.ts",
    dirname: "src/lib",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/lib/fs_watcher.deno.ts",
    readSync: () =>
      readFileSync("src/lib/fs_watcher.deno.ts").toString(),
    dynamicImport: () => import("~/lib/fs_watcher.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/fs_watcher.deno.ts'></script>",
    publicPath: "/lib/fs_watcher.deno.ts",
    markdownDemo: (diffName = "fs_watcher.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/fs_watcher.deno.ts").toString()}
~~~
<script type='module' src='/lib/fs_watcher.deno.ts' demo-for='fs_watcher.deno.ts'></script>
`,
    frontendDemo: (diffName = "fs_watcher.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/fs_watcher.deno.ts
${readFileSync("src/lib/fs_watcher.deno.ts").toString()}
~~~
<script type='module' src='/lib/fs_watcher.deno.ts' demo-for='fs_watcher.deno.ts'></script>
`,
  },

  "src/lib/remark_rehype/remark-plant-uml.deno.ts": {
    path: "src/lib/remark_rehype/remark-plant-uml.deno.ts",
    filename: "remark-plant-uml.deno.ts",
    dirname: "src/lib/remark_rehype",
    super_extension: "deno.ts",
    extension: "ts",
    importPath:
      "~/lib/remark_rehype/remark-plant-uml.deno.ts",
    readSync: () =>
      readFileSync(
        "src/lib/remark_rehype/remark-plant-uml.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/lib/remark_rehype/remark-plant-uml.deno.ts"
      ),
    linkTag: () =>
      "<script type='module' src='/lib/remark_rehype/remark-plant-uml.deno.ts'></script>",
    publicPath:
      "/lib/remark_rehype/remark-plant-uml.deno.ts",
    markdownDemo: (
      diffName = "remark-plant-uml.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/remark_rehype/remark-plant-uml.deno.ts").toString()}
~~~
<script type='module' src='/lib/remark_rehype/remark-plant-uml.deno.ts' demo-for='remark-plant-uml.deno.ts'></script>
`,
    frontendDemo: (
      diffName = "remark-plant-uml.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @@src /lib/remark_rehype/remark-plant-uml.deno.ts
${readFileSync("src/lib/remark_rehype/remark-plant-uml.deno.ts").toString()}
~~~
<script type='module' src='/lib/remark_rehype/remark-plant-uml.deno.ts' demo-for='remark-plant-uml.deno.ts'></script>
`,
  },

  "src/lib/remark_rehype/remarkNestSections.deno.ts": {
    path: "src/lib/remark_rehype/remarkNestSections.deno.ts",
    filename: "remarkNestSections.deno.ts",
    dirname: "src/lib/remark_rehype",
    super_extension: "deno.ts",
    extension: "ts",
    importPath:
      "~/lib/remark_rehype/remarkNestSections.deno.ts",
    readSync: () =>
      readFileSync(
        "src/lib/remark_rehype/remarkNestSections.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import(
        "~/lib/remark_rehype/remarkNestSections.deno.ts"
      ),
    linkTag: () =>
      "<script type='module' src='/lib/remark_rehype/remarkNestSections.deno.ts'></script>",
    publicPath:
      "/lib/remark_rehype/remarkNestSections.deno.ts",
    markdownDemo: (
      diffName = "remarkNestSections.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/remark_rehype/remarkNestSections.deno.ts").toString()}
~~~
<script type='module' src='/lib/remark_rehype/remarkNestSections.deno.ts' demo-for='remarkNestSections.deno.ts'></script>
`,
    frontendDemo: (
      diffName = "remarkNestSections.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @@src /lib/remark_rehype/remarkNestSections.deno.ts
${readFileSync("src/lib/remark_rehype/remarkNestSections.deno.ts").toString()}
~~~
<script type='module' src='/lib/remark_rehype/remarkNestSections.deno.ts' demo-for='remarkNestSections.deno.ts'></script>
`,
  },

  "src/lib/lib.deno.ts": {
    path: "src/lib/lib.deno.ts",
    filename: "lib.deno.ts",
    dirname: "src/lib",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/lib/lib.deno.ts",
    readSync: () =>
      readFileSync("src/lib/lib.deno.ts").toString(),
    dynamicImport: () => import("~/lib/lib.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/lib.deno.ts'></script>",
    publicPath: "/lib/lib.deno.ts",
    markdownDemo: (diffName = "lib.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/lib.deno.ts").toString()}
~~~
<script type='module' src='/lib/lib.deno.ts' demo-for='lib.deno.ts'></script>
`,
    frontendDemo: (diffName = "lib.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/lib.deno.ts
${readFileSync("src/lib/lib.deno.ts").toString()}
~~~
<script type='module' src='/lib/lib.deno.ts' demo-for='lib.deno.ts'></script>
`,
  },

  "src/lib/lib.dom.ts": {
    path: "src/lib/lib.dom.ts",
    filename: "lib.dom.ts",
    dirname: "src/lib",
    super_extension: "dom.ts",
    extension: "ts",
    importPath: "~/lib/lib.dom.ts",
    readSync: () =>
      readFileSync("src/lib/lib.dom.ts").toString(),
    dynamicImport: () => import("~/lib/lib.dom.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/lib.dom.ts'></script>",
    publicPath: "/lib/lib.dom.ts",
    markdownDemo: (diffName = "lib.dom.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/lib.dom.ts").toString()}
~~~
<script type='module' src='/lib/lib.dom.ts' demo-for='lib.dom.ts'></script>
`,
    frontendDemo: (diffName = "lib.dom.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/lib.dom.ts
${readFileSync("src/lib/lib.dom.ts").toString()}
~~~
<script type='module' src='/lib/lib.dom.ts' demo-for='lib.dom.ts'></script>
`,
  },

  "src/lib/leet/add-two-numbers.deno.ts": {
    path: "src/lib/leet/add-two-numbers.deno.ts",
    filename: "add-two-numbers.deno.ts",
    dirname: "src/lib/leet",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/lib/leet/add-two-numbers.deno.ts",
    readSync: () =>
      readFileSync(
        "src/lib/leet/add-two-numbers.deno.ts",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/leet/add-two-numbers.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/leet/add-two-numbers.deno.ts'></script>",
    publicPath: "/lib/leet/add-two-numbers.deno.ts",
    markdownDemo: (
      diffName = "add-two-numbers.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/leet/add-two-numbers.deno.ts").toString()}
~~~
<script type='module' src='/lib/leet/add-two-numbers.deno.ts' demo-for='add-two-numbers.deno.ts'></script>
`,
    frontendDemo: (
      diffName = "add-two-numbers.deno.ts",
    ) => `
~~~ts
// @@filename ${diffName}
// @@src /lib/leet/add-two-numbers.deno.ts
${readFileSync("src/lib/leet/add-two-numbers.deno.ts").toString()}
~~~
<script type='module' src='/lib/leet/add-two-numbers.deno.ts' demo-for='add-two-numbers.deno.ts'></script>
`,
  },

  "src/lib/idea.deno.tsx": {
    path: "src/lib/idea.deno.tsx",
    filename: "idea.deno.tsx",
    dirname: "src/lib",
    super_extension: "deno.tsx",
    extension: "tsx",
    importPath: "~/lib/idea.deno.tsx",
    readSync: () =>
      readFileSync("src/lib/idea.deno.tsx").toString(),
    dynamicImport: () => import("~/lib/idea.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/idea.deno.tsx'></script>",
    publicPath: "/lib/idea.deno.tsx",
    markdownDemo: (diffName = "idea.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/idea.deno.tsx").toString()}
~~~
<script type='module' src='/lib/idea.deno.tsx' demo-for='idea.deno.tsx'></script>
`,
    frontendDemo: (diffName = "idea.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/idea.deno.tsx
${readFileSync("src/lib/idea.deno.tsx").toString()}
~~~
<script type='module' src='/lib/idea.deno.tsx' demo-for='idea.deno.tsx'></script>
`,
  },

  "src/lib/0_RenderBase.deno.tsx": {
    path: "src/lib/0_RenderBase.deno.tsx",
    filename: "0_RenderBase.deno.tsx",
    dirname: "src/lib",
    super_extension: "deno.tsx",
    extension: "tsx",
    importPath: "~/lib/0_RenderBase.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/lib/0_RenderBase.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/0_RenderBase.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/0_RenderBase.deno.tsx'></script>",
    publicPath: "/lib/0_RenderBase.deno.tsx",
    markdownDemo: (diffName = "0_RenderBase.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/0_RenderBase.deno.tsx").toString()}
~~~
<script type='module' src='/lib/0_RenderBase.deno.tsx' demo-for='0_RenderBase.deno.tsx'></script>
`,
    frontendDemo: (diffName = "0_RenderBase.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/0_RenderBase.deno.tsx
${readFileSync("src/lib/0_RenderBase.deno.tsx").toString()}
~~~
<script type='module' src='/lib/0_RenderBase.deno.tsx' demo-for='0_RenderBase.deno.tsx'></script>
`,
  },

  "src/lib/00_Remark2.deno.tsx": {
    path: "src/lib/00_Remark2.deno.tsx",
    filename: "00_Remark2.deno.tsx",
    dirname: "src/lib",
    super_extension: "deno.tsx",
    extension: "tsx",
    importPath: "~/lib/00_Remark2.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/lib/00_Remark2.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/00_Remark2.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/00_Remark2.deno.tsx'></script>",
    publicPath: "/lib/00_Remark2.deno.tsx",
    markdownDemo: (diffName = "00_Remark2.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/00_Remark2.deno.tsx").toString()}
~~~
<script type='module' src='/lib/00_Remark2.deno.tsx' demo-for='00_Remark2.deno.tsx'></script>
`,
    frontendDemo: (diffName = "00_Remark2.deno.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/00_Remark2.deno.tsx
${readFileSync("src/lib/00_Remark2.deno.tsx").toString()}
~~~
<script type='module' src='/lib/00_Remark2.deno.tsx' demo-for='00_Remark2.deno.tsx'></script>
`,
  },

  "src/lib/0_Layout.dual.tsx": {
    path: "src/lib/0_Layout.dual.tsx",
    filename: "0_Layout.dual.tsx",
    dirname: "src/lib",
    super_extension: "dual.tsx",
    extension: "tsx",
    importPath: "~/lib/0_Layout.dual.tsx",
    readSync: () =>
      readFileSync("src/lib/0_Layout.dual.tsx").toString(),
    dynamicImport: () => import("~/lib/0_Layout.dual.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/0_Layout.dual.tsx'></script>",
    publicPath: "/lib/0_Layout.dual.tsx",
    markdownDemo: (diffName = "0_Layout.dual.tsx") => `
~~~tsx
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/0_Layout.dual.tsx").toString()}
~~~
<script type='module' src='/lib/0_Layout.dual.tsx' demo-for='0_Layout.dual.tsx'></script>
`,
    frontendDemo: (diffName = "0_Layout.dual.tsx") => `
~~~tsx
// @@filename ${diffName}
// @@src /lib/0_Layout.dual.tsx
${readFileSync("src/lib/0_Layout.dual.tsx").toString()}
~~~
<script type='module' src='/lib/0_Layout.dual.tsx' demo-for='0_Layout.dual.tsx'></script>
`,
  },

  "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts":
    {
      path: "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
      filename: "fix-deno-vscode-settings.deno.ts",
      dirname: "src/lib/ridiculous_file_watchers",
      super_extension: "deno.ts",
      extension: "ts",
      importPath:
        "~/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
      readSync: () =>
        readFileSync(
          "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts"
        ),
      linkTag: () =>
        "<script type='module' src='/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts'></script>",
      publicPath:
        "/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
      markdownDemo: (
        diffName = "fix-deno-vscode-settings.deno.ts",
      ) => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts").toString()}
~~~
<script type='module' src='/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts' demo-for='fix-deno-vscode-settings.deno.ts'></script>
`,
      frontendDemo: (
        diffName = "fix-deno-vscode-settings.deno.ts",
      ) => `
~~~ts
// @@filename ${diffName}
// @@src /lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts
${readFileSync("src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts").toString()}
~~~
<script type='module' src='/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts' demo-for='fix-deno-vscode-settings.deno.ts'></script>
`,
    },

  "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts":
    {
      path: "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
      filename: "SITEMAP_generator.deno.ts",
      dirname: "src/lib/ridiculous_file_watchers",
      super_extension: "deno.ts",
      extension: "ts",
      importPath:
        "~/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
      readSync: () =>
        readFileSync(
          "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts"
        ),
      linkTag: () =>
        "<script type='module' src='/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts'></script>",
      publicPath:
        "/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
      markdownDemo: (
        diffName = "SITEMAP_generator.deno.ts",
      ) => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts").toString()}
~~~
<script type='module' src='/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts' demo-for='SITEMAP_generator.deno.ts'></script>
`,
      frontendDemo: (
        diffName = "SITEMAP_generator.deno.ts",
      ) => `
~~~ts
// @@filename ${diffName}
// @@src /lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts
${readFileSync("src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts").toString()}
~~~
<script type='module' src='/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts' demo-for='SITEMAP_generator.deno.ts'></script>
`,
    },

  "src/lib/lib.dual.ts": {
    path: "src/lib/lib.dual.ts",
    filename: "lib.dual.ts",
    dirname: "src/lib",
    super_extension: "dual.ts",
    extension: "ts",
    importPath: "~/lib/lib.dual.ts",
    readSync: () =>
      readFileSync("src/lib/lib.dual.ts").toString(),
    dynamicImport: () => import("~/lib/lib.dual.ts"),
    linkTag: () =>
      "<script type='module' src='/lib/lib.dual.ts'></script>",
    publicPath: "/lib/lib.dual.ts",
    markdownDemo: (diffName = "lib.dual.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/lib.dual.ts").toString()}
~~~
<script type='module' src='/lib/lib.dual.ts' demo-for='lib.dual.ts'></script>
`,
    frontendDemo: (diffName = "lib.dual.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /lib/lib.dual.ts
${readFileSync("src/lib/lib.dual.ts").toString()}
~~~
<script type='module' src='/lib/lib.dual.ts' demo-for='lib.dual.ts'></script>
`,
  },

  "src/lib/client/img-onclick.dom.js": {
    path: "src/lib/client/img-onclick.dom.js",
    filename: "img-onclick.dom.js",
    dirname: "src/lib/client",
    super_extension: "dom.js",
    extension: "js",
    importPath: "~/lib/client/img-onclick.dom.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/img-onclick.dom.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/img-onclick.dom.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/img-onclick.dom.js'></script>",
    publicPath: "/lib/client/img-onclick.dom.js",
    markdownDemo: (diffName = "img-onclick.dom.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/img-onclick.dom.js").toString()}
~~~
<script type='module' src='/lib/client/img-onclick.dom.js' demo-for='img-onclick.dom.js'></script>
`,
    frontendDemo: (diffName = "img-onclick.dom.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/img-onclick.dom.js
${readFileSync("src/lib/client/img-onclick.dom.js").toString()}
~~~
<script type='module' src='/lib/client/img-onclick.dom.js' demo-for='img-onclick.dom.js'></script>
`,
  },

  "src/lib/client/TOC_intersection_polyfill.js": {
    path: "src/lib/client/TOC_intersection_polyfill.js",
    filename: "TOC_intersection_polyfill.js",
    dirname: "src/lib/client",
    super_extension: "js",
    extension: "js",
    importPath: "~/lib/client/TOC_intersection_polyfill.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/TOC_intersection_polyfill.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/TOC_intersection_polyfill.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/TOC_intersection_polyfill.js'></script>",
    publicPath: "/lib/client/TOC_intersection_polyfill.js",
    markdownDemo: (
      diffName = "TOC_intersection_polyfill.js",
    ) => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/TOC_intersection_polyfill.js").toString()}
~~~
<script type='module' src='/lib/client/TOC_intersection_polyfill.js' demo-for='TOC_intersection_polyfill.js'></script>
`,
    frontendDemo: (
      diffName = "TOC_intersection_polyfill.js",
    ) => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/TOC_intersection_polyfill.js
${readFileSync("src/lib/client/TOC_intersection_polyfill.js").toString()}
~~~
<script type='module' src='/lib/client/TOC_intersection_polyfill.js' demo-for='TOC_intersection_polyfill.js'></script>
`,
  },

  "src/lib/client/checkbox.init.dom.js": {
    path: "src/lib/client/checkbox.init.dom.js",
    filename: "checkbox.init.dom.js",
    dirname: "src/lib/client",
    super_extension: "init.dom.js",
    extension: "js",
    importPath: "~/lib/client/checkbox.init.dom.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/checkbox.init.dom.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/checkbox.init.dom.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/checkbox.init.dom.js'></script>",
    publicPath: "/lib/client/checkbox.init.dom.js",
    markdownDemo: (diffName = "checkbox.init.dom.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/checkbox.init.dom.js").toString()}
~~~
<script type='module' src='/lib/client/checkbox.init.dom.js' demo-for='checkbox.init.dom.js'></script>
`,
    frontendDemo: (diffName = "checkbox.init.dom.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/checkbox.init.dom.js
${readFileSync("src/lib/client/checkbox.init.dom.js").toString()}
~~~
<script type='module' src='/lib/client/checkbox.init.dom.js' demo-for='checkbox.init.dom.js'></script>
`,
  },

  "src/lib/client/code-copy.init.dom.js": {
    path: "src/lib/client/code-copy.init.dom.js",
    filename: "code-copy.init.dom.js",
    dirname: "src/lib/client",
    super_extension: "init.dom.js",
    extension: "js",
    importPath: "~/lib/client/code-copy.init.dom.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/code-copy.init.dom.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/code-copy.init.dom.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/code-copy.init.dom.js'></script>",
    publicPath: "/lib/client/code-copy.init.dom.js",
    markdownDemo: (diffName = "code-copy.init.dom.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/code-copy.init.dom.js").toString()}
~~~
<script type='module' src='/lib/client/code-copy.init.dom.js' demo-for='code-copy.init.dom.js'></script>
`,
    frontendDemo: (diffName = "code-copy.init.dom.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/code-copy.init.dom.js
${readFileSync("src/lib/client/code-copy.init.dom.js").toString()}
~~~
<script type='module' src='/lib/client/code-copy.init.dom.js' demo-for='code-copy.init.dom.js'></script>
`,
  },

  "src/lib/client/auto-sticky-stack.js": {
    path: "src/lib/client/auto-sticky-stack.js",
    filename: "auto-sticky-stack.js",
    dirname: "src/lib/client",
    super_extension: "js",
    extension: "js",
    importPath: "~/lib/client/auto-sticky-stack.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/auto-sticky-stack.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/auto-sticky-stack.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/auto-sticky-stack.js'></script>",
    publicPath: "/lib/client/auto-sticky-stack.js",
    markdownDemo: (diffName = "auto-sticky-stack.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/auto-sticky-stack.js").toString()}
~~~
<script type='module' src='/lib/client/auto-sticky-stack.js' demo-for='auto-sticky-stack.js'></script>
`,
    frontendDemo: (diffName = "auto-sticky-stack.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/auto-sticky-stack.js
${readFileSync("src/lib/client/auto-sticky-stack.js").toString()}
~~~
<script type='module' src='/lib/client/auto-sticky-stack.js' demo-for='auto-sticky-stack.js'></script>
`,
  },

  "src/lib/client/debug-range.js": {
    path: "src/lib/client/debug-range.js",
    filename: "debug-range.js",
    dirname: "src/lib/client",
    super_extension: "js",
    extension: "js",
    importPath: "~/lib/client/debug-range.js",
    readSync: () =>
      readFileSync(
        "src/lib/client/debug-range.js",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/client/debug-range.js"),
    linkTag: () =>
      "<script type='module' src='/lib/client/debug-range.js'></script>",
    publicPath: "/lib/client/debug-range.js",
    markdownDemo: (diffName = "debug-range.js") => `
~~~js
// @@filename ${diffName}
// @eval
${readFileSync("src/lib/client/debug-range.js").toString()}
~~~
<script type='module' src='/lib/client/debug-range.js' demo-for='debug-range.js'></script>
`,
    frontendDemo: (diffName = "debug-range.js") => `
~~~js
// @@filename ${diffName}
// @@src /lib/client/debug-range.js
${readFileSync("src/lib/client/debug-range.js").toString()}
~~~
<script type='module' src='/lib/client/debug-range.js' demo-for='debug-range.js'></script>
`,
  },

  "src/SITEMAP.deno.ts": {
    path: "src/SITEMAP.deno.ts",
    filename: "SITEMAP.deno.ts",
    dirname: "src",
    super_extension: "deno.ts",
    extension: "ts",
    importPath: "~/SITEMAP.deno.ts",
    readSync: () =>
      readFileSync("src/SITEMAP.deno.ts").toString(),
    dynamicImport: () => import("~/SITEMAP.deno.ts"),
    linkTag: () =>
      "<script type='module' src='/SITEMAP.deno.ts'></script>",
    publicPath: "/SITEMAP.deno.ts",
    markdownDemo: (diffName = "SITEMAP.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @eval
${readFileSync("src/SITEMAP.deno.ts").toString()}
~~~
<script type='module' src='/SITEMAP.deno.ts' demo-for='SITEMAP.deno.ts'></script>
`,
    frontendDemo: (diffName = "SITEMAP.deno.ts") => `
~~~ts
// @@filename ${diffName}
// @@src /SITEMAP.deno.ts
${readFileSync("src/SITEMAP.deno.ts").toString()}
~~~
<script type='module' src='/SITEMAP.deno.ts' demo-for='SITEMAP.deno.ts'></script>
`,
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
  subFolder: <T extends string>(it: T) => {
    return Object.fromEntries(
      Object.entries(FS)
        .filter(([k, v]) => k.startsWith(it))
        .map(i => [i[0].replace(it, ""), i[1]] as const),
    ) as unknown as {
      [K in keyof FILESYSTEM as K extends `${T}${infer U}`
        ? U
        : never]: FILESYSTEM[K]
    }
  },
}

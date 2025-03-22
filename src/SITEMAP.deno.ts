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
      "<script type='module' src='/home/index.render.deno.tsx' />",
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
      "<script type='module' src='/main_ssg.deno.ts' />",
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
      "<script type='module' src='/resume/index.render.deno.tsx' />",
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
      "<script type='module' src='/BASH.deno.ts' />",
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
      "<script type='module' src='/shiki.deno.ts' />",
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
      "<script type='module' src='/blog/how-its-made/this-site/index.render.deno.tsx' />",
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
        "<script type='module' src='/blog/translating-react-to-rxjs/index.render.deno.tsx' />",
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
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx' />",
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
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx' />",
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
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx' />",
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
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx' />",
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
        "<script type='module' src='/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx' />",
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
      "<script type='module' src='/blog/1-how-i-made-this-site/index.render.deno.tsx' />",
  },

  "src/blog/2-auto-indexing-technique/index.html": {
    path: "src/blog/2-auto-indexing-technique/index.html",
    filename: "index.html",
    dirname: "src/blog/2-auto-indexing-technique",
    super_extension: "html",
    extension: "html",
    importPath:
      "~/blog/2-auto-indexing-technique/index.html",
    readSync: () =>
      readFileSync(
        "src/blog/2-auto-indexing-technique/index.html",
      ).toString(),

    public: "/blog/2-auto-indexing-technique/index.html",
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
        "<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx' />",
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
        "<script type='module' src='/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx' />",
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
        "<script type='module' src='/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx' />",
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
      "<script type='module' src='/blog/index.render.deno.tsx' />",
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
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx' />",
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

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx":
    {
      path: "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx",
      filename: "index.render.deno.tsx",
      dirname:
        "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      super_extension: "render.deno.tsx",
      extension: "tsx",
      importPath:
        "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx",
      readSync: () =>
        readFileSync(
          "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx",
        ).toString(),
      dynamicImport: () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx"
        ),
      linkTag: () =>
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.render.deno.tsx' />",
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
        "<script type='module' src='/blog/make-your-own-sitemap-with-typescript/src/SITEMAP.deno.ts' />",
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
      "<script type='module' src='/tags/index.render.deno.tsx' />",
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
      "<script type='module' src='/vite-env.d.ts' />",
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
      "<script type='module' src='/unix_socket_test/c_child.deno.ts' />",
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
      "<script type='module' src='/unix_socket_test/b_child.deno.ts' />",
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
      "<script type='module' src='/unix_socket_test/test.deno.ts' />",
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
      "<script type='module' src='/unix_socket_test/a_parent.deno.ts' />",
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
      "<script type='module' src='/lib/shiki/gen.deno.ts' />",
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
      "<script type='module' src='/lib/Hex/index.dual.tsx' />",
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
      "<script type='module' src='/lib/rxjs-vhtml/vhtml.deno.ts' />",
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

  "src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx": {
    path: "src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx",
    filename: "jsx-runtime.v2.deno.tsx",
    dirname: "src/lib/rxjs-vhtml/v2",
    super_extension: "v2.deno.tsx",
    extension: "tsx",
    importPath:
      "~/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx",
    readSync: () =>
      readFileSync(
        "src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx",
      ).toString(),
    dynamicImport: () =>
      import("~/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx"),
    linkTag: () =>
      "<script type='module' src='/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx' />",
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
      "<script type='module' src='/lib/rxjs-vhtml/index.deno.test.tsx' />",
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
      "<script type='module' src='/lib/fs_watcher.deno.ts' />",
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
      "<script type='module' src='/lib/remark_rehype/remark-plant-uml.deno.ts' />",
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
      "<script type='module' src='/lib/remark_rehype/remarkNestSections.deno.ts' />",
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
      "<script type='module' src='/lib/lib.deno.ts' />",
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
      "<script type='module' src='/lib/lib.dom.ts' />",
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
      "<script type='module' src='/lib/leet/add-two-numbers.deno.ts' />",
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
      "<script type='module' src='/lib/idea.deno.tsx' />",
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
      "<script type='module' src='/lib/0_RenderBase.deno.tsx' />",
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
      "<script type='module' src='/lib/00_Remark2.deno.tsx' />",
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
      "<script type='module' src='/lib/0_Layout.dual.tsx' />",
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
        "<script type='module' src='/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts' />",
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
        "<script type='module' src='/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts' />",
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
      "<script type='module' src='/lib/lib.dual.ts' />",
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
      "<script type='module' src='/lib/client/img-onclick.dom.js' />",
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
      "<script type='module' src='/lib/client/TOC_intersection_polyfill.js' />",
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
      "<script type='module' src='/lib/client/checkbox.init.dom.js' />",
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
      "<script type='module' src='/lib/client/code-copy.init.dom.js' />",
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
      "<script type='module' src='/lib/client/auto-sticky-stack.js' />",
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
      "<script type='module' src='/lib/client/debug-range.js' />",
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

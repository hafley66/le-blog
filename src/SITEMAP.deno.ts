
type Imploder<T> = T[keyof T];

export const FS = {
  "src": {
    "path": "src",
    "dirname": ".",
    "importPath": "~"
  },
  "src/main_ssg.deno.ts": {
    "path": "src/main_ssg.deno.ts",
    "filename": "main_ssg.deno.ts",
    "dirname": "src",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/main_ssg.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/main_ssg.deno.ts'),
    "dynamicImport": () => import('./main_ssg.deno.ts')
  },
  "src/BASH.deno.ts": {
    "path": "src/BASH.deno.ts",
    "filename": "BASH.deno.ts",
    "dirname": "src",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/BASH.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/BASH.deno.ts'),
    "dynamicImport": () => import('./BASH.deno.ts')
  },
  "src/markdown.deno.mts": {
    "path": "src/markdown.deno.mts",
    "filename": "markdown.deno.mts",
    "dirname": "src",
    "super_extension": "deno.mts",
    "extension": "mts",
    "importPath": "~/markdown.deno.mts",
    "readSync": () => Deno.readTextFileSync('src/markdown.deno.mts')
  },
  "src/shiki.deno.ts": {
    "path": "src/shiki.deno.ts",
    "filename": "shiki.deno.ts",
    "dirname": "src",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/shiki.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/shiki.deno.ts'),
    "dynamicImport": () => import('./shiki.deno.ts')
  },
  "src/blog": {
    "path": "src/blog",
    "dirname": "src",
    "importPath": "~/blog"
  },
  "src/blog/how-its-made": {
    "path": "src/blog/how-its-made",
    "dirname": "src/blog",
    "importPath": "~/blog/how-its-made"
  },
  "src/blog/how-its-made/this-site": {
    "path": "src/blog/how-its-made/this-site",
    "dirname": "src/blog/how-its-made",
    "importPath": "~/blog/how-its-made/this-site"
  },
  "src/blog/how-its-made/this-site/part-1-astro": {
    "path": "src/blog/how-its-made/this-site/part-1-astro",
    "dirname": "src/blog/how-its-made/this-site",
    "importPath": "~/blog/how-its-made/this-site/part-1-astro"
  },
  "src/blog/how-its-made/this-site/part-1-astro/index.render.deno.tsx": {
    "path": "src/blog/how-its-made/this-site/part-1-astro/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/how-its-made/this-site/part-1-astro",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/how-its-made/this-site/part-1-astro/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/how-its-made/this-site/part-1-astro/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/how-its-made/this-site/part-1-astro/index.render.deno.tsx')
  },
  "src/blog/how-its-made/this-site/part-1-astro/index.vite.html": {
    "path": "src/blog/how-its-made/this-site/part-1-astro/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/how-its-made/this-site/part-1-astro",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/how-its-made/this-site/part-1-astro/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/how-its-made/this-site/part-1-astro/index.vite.html')
  },
  "src/blog/how-its-made/this-site/part-2-deno": {
    "path": "src/blog/how-its-made/this-site/part-2-deno",
    "dirname": "src/blog/how-its-made/this-site",
    "importPath": "~/blog/how-its-made/this-site/part-2-deno"
  },
  "src/blog/how-its-made/this-site/part-2-deno/index.render.deno.tsx": {
    "path": "src/blog/how-its-made/this-site/part-2-deno/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/how-its-made/this-site/part-2-deno",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/how-its-made/this-site/part-2-deno/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/how-its-made/this-site/part-2-deno/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/how-its-made/this-site/part-2-deno/index.render.deno.tsx')
  },
  "src/blog/1-how-i-made-this-site": {
    "path": "src/blog/1-how-i-made-this-site",
    "dirname": "src/blog",
    "importPath": "~/blog/1-how-i-made-this-site"
  },
  "src/blog/1-how-i-made-this-site/server_info.png": {
    "path": "src/blog/1-how-i-made-this-site/server_info.png",
    "filename": "server_info.png",
    "dirname": "src/blog/1-how-i-made-this-site",
    "super_extension": "png",
    "extension": "png",
    "importPath": "~/blog/1-how-i-made-this-site/server_info.png",
    "readSync": () => Deno.readTextFileSync('src/blog/1-how-i-made-this-site/server_info.png')
  },
  "src/blog/1-how-i-made-this-site/porkbun.png": {
    "path": "src/blog/1-how-i-made-this-site/porkbun.png",
    "filename": "porkbun.png",
    "dirname": "src/blog/1-how-i-made-this-site",
    "super_extension": "png",
    "extension": "png",
    "importPath": "~/blog/1-how-i-made-this-site/porkbun.png",
    "readSync": () => Deno.readTextFileSync('src/blog/1-how-i-made-this-site/porkbun.png')
  },
  "src/blog/1-how-i-made-this-site/index.render.deno.tsx": {
    "path": "src/blog/1-how-i-made-this-site/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/1-how-i-made-this-site",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/1-how-i-made-this-site/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/1-how-i-made-this-site/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/1-how-i-made-this-site/index.render.deno.tsx')
  },
  "src/blog/1-how-i-made-this-site/index.vite.html": {
    "path": "src/blog/1-how-i-made-this-site/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/1-how-i-made-this-site",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/1-how-i-made-this-site/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/1-how-i-made-this-site/index.vite.html')
  },
  "src/blog/2-auto-indexing-technique": {
    "path": "src/blog/2-auto-indexing-technique",
    "dirname": "src/blog",
    "importPath": "~/blog/2-auto-indexing-technique"
  },
  "src/blog/2-auto-indexing-technique/index.vite.html": {
    "path": "src/blog/2-auto-indexing-technique/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/2-auto-indexing-technique",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/2-auto-indexing-technique/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/2-auto-indexing-technique/index.vite.html')
  },
  "src/vite-env.d.ts": {
    "path": "src/vite-env.d.ts",
    "filename": "vite-env.d.ts",
    "dirname": "src",
    "super_extension": "d.ts",
    "extension": "ts",
    "importPath": "~/vite-env.d.ts",
    "readSync": () => Deno.readTextFileSync('src/vite-env.d.ts'),
    "dynamicImport": () => import('./vite-env.d.ts')
  },
  "src/lib": {
    "path": "src/lib",
    "dirname": "src",
    "importPath": "~/lib"
  },
  "src/lib/00_ReactAsyncPrerender.dual.tsx": {
    "path": "src/lib/00_ReactAsyncPrerender.dual.tsx",
    "filename": "00_ReactAsyncPrerender.dual.tsx",
    "dirname": "src/lib",
    "super_extension": "dual.tsx",
    "extension": "tsx",
    "importPath": "~/lib/00_ReactAsyncPrerender.dual.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/00_ReactAsyncPrerender.dual.tsx'),
    "dynamicImport": () => import('./lib/00_ReactAsyncPrerender.dual.tsx')
  },
  "src/lib/shiki": {
    "path": "src/lib/shiki",
    "dirname": "src/lib",
    "importPath": "~/lib/shiki"
  },
  "src/lib/shiki/gen.deno.ts": {
    "path": "src/lib/shiki/gen.deno.ts",
    "filename": "gen.deno.ts",
    "dirname": "src/lib/shiki",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/shiki/gen.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/shiki/gen.deno.ts'),
    "dynamicImport": () => import('./lib/shiki/gen.deno.ts')
  },
  "src/lib/Hex": {
    "path": "src/lib/Hex",
    "dirname": "src/lib",
    "importPath": "~/lib/Hex"
  },
  "src/lib/Hex/index.dual.tsx": {
    "path": "src/lib/Hex/index.dual.tsx",
    "filename": "index.dual.tsx",
    "dirname": "src/lib/Hex",
    "super_extension": "dual.tsx",
    "extension": "tsx",
    "importPath": "~/lib/Hex/index.dual.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/Hex/index.dual.tsx'),
    "dynamicImport": () => import('./lib/Hex/index.dual.tsx')
  },
  "src/lib/rxjs-vhtml": {
    "path": "src/lib/rxjs-vhtml",
    "dirname": "src/lib",
    "importPath": "~/lib/rxjs-vhtml"
  },
  "src/lib/rxjs-vhtml/vhtml.deno.ts": {
    "path": "src/lib/rxjs-vhtml/vhtml.deno.ts",
    "filename": "vhtml.deno.ts",
    "dirname": "src/lib/rxjs-vhtml",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/rxjs-vhtml/vhtml.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/rxjs-vhtml/vhtml.deno.ts'),
    "dynamicImport": () => import('./lib/rxjs-vhtml/vhtml.deno.ts')
  },
  "src/lib/rxjs-vhtml/test.deno.tsx": {
    "path": "src/lib/rxjs-vhtml/test.deno.tsx",
    "filename": "test.deno.tsx",
    "dirname": "src/lib/rxjs-vhtml",
    "super_extension": "deno.tsx",
    "extension": "tsx",
    "importPath": "~/lib/rxjs-vhtml/test.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/rxjs-vhtml/test.deno.tsx'),
    "dynamicImport": () => import('./lib/rxjs-vhtml/test.deno.tsx')
  },
  "src/lib/fs_watcher.deno.ts": {
    "path": "src/lib/fs_watcher.deno.ts",
    "filename": "fs_watcher.deno.ts",
    "dirname": "src/lib",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/fs_watcher.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/fs_watcher.deno.ts'),
    "dynamicImport": () => import('./lib/fs_watcher.deno.ts')
  },
  "src/lib/remark_rehype": {
    "path": "src/lib/remark_rehype",
    "dirname": "src/lib",
    "importPath": "~/lib/remark_rehype"
  },
  "src/lib/remark_rehype/remarkNestSections.deno.ts": {
    "path": "src/lib/remark_rehype/remarkNestSections.deno.ts",
    "filename": "remarkNestSections.deno.ts",
    "dirname": "src/lib/remark_rehype",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/remark_rehype/remarkNestSections.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/remark_rehype/remarkNestSections.deno.ts'),
    "dynamicImport": () => import('./lib/remark_rehype/remarkNestSections.deno.ts')
  },
  "src/lib/lib.dom.ts": {
    "path": "src/lib/lib.dom.ts",
    "filename": "lib.dom.ts",
    "dirname": "src/lib",
    "super_extension": "dom.ts",
    "extension": "ts",
    "importPath": "~/lib/lib.dom.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/lib.dom.ts'),
    "dynamicImport": () => import('./lib/lib.dom.ts')
  },
  "src/lib/idea.deno.tsx": {
    "path": "src/lib/idea.deno.tsx",
    "filename": "idea.deno.tsx",
    "dirname": "src/lib",
    "super_extension": "deno.tsx",
    "extension": "tsx",
    "importPath": "~/lib/idea.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/idea.deno.tsx'),
    "dynamicImport": () => import('./lib/idea.deno.tsx')
  },
  "src/lib/0_RenderBase.deno.tsx": {
    "path": "src/lib/0_RenderBase.deno.tsx",
    "filename": "0_RenderBase.deno.tsx",
    "dirname": "src/lib",
    "super_extension": "deno.tsx",
    "extension": "tsx",
    "importPath": "~/lib/0_RenderBase.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/0_RenderBase.deno.tsx'),
    "dynamicImport": () => import('./lib/0_RenderBase.deno.tsx')
  },
  "src/lib/00_Remark2.deno.tsx": {
    "path": "src/lib/00_Remark2.deno.tsx",
    "filename": "00_Remark2.deno.tsx",
    "dirname": "src/lib",
    "super_extension": "deno.tsx",
    "extension": "tsx",
    "importPath": "~/lib/00_Remark2.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/00_Remark2.deno.tsx'),
    "dynamicImport": () => import('./lib/00_Remark2.deno.tsx')
  },
  "src/lib/0_Layout.dual.tsx": {
    "path": "src/lib/0_Layout.dual.tsx",
    "filename": "0_Layout.dual.tsx",
    "dirname": "src/lib",
    "super_extension": "dual.tsx",
    "extension": "tsx",
    "importPath": "~/lib/0_Layout.dual.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/0_Layout.dual.tsx'),
    "dynamicImport": () => import('./lib/0_Layout.dual.tsx')
  },
  "src/lib/unix_socket_test": {
    "path": "src/lib/unix_socket_test",
    "dirname": "src/lib",
    "importPath": "~/lib/unix_socket_test"
  },
  "src/lib/unix_socket_test/c_child.deno.ts": {
    "path": "src/lib/unix_socket_test/c_child.deno.ts",
    "filename": "c_child.deno.ts",
    "dirname": "src/lib/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/unix_socket_test/c_child.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/unix_socket_test/c_child.deno.ts'),
    "dynamicImport": () => import('./lib/unix_socket_test/c_child.deno.ts')
  },
  "src/lib/unix_socket_test/b_child.deno.ts": {
    "path": "src/lib/unix_socket_test/b_child.deno.ts",
    "filename": "b_child.deno.ts",
    "dirname": "src/lib/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/unix_socket_test/b_child.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/unix_socket_test/b_child.deno.ts'),
    "dynamicImport": () => import('./lib/unix_socket_test/b_child.deno.ts')
  },
  "src/lib/unix_socket_test/a_parent.deno.ts": {
    "path": "src/lib/unix_socket_test/a_parent.deno.ts",
    "filename": "a_parent.deno.ts",
    "dirname": "src/lib/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/unix_socket_test/a_parent.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/unix_socket_test/a_parent.deno.ts'),
    "dynamicImport": () => import('./lib/unix_socket_test/a_parent.deno.ts')
  },
  "src/lib/ridiculous_file_watchers": {
    "path": "src/lib/ridiculous_file_watchers",
    "dirname": "src/lib",
    "importPath": "~/lib/ridiculous_file_watchers"
  },
  "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts": {
    "path": "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
    "filename": "fix-deno-vscode-settings.deno.ts",
    "dirname": "src/lib/ridiculous_file_watchers",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts'),
    "dynamicImport": () => import('./lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts')
  },
  "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts": {
    "path": "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
    "filename": "SITEMAP_generator.deno.ts",
    "dirname": "src/lib/ridiculous_file_watchers",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts'),
    "dynamicImport": () => import('./lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts')
  },
  "src/lib/lib.dual.ts": {
    "path": "src/lib/lib.dual.ts",
    "filename": "lib.dual.ts",
    "dirname": "src/lib",
    "super_extension": "dual.ts",
    "extension": "ts",
    "importPath": "~/lib/lib.dual.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/lib.dual.ts'),
    "dynamicImport": () => import('./lib/lib.dual.ts')
  },
  "src/pages": {
    "path": "src/pages",
    "dirname": "src",
    "importPath": "~/pages"
  },
  "src/pages/snippets": {
    "path": "src/pages/snippets",
    "dirname": "src/pages",
    "importPath": "~/pages/snippets"
  },
  "src/pages/snippets/2-css-hexagons-with-container-query-units": {
    "path": "src/pages/snippets/2-css-hexagons-with-container-query-units",
    "dirname": "src/pages/snippets",
    "importPath": "~/pages/snippets/2-css-hexagons-with-container-query-units"
  },
  "src/pages/snippets/1-filewatcher-with-deno-and-rxjs": {
    "path": "src/pages/snippets/1-filewatcher-with-deno-and-rxjs",
    "dirname": "src/pages/snippets",
    "importPath": "~/pages/snippets/1-filewatcher-with-deno-and-rxjs"
  },
  "src/pages/blog": {
    "path": "src/pages/blog",
    "dirname": "src/pages",
    "importPath": "~/pages/blog"
  },
  "src/pages/tags": {
    "path": "src/pages/tags",
    "dirname": "src/pages",
    "importPath": "~/pages/tags"
  },
  "src/SITEMAP.deno.ts": {
    "path": "src/SITEMAP.deno.ts",
    "filename": "SITEMAP.deno.ts",
    "dirname": "src",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/SITEMAP.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/SITEMAP.deno.ts'),
    "dynamicImport": () => import('./SITEMAP.deno.ts')
  }
} as const;

export type FILESYSTEM = typeof FS;

export const SITEMAP = {
  startsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.startsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends `${T}${string}` ? K : never
      ]: FILESYSTEM[K];
    }
  >[],
  endsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.endsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends `${string}${T}` ? K : never
      ]: FILESYSTEM[K];
    }
  >[],
  includes: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.includes(it)).map(i => i[1])
  ) as unknown as Imploder<
    {
      [
        K in keyof FILESYSTEM as K extends `${string}${T}${string}` ? K : never
      ]: FILESYSTEM[K];
    }
  >[]
};

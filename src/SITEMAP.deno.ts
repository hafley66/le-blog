
type Imploder<T> = T[keyof T];

export const FS = {
  "src": {
    "path": "src",
    "dirname": ".",
    "importPath": "~"
  },
  "src/home": {
    "path": "src/home",
    "dirname": "src",
    "importPath": "~/home"
  },
  "src/home/index.render.deno.tsx": {
    "path": "src/home/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/home",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/home/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/home/index.render.deno.tsx'),
    "dynamicImport": () => import('./home/index.render.deno.tsx')
  },
  "src/home/index.vite.html": {
    "path": "src/home/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/home",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/home/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/home/index.vite.html')
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
  "src/resume": {
    "path": "src/resume",
    "dirname": "src",
    "importPath": "~/resume"
  },
  "src/resume/resume.html": {
    "path": "src/resume/resume.html",
    "filename": "resume.html",
    "dirname": "src/resume",
    "super_extension": "html",
    "extension": "html",
    "importPath": "~/resume/resume.html",
    "readSync": () => Deno.readTextFileSync('src/resume/resume.html')
  },
  "src/resume/index.css": {
    "path": "src/resume/index.css",
    "filename": "index.css",
    "dirname": "src/resume",
    "super_extension": "css",
    "extension": "css",
    "importPath": "~/resume/index.css",
    "readSync": () => Deno.readTextFileSync('src/resume/index.css'),
    "publicPath": "/src/resume/index.css",
    "linkTag": () => `<link rel='stylesheet' href='/src/resume/index.css' />`
  },
  "src/resume/index.render.deno.tsx": {
    "path": "src/resume/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/resume",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/resume/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/resume/index.render.deno.tsx'),
    "dynamicImport": () => import('./resume/index.render.deno.tsx')
  },
  "src/resume/index.vite.html": {
    "path": "src/resume/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/resume",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/resume/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/resume/index.vite.html')
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
  "src/blog/how-its-made/this-site/index.render.deno.tsx": {
    "path": "src/blog/how-its-made/this-site/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/how-its-made/this-site",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/how-its-made/this-site/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/how-its-made/this-site/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/how-its-made/this-site/index.render.deno.tsx')
  },
  "src/blog/how-its-made/this-site/index.vite.html": {
    "path": "src/blog/how-its-made/this-site/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/how-its-made/this-site",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/how-its-made/this-site/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/how-its-made/this-site/index.vite.html')
  },
  "src/blog/translating-react-to-rxjs": {
    "path": "src/blog/translating-react-to-rxjs",
    "dirname": "src/blog",
    "importPath": "~/blog/translating-react-to-rxjs"
  },
  "src/blog/translating-react-to-rxjs/index.render.deno.tsx": {
    "path": "src/blog/translating-react-to-rxjs/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/translating-react-to-rxjs",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/translating-react-to-rxjs/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/translating-react-to-rxjs/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/translating-react-to-rxjs/index.render.deno.tsx')
  },
  "src/blog/translating-react-to-rxjs/index.vite.html": {
    "path": "src/blog/translating-react-to-rxjs/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/translating-react-to-rxjs",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/translating-react-to-rxjs/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/translating-react-to-rxjs/index.vite.html')
  },
  "src/blog/unholy-custom-jsx-with-observable-strings": {
    "path": "src/blog/unholy-custom-jsx-with-observable-strings",
    "dirname": "src/blog",
    "importPath": "~/blog/unholy-custom-jsx-with-observable-strings"
  },
  "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx": {
    "path": "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/unholy-custom-jsx-with-observable-strings",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx')
  },
  "src/blog/unholy-custom-jsx-with-observable-strings/index.vite.html": {
    "path": "src/blog/unholy-custom-jsx-with-observable-strings/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/unholy-custom-jsx-with-observable-strings",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/unholy-custom-jsx-with-observable-strings/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/unholy-custom-jsx-with-observable-strings/index.vite.html')
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
  "src/blog/rxjs": {
    "path": "src/blog/rxjs",
    "dirname": "src/blog",
    "importPath": "~/blog/rxjs"
  },
  "src/blog/rxjs/recreate-react-query-with-rxjs": {
    "path": "src/blog/rxjs/recreate-react-query-with-rxjs",
    "dirname": "src/blog/rxjs",
    "importPath": "~/blog/rxjs/recreate-react-query-with-rxjs"
  },
  "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx": {
    "path": "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
    "filename": "sample.deno.tsx",
    "dirname": "src/blog/rxjs/recreate-react-query-with-rxjs",
    "super_extension": "deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx'),
    "dynamicImport": () => import('./blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx')
  },
  "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx": {
    "path": "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/rxjs/recreate-react-query-with-rxjs",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx')
  },
  "src/blog/rxjs/recreate-react-query-with-rxjs/index.vite.html": {
    "path": "src/blog/rxjs/recreate-react-query-with-rxjs/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/rxjs/recreate-react-query-with-rxjs",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/rxjs/recreate-react-query-with-rxjs/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/rxjs/recreate-react-query-with-rxjs/index.vite.html')
  },
  "src/blog/state-management-showdown": {
    "path": "src/blog/state-management-showdown",
    "dirname": "src/blog",
    "importPath": "~/blog/state-management-showdown"
  },
  "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks": {
    "path": "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks",
    "dirname": "src/blog/state-management-showdown",
    "importPath": "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks"
  },
  "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx": {
    "path": "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx')
  },
  "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.vite.html": {
    "path": "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.vite.html')
  },
  "src/blog/index.render.deno.tsx": {
    "path": "src/blog/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/blog",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/blog/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/blog/index.render.deno.tsx'),
    "dynamicImport": () => import('./blog/index.render.deno.tsx')
  },
  "src/blog/1-vs-many": {
    "path": "src/blog/1-vs-many",
    "dirname": "src/blog",
    "importPath": "~/blog/1-vs-many"
  },
  "src/blog/index.vite.html": {
    "path": "src/blog/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/blog",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/blog/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/blog/index.vite.html')
  },
  "src/bash": {
    "path": "src/bash",
    "dirname": "src",
    "importPath": "~/bash"
  },
  "src/bash/rsync-it.bash": {
    "path": "src/bash/rsync-it.bash",
    "filename": "rsync-it.bash",
    "dirname": "src/bash",
    "super_extension": "bash",
    "extension": "bash",
    "importPath": "~/bash/rsync-it.bash",
    "readSync": () => Deno.readTextFileSync('src/bash/rsync-it.bash')
  },
  "src/bash/README.md": {
    "path": "src/bash/README.md",
    "filename": "README.md",
    "dirname": "src/bash",
    "super_extension": "md",
    "extension": "md",
    "importPath": "~/bash/README.md",
    "readSync": () => Deno.readTextFileSync('src/bash/README.md')
  },
  "src/tags": {
    "path": "src/tags",
    "dirname": "src",
    "importPath": "~/tags"
  },
  "src/tags/index.render.deno.tsx": {
    "path": "src/tags/index.render.deno.tsx",
    "filename": "index.render.deno.tsx",
    "dirname": "src/tags",
    "super_extension": "render.deno.tsx",
    "extension": "tsx",
    "importPath": "~/tags/index.render.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/tags/index.render.deno.tsx'),
    "dynamicImport": () => import('./tags/index.render.deno.tsx')
  },
  "src/tags/index.vite.html": {
    "path": "src/tags/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src/tags",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/tags/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/tags/index.vite.html')
  },
  "src/notes": {
    "path": "src/notes",
    "dirname": "src",
    "importPath": "~/notes"
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
  "src/unix_socket_test": {
    "path": "src/unix_socket_test",
    "dirname": "src",
    "importPath": "~/unix_socket_test"
  },
  "src/unix_socket_test/c_child.deno.ts": {
    "path": "src/unix_socket_test/c_child.deno.ts",
    "filename": "c_child.deno.ts",
    "dirname": "src/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/unix_socket_test/c_child.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/unix_socket_test/c_child.deno.ts'),
    "dynamicImport": () => import('./unix_socket_test/c_child.deno.ts')
  },
  "src/unix_socket_test/b_child.deno.ts": {
    "path": "src/unix_socket_test/b_child.deno.ts",
    "filename": "b_child.deno.ts",
    "dirname": "src/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/unix_socket_test/b_child.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/unix_socket_test/b_child.deno.ts'),
    "dynamicImport": () => import('./unix_socket_test/b_child.deno.ts')
  },
  "src/unix_socket_test/test.deno.ts": {
    "path": "src/unix_socket_test/test.deno.ts",
    "filename": "test.deno.ts",
    "dirname": "src/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/unix_socket_test/test.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/unix_socket_test/test.deno.ts'),
    "dynamicImport": () => import('./unix_socket_test/test.deno.ts')
  },
  "src/unix_socket_test/a_parent.deno.ts": {
    "path": "src/unix_socket_test/a_parent.deno.ts",
    "filename": "a_parent.deno.ts",
    "dirname": "src/unix_socket_test",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/unix_socket_test/a_parent.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/unix_socket_test/a_parent.deno.ts'),
    "dynamicImport": () => import('./unix_socket_test/a_parent.deno.ts')
  },
  "src/lib": {
    "path": "src/lib",
    "dirname": "src",
    "importPath": "~/lib"
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
  "src/lib/rxjs-vhtml/v2": {
    "path": "src/lib/rxjs-vhtml/v2",
    "dirname": "src/lib/rxjs-vhtml",
    "importPath": "~/lib/rxjs-vhtml/v2"
  },
  "src/lib/rxjs-vhtml/v2/jsx-runtime.mts": {
    "path": "src/lib/rxjs-vhtml/v2/jsx-runtime.mts",
    "filename": "jsx-runtime.mts",
    "dirname": "src/lib/rxjs-vhtml/v2",
    "super_extension": "mts",
    "extension": "mts",
    "importPath": "~/lib/rxjs-vhtml/v2/jsx-runtime.mts",
    "readSync": () => Deno.readTextFileSync('src/lib/rxjs-vhtml/v2/jsx-runtime.mts')
  },
  "src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx": {
    "path": "src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx",
    "filename": "jsx-runtime.v2.deno.tsx",
    "dirname": "src/lib/rxjs-vhtml/v2",
    "super_extension": "v2.deno.tsx",
    "extension": "tsx",
    "importPath": "~/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx'),
    "dynamicImport": () => import('./lib/rxjs-vhtml/v2/jsx-runtime.v2.deno.tsx')
  },
  "src/lib/rxjs-vhtml/index.deno.test.tsx": {
    "path": "src/lib/rxjs-vhtml/index.deno.test.tsx",
    "filename": "index.deno.test.tsx",
    "dirname": "src/lib/rxjs-vhtml",
    "super_extension": "deno.test.tsx",
    "extension": "tsx",
    "importPath": "~/lib/rxjs-vhtml/index.deno.test.tsx",
    "readSync": () => Deno.readTextFileSync('src/lib/rxjs-vhtml/index.deno.test.tsx'),
    "dynamicImport": () => import('./lib/rxjs-vhtml/index.deno.test.tsx')
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
  "src/lib/remark_rehype/remark-plant-uml.deno.ts": {
    "path": "src/lib/remark_rehype/remark-plant-uml.deno.ts",
    "filename": "remark-plant-uml.deno.ts",
    "dirname": "src/lib/remark_rehype",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/remark_rehype/remark-plant-uml.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/remark_rehype/remark-plant-uml.deno.ts'),
    "dynamicImport": () => import('./lib/remark_rehype/remark-plant-uml.deno.ts')
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
  "src/lib/lib.deno.ts": {
    "path": "src/lib/lib.deno.ts",
    "filename": "lib.deno.ts",
    "dirname": "src/lib",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/lib.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/lib.deno.ts'),
    "dynamicImport": () => import('./lib/lib.deno.ts')
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
  "src/lib/leet": {
    "path": "src/lib/leet",
    "dirname": "src/lib",
    "importPath": "~/lib/leet"
  },
  "src/lib/leet/add-two-numbers.deno.ts": {
    "path": "src/lib/leet/add-two-numbers.deno.ts",
    "filename": "add-two-numbers.deno.ts",
    "dirname": "src/lib/leet",
    "super_extension": "deno.ts",
    "extension": "ts",
    "importPath": "~/lib/leet/add-two-numbers.deno.ts",
    "readSync": () => Deno.readTextFileSync('src/lib/leet/add-two-numbers.deno.ts'),
    "dynamicImport": () => import('./lib/leet/add-two-numbers.deno.ts')
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
  "src/lib/client": {
    "path": "src/lib/client",
    "dirname": "src/lib",
    "importPath": "~/lib/client"
  },
  "src/lib/client/img-onclick.dom.js": {
    "path": "src/lib/client/img-onclick.dom.js",
    "filename": "img-onclick.dom.js",
    "dirname": "src/lib/client",
    "super_extension": "dom.js",
    "extension": "js",
    "importPath": "~/lib/client/img-onclick.dom.js",
    "readSync": () => Deno.readTextFileSync('src/lib/client/img-onclick.dom.js'),
    "dynamicImport": () => import('./lib/client/img-onclick.dom.js')
  },
  "src/lib/client/TOC_intersection_polyfill.js": {
    "path": "src/lib/client/TOC_intersection_polyfill.js",
    "filename": "TOC_intersection_polyfill.js",
    "dirname": "src/lib/client",
    "super_extension": "js",
    "extension": "js",
    "importPath": "~/lib/client/TOC_intersection_polyfill.js",
    "readSync": () => Deno.readTextFileSync('src/lib/client/TOC_intersection_polyfill.js'),
    "dynamicImport": () => import('./lib/client/TOC_intersection_polyfill.js')
  },
  "src/lib/client/checkbox.init.dom.js": {
    "path": "src/lib/client/checkbox.init.dom.js",
    "filename": "checkbox.init.dom.js",
    "dirname": "src/lib/client",
    "super_extension": "init.dom.js",
    "extension": "js",
    "importPath": "~/lib/client/checkbox.init.dom.js",
    "readSync": () => Deno.readTextFileSync('src/lib/client/checkbox.init.dom.js'),
    "dynamicImport": () => import('./lib/client/checkbox.init.dom.js')
  },
  "src/lib/client/code-copy.init.dom.js": {
    "path": "src/lib/client/code-copy.init.dom.js",
    "filename": "code-copy.init.dom.js",
    "dirname": "src/lib/client",
    "super_extension": "init.dom.js",
    "extension": "js",
    "importPath": "~/lib/client/code-copy.init.dom.js",
    "readSync": () => Deno.readTextFileSync('src/lib/client/code-copy.init.dom.js'),
    "dynamicImport": () => import('./lib/client/code-copy.init.dom.js')
  },
  "src/lib/client/debug-range.js": {
    "path": "src/lib/client/debug-range.js",
    "filename": "debug-range.js",
    "dirname": "src/lib/client",
    "super_extension": "js",
    "extension": "js",
    "importPath": "~/lib/client/debug-range.js",
    "readSync": () => Deno.readTextFileSync('src/lib/client/debug-range.js'),
    "dynamicImport": () => import('./lib/client/debug-range.js')
  },
  "src/lib/0_Layout.dual.js": {
    "path": "src/lib/0_Layout.dual.js",
    "filename": "0_Layout.dual.js",
    "dirname": "src/lib",
    "super_extension": "dual.js",
    "extension": "js",
    "importPath": "~/lib/0_Layout.dual.js",
    "readSync": () => Deno.readTextFileSync('src/lib/0_Layout.dual.js'),
    "dynamicImport": () => import('./lib/0_Layout.dual.js')
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
  },
  "src/index.vite.html": {
    "path": "src/index.vite.html",
    "filename": "index.vite.html",
    "dirname": "src",
    "super_extension": "vite.html",
    "extension": "html",
    "importPath": "~/index.vite.html",
    "readSync": () => Deno.readTextFileSync('src/index.vite.html')
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

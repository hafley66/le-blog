import {
  Path,
  JSPath,
  SITEMAP_PART,
} from "./lib/path_helpers.deno.ts"
export const FS = {
  "src/home/profession.mermaid": new Path(
    "src/home/profession.mermaid",
    "src/home",
    "profession.mermaid",
    "mermaid",
  ),

  "src/home/index.render.deno.tsx": new JSPath(
    "src/home/index.render.deno.tsx",
    "src/home",
    "index.render.deno.tsx",
    "tsx",
    () => import("~/home/index.render.deno.tsx"),
  ),

  "src/main_ssg.deno.ts": new JSPath(
    "src/main_ssg.deno.ts",
    "src",
    "main_ssg.deno.ts",
    "ts",
    () => import("~/main_ssg.deno.ts"),
  ),

  "src/index.html": new Path(
    "src/index.html",
    "src",
    "index.html",
    "html",
  ),

  "src/go/sitemap_watcher.go": new Path(
    "src/go/sitemap_watcher.go",
    "src/go",
    "sitemap_watcher.go",
    "go",
  ),

  "src/resume/resume.html": new Path(
    "src/resume/resume.html",
    "src/resume",
    "resume.html",
    "html",
  ),

  "src/resume/index.css": new Path(
    "src/resume/index.css",
    "src/resume",
    "index.css",
    "css",
  ),

  "src/resume/timeline.puml": new Path(
    "src/resume/timeline.puml",
    "src/resume",
    "timeline.puml",
    "puml",
  ),

  "src/resume/index.render.deno.tsx": new JSPath(
    "src/resume/index.render.deno.tsx",
    "src/resume",
    "index.render.deno.tsx",
    "tsx",
    () => import("~/resume/index.render.deno.tsx"),
  ),

  "src/BASH.deno.ts": new JSPath(
    "src/BASH.deno.ts",
    "src",
    "BASH.deno.ts",
    "ts",
    () => import("~/BASH.deno.ts"),
  ),

  "src/blog/how-its-made/this-site/index.render.deno.tsx":
    new JSPath(
      "src/blog/how-its-made/this-site/index.render.deno.tsx",
      "src/blog/how-its-made/this-site",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/how-its-made/this-site/index.render.deno.tsx"
        ),
    ),

  "src/blog/translating-react-to-rxjs/index.render.deno.tsx":
    new JSPath(
      "src/blog/translating-react-to-rxjs/index.render.deno.tsx",
      "src/blog/translating-react-to-rxjs",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/translating-react-to-rxjs/index.render.deno.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/conditionals/1.static.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/conditionals/1.static.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/conditionals",
      "1.static.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/conditionals/1.static.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/conditionals/2.dynamic.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/conditionals/2.dynamic.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/conditionals",
      "2.dynamic.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/conditionals/2.dynamic.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/intro/1.sync.deno.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/intro/1.sync.deno.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/intro",
      "1.sync.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/intro/1.sync.deno.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/intro/4.async.rxjs.deno.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/intro/4.async.rxjs.deno.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/intro",
      "4.async.rxjs.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/intro/4.async.rxjs.deno.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/intro/2.basic.deno.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/intro/2.basic.deno.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/intro",
      "2.basic.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/intro/2.basic.deno.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/intro/3.async.deno.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/intro/3.async.deno.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/intro",
      "3.async.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/intro/3.async.deno.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/state/2.woBS.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/state/2.woBS.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/state",
      "2.woBS.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/state/2.woBS.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/state/1.wBS.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/state/1.wBS.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/state",
      "1.wBS.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/state/1.wBS.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/components/1.static.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/components/1.static.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/components",
      "1.static.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/components/1.static.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/arrays/1.static.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays/1.static.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays",
      "1.static.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/arrays/1.static.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/arrays/2.dynamic.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays/2.dynamic.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays",
      "2.dynamic.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/arrays/2.dynamic.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/arrays/3.promise.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays/3.promise.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/arrays",
      "3.promise.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/arrays/3.promise.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.ellapsed.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.ellapsed.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/counter",
      "7.react.ellapsed.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.ellapsed.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/counter/5_interval.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/counter/5_interval.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/counter",
      "5_interval.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/counter/5_interval.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/counter/6_interval.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/counter/6_interval.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/counter",
      "6_interval.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/counter/6_interval.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/counter",
      "7.react.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/counter/7.react.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/1.fromEvent.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/1.fromEvent.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "1.fromEvent.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/1.fromEvent.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/3.withSelector.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/3.withSelector.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "3.withSelector.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/3.withSelector.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.fromEventDelegate.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.fromEventDelegate.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "events.1.click.fromEventDelegate.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.fromEventDelegate.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.withSelector.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.withSelector.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "events.1.click.withSelector.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/events.1.click.withSelector.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/events.2.input.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/events.2.input.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "events.2.input.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/events.2.input.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/events/2.fromEventDelegate.dom.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/events/2.fromEventDelegate.dom.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings/events",
      "2.fromEventDelegate.dom.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/events/2.fromEventDelegate.dom.tsx"
        ),
    ),

  "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx":
    new JSPath(
      "src/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx",
      "src/blog/unholy-custom-jsx-with-observable-strings",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/unholy-custom-jsx-with-observable-strings/index.render.deno.tsx"
        ),
    ),

  "src/blog/1-how-i-made-this-site/server_info.png":
    new Path(
      "src/blog/1-how-i-made-this-site/server_info.png",
      "src/blog/1-how-i-made-this-site",
      "server_info.png",
      "png",
    ),

  "src/blog/1-how-i-made-this-site/porygons.text": new Path(
    "src/blog/1-how-i-made-this-site/porygons.text",
    "src/blog/1-how-i-made-this-site",
    "porygons.text",
    "text",
  ),

  "src/blog/1-how-i-made-this-site/porkbun.png": new Path(
    "src/blog/1-how-i-made-this-site/porkbun.png",
    "src/blog/1-how-i-made-this-site",
    "porkbun.png",
    "png",
  ),

  "src/blog/1-how-i-made-this-site/index.render.deno.tsx":
    new JSPath(
      "src/blog/1-how-i-made-this-site/index.render.deno.tsx",
      "src/blog/1-how-i-made-this-site",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/1-how-i-made-this-site/index.render.deno.tsx"
        ),
    ),

  "src/blog/types-of-set-state/index.render.deno.tsx":
    new JSPath(
      "src/blog/types-of-set-state/index.render.deno.tsx",
      "src/blog/types-of-set-state",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/types-of-set-state/index.render.deno.tsx"
        ),
    ),

  "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx":
    new JSPath(
      "src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx",
      "src/blog/rxjs/recreate-react-query-with-rxjs",
      "sample.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx"
        ),
    ),

  "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx":
    new JSPath(
      "src/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx",
      "src/blog/rxjs/recreate-react-query-with-rxjs",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/rxjs/recreate-react-query-with-rxjs/index.render.deno.tsx"
        ),
    ),

  "src/blog/rxjs/dom-events/index.render.deno.tsx":
    new JSPath(
      "src/blog/rxjs/dom-events/index.render.deno.tsx",
      "src/blog/rxjs/dom-events",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/rxjs/dom-events/index.render.deno.tsx"
        ),
    ),

  "src/blog/rxjs/vs-react/index.render.md": new Path(
    "src/blog/rxjs/vs-react/index.render.md",
    "src/blog/rxjs/vs-react",
    "index.render.md",
    "md",
  ),

  "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx":
    new JSPath(
      "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx",
      "src/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/state-management-showdown/state-management-showdown-rxjs-vs-react-hooks/index.render.deno.tsx"
        ),
    ),

  "src/blog/index.render.deno.tsx": new JSPath(
    "src/blog/index.render.deno.tsx",
    "src/blog",
    "index.render.deno.tsx",
    "tsx",
    () => import("~/blog/index.render.deno.tsx"),
  ),

  "src/blog/make-your-own-sitemap-with-typescript/example.css":
    new Path(
      "src/blog/make-your-own-sitemap-with-typescript/example.css",
      "src/blog/make-your-own-sitemap-with-typescript",
      "example.css",
      "css",
    ),

  "src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx":
    new JSPath(
      "src/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx",
      "src/blog/make-your-own-sitemap-with-typescript",
      "index.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/index.render.deno.tsx"
        ),
    ),

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css":
    new Path(
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index.css",
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      "index.css",
      "css",
    ),

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx":
    new JSPath(
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx",
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      "index2.render.deno.tsx",
      "tsx",
      () =>
        import(
          "~/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/index2.render.deno.tsx"
        ),
    ),

  "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png":
    new Path(
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world/example.png",
      "src/blog/make-your-own-sitemap-with-typescript/src/blog/hello-world",
      "example.png",
      "png",
    ),

  "src/bash/_.watch.add-relative-fs-info.bash": new Path(
    "src/bash/_.watch.add-relative-fs-info.bash",
    "src/bash",
    "_.watch.add-relative-fs-info.bash",
    "bash",
  ),

  "src/bash/sitemap-watcher.bash": new Path(
    "src/bash/sitemap-watcher.bash",
    "src/bash",
    "sitemap-watcher.bash",
    "bash",
  ),

  "src/bash/rsync-it.bash": new Path(
    "src/bash/rsync-it.bash",
    "src/bash",
    "rsync-it.bash",
    "bash",
  ),

  "src/bash/_.watch.sitemap.bash": new Path(
    "src/bash/_.watch.sitemap.bash",
    "src/bash",
    "_.watch.sitemap.bash",
    "bash",
  ),

  "src/bash/README.md": new Path(
    "src/bash/README.md",
    "src/bash",
    "README.md",
    "md",
  ),

  "src/bash/deno-settings-watcher.bash": new Path(
    "src/bash/deno-settings-watcher.bash",
    "src/bash",
    "deno-settings-watcher.bash",
    "bash",
  ),

  "src/bash/_.watch.images.optimizer.bash": new Path(
    "src/bash/_.watch.images.optimizer.bash",
    "src/bash",
    "_.watch.images.optimizer.bash",
    "bash",
  ),

  "src/tags/index.render.deno.tsx": new JSPath(
    "src/tags/index.render.deno.tsx",
    "src/tags",
    "index.render.deno.tsx",
    "tsx",
    () => import("~/tags/index.render.deno.tsx"),
  ),

  "src/vite-env.d.ts": new JSPath(
    "src/vite-env.d.ts",
    "src",
    "vite-env.d.ts",
    "ts",
    () => import("~/vite-env.d.ts"),
  ),

  "src/unix_socket_test/c_child.deno.ts": new JSPath(
    "src/unix_socket_test/c_child.deno.ts",
    "src/unix_socket_test",
    "c_child.deno.ts",
    "ts",
    () => import("~/unix_socket_test/c_child.deno.ts"),
  ),

  "src/unix_socket_test/b_child.deno.ts": new JSPath(
    "src/unix_socket_test/b_child.deno.ts",
    "src/unix_socket_test",
    "b_child.deno.ts",
    "ts",
    () => import("~/unix_socket_test/b_child.deno.ts"),
  ),

  "src/unix_socket_test/test.deno.ts": new JSPath(
    "src/unix_socket_test/test.deno.ts",
    "src/unix_socket_test",
    "test.deno.ts",
    "ts",
    () => import("~/unix_socket_test/test.deno.ts"),
  ),

  "src/unix_socket_test/a_parent.deno.ts": new JSPath(
    "src/unix_socket_test/a_parent.deno.ts",
    "src/unix_socket_test",
    "a_parent.deno.ts",
    "ts",
    () => import("~/unix_socket_test/a_parent.deno.ts"),
  ),

  "src/lib/shiki/shiki.deno.tsx": new JSPath(
    "src/lib/shiki/shiki.deno.tsx",
    "src/lib/shiki",
    "shiki.deno.tsx",
    "tsx",
    () => import("~/lib/shiki/shiki.deno.tsx"),
  ),

  "src/lib/shiki/gen.deno.ts": new JSPath(
    "src/lib/shiki/gen.deno.ts",
    "src/lib/shiki",
    "gen.deno.ts",
    "ts",
    () => import("~/lib/shiki/gen.deno.ts"),
  ),

  "src/lib/Hex/index.dual.tsx": new JSPath(
    "src/lib/Hex/index.dual.tsx",
    "src/lib/Hex",
    "index.dual.tsx",
    "tsx",
    () => import("~/lib/Hex/index.dual.tsx"),
  ),

  "src/lib/rxjs-vhtml/vhtml.deno.ts": new JSPath(
    "src/lib/rxjs-vhtml/vhtml.deno.ts",
    "src/lib/rxjs-vhtml",
    "vhtml.deno.ts",
    "ts",
    () => import("~/lib/rxjs-vhtml/vhtml.deno.ts"),
  ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.mjs":
    new Path(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.mjs",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      "jsx-runtime.mjs",
      "mjs",
    ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts":
    new JSPath(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      "jsx-runtime.d.ts",
      "ts",
      () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.ts"
        ),
    ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js":
    new JSPath(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      "jsx-runtime.js",
      "js",
      () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.js"
        ),
    ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts":
    new Path(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2/jsx-runtime.d.mts",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/v2",
      "jsx-runtime.d.mts",
      "mts",
    ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js":
    new JSPath(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml",
      "vhtml.deno.js",
      "js",
      () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.js"
        ),
    ),

  "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts":
    new JSPath(
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts",
      "src/lib/rxjs-vhtml/v2/out/rxjs-vhtml",
      "vhtml.deno.d.ts",
      "ts",
      () =>
        import(
          "~/lib/rxjs-vhtml/v2/out/rxjs-vhtml/vhtml.deno.d.ts"
        ),
    ),

  "src/lib/rxjs-vhtml/v2/out/lib.dual.js": new JSPath(
    "src/lib/rxjs-vhtml/v2/out/lib.dual.js",
    "src/lib/rxjs-vhtml/v2/out",
    "lib.dual.js",
    "js",
    () => import("~/lib/rxjs-vhtml/v2/out/lib.dual.js"),
  ),

  "src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts": new JSPath(
    "src/lib/rxjs-vhtml/v2/out/lib.dual.d.ts",
    "src/lib/rxjs-vhtml/v2/out",
    "lib.dual.d.ts",
    "ts",
    () => import("~/lib/rxjs-vhtml/v2/out/lib.dual.d.ts"),
  ),

  "src/lib/rxjs-vhtml/v2/jsx-runtime.mts": new Path(
    "src/lib/rxjs-vhtml/v2/jsx-runtime.mts",
    "src/lib/rxjs-vhtml/v2",
    "jsx-runtime.mts",
    "mts",
  ),

  "src/lib/rxjs-vhtml/v2/package.json": new Path(
    "src/lib/rxjs-vhtml/v2/package.json",
    "src/lib/rxjs-vhtml/v2",
    "package.json",
    "json",
  ),

  "src/lib/rxjs-vhtml/v2/jsx-runtime.tsx": new JSPath(
    "src/lib/rxjs-vhtml/v2/jsx-runtime.tsx",
    "src/lib/rxjs-vhtml/v2",
    "jsx-runtime.tsx",
    "tsx",
    () => import("~/lib/rxjs-vhtml/v2/jsx-runtime.tsx"),
  ),

  "src/lib/rxjs-vhtml/v2/types.dom.events.dom.ts":
    new JSPath(
      "src/lib/rxjs-vhtml/v2/types.dom.events.dom.ts",
      "src/lib/rxjs-vhtml/v2",
      "types.dom.events.dom.ts",
      "ts",
      () =>
        import(
          "~/lib/rxjs-vhtml/v2/types.dom.events.dom.ts"
        ),
    ),

  "src/lib/fs_watcher.deno.ts": new JSPath(
    "src/lib/fs_watcher.deno.ts",
    "src/lib",
    "fs_watcher.deno.ts",
    "ts",
    () => import("~/lib/fs_watcher.deno.ts"),
  ),

  "src/lib/ts_experiments/tuple_mapping.deno.ts":
    new JSPath(
      "src/lib/ts_experiments/tuple_mapping.deno.ts",
      "src/lib/ts_experiments",
      "tuple_mapping.deno.ts",
      "ts",
      () =>
        import(
          "~/lib/ts_experiments/tuple_mapping.deno.ts"
        ),
    ),

  "src/lib/remark_rehype/demo-runner.daemon.dom.ts":
    new JSPath(
      "src/lib/remark_rehype/demo-runner.daemon.dom.ts",
      "src/lib/remark_rehype",
      "demo-runner.daemon.dom.ts",
      "ts",
      () =>
        import(
          "~/lib/remark_rehype/demo-runner.daemon.dom.ts"
        ),
    ),

  "src/lib/remark_rehype/demo-runner.dom.ts": new JSPath(
    "src/lib/remark_rehype/demo-runner.dom.ts",
    "src/lib/remark_rehype",
    "demo-runner.dom.ts",
    "ts",
    () => import("~/lib/remark_rehype/demo-runner.dom.ts"),
  ),

  "src/lib/remark_rehype/remark-plant-uml.deno.ts":
    new JSPath(
      "src/lib/remark_rehype/remark-plant-uml.deno.ts",
      "src/lib/remark_rehype",
      "remark-plant-uml.deno.ts",
      "ts",
      () =>
        import(
          "~/lib/remark_rehype/remark-plant-uml.deno.ts"
        ),
    ),

  "src/lib/remark_rehype/demo-runner.dual.ts": new JSPath(
    "src/lib/remark_rehype/demo-runner.dual.ts",
    "src/lib/remark_rehype",
    "demo-runner.dual.ts",
    "ts",
    () => import("~/lib/remark_rehype/demo-runner.dual.ts"),
  ),

  "src/lib/remark_rehype/remarkNestSections.deno.ts":
    new JSPath(
      "src/lib/remark_rehype/remarkNestSections.deno.ts",
      "src/lib/remark_rehype",
      "remarkNestSections.deno.ts",
      "ts",
      () =>
        import(
          "~/lib/remark_rehype/remarkNestSections.deno.ts"
        ),
    ),

  "src/lib/CodeTabs/index.dual.tsx": new JSPath(
    "src/lib/CodeTabs/index.dual.tsx",
    "src/lib/CodeTabs",
    "index.dual.tsx",
    "tsx",
    () => import("~/lib/CodeTabs/index.dual.tsx"),
  ),

  "src/lib/Path/funcs.ts": new JSPath(
    "src/lib/Path/funcs.ts",
    "src/lib/Path",
    "funcs.ts",
    "ts",
    () => import("~/lib/Path/funcs.ts"),
  ),

  "src/lib/Path/types.ts": new JSPath(
    "src/lib/Path/types.ts",
    "src/lib/Path",
    "types.ts",
    "ts",
    () => import("~/lib/Path/types.ts"),
  ),

  "src/lib/Path/index.ts": new JSPath(
    "src/lib/Path/index.ts",
    "src/lib/Path",
    "index.ts",
    "ts",
    () => import("~/lib/Path/index.ts"),
  ),

  "src/lib/lib.deno.ts": new JSPath(
    "src/lib/lib.deno.ts",
    "src/lib",
    "lib.deno.ts",
    "ts",
    () => import("~/lib/lib.deno.ts"),
  ),

  "src/lib/lib.dom.ts": new JSPath(
    "src/lib/lib.dom.ts",
    "src/lib",
    "lib.dom.ts",
    "ts",
    () => import("~/lib/lib.dom.ts"),
  ),

  "src/lib/leet/add-two-numbers.deno.ts": new JSPath(
    "src/lib/leet/add-two-numbers.deno.ts",
    "src/lib/leet",
    "add-two-numbers.deno.ts",
    "ts",
    () => import("~/lib/leet/add-two-numbers.deno.ts"),
  ),

  "src/lib/idea.deno.tsx": new JSPath(
    "src/lib/idea.deno.tsx",
    "src/lib",
    "idea.deno.tsx",
    "tsx",
    () => import("~/lib/idea.deno.tsx"),
  ),

  "src/lib/0_RenderBase.deno.tsx": new JSPath(
    "src/lib/0_RenderBase.deno.tsx",
    "src/lib",
    "0_RenderBase.deno.tsx",
    "tsx",
    () => import("~/lib/0_RenderBase.deno.tsx"),
  ),

  "src/lib/00_Remark2.deno.tsx": new JSPath(
    "src/lib/00_Remark2.deno.tsx",
    "src/lib",
    "00_Remark2.deno.tsx",
    "tsx",
    () => import("~/lib/00_Remark2.deno.tsx"),
  ),

  "src/lib/0_Layout.dual.tsx": new JSPath(
    "src/lib/0_Layout.dual.tsx",
    "src/lib",
    "0_Layout.dual.tsx",
    "tsx",
    () => import("~/lib/0_Layout.dual.tsx"),
  ),

  "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts":
    new JSPath(
      "src/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts",
      "src/lib/ridiculous_file_watchers",
      "fix-deno-vscode-settings.deno.ts",
      "ts",
      () =>
        import(
          "~/lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts"
        ),
    ),

  "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts":
    new JSPath(
      "src/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts",
      "src/lib/ridiculous_file_watchers",
      "SITEMAP_generator.deno.ts",
      "ts",
      () =>
        import(
          "~/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts"
        ),
    ),

  "src/lib/lib.dual.ts": new JSPath(
    "src/lib/lib.dual.ts",
    "src/lib",
    "lib.dual.ts",
    "ts",
    () => import("~/lib/lib.dual.ts"),
  ),

  "src/lib/path_helpers.deno.ts": new JSPath(
    "src/lib/path_helpers.deno.ts",
    "src/lib",
    "path_helpers.deno.ts",
    "ts",
    () => import("~/lib/path_helpers.deno.ts"),
  ),

  "src/lib/client/img-onclick.dom.js": new JSPath(
    "src/lib/client/img-onclick.dom.js",
    "src/lib/client",
    "img-onclick.dom.js",
    "js",
    () => import("~/lib/client/img-onclick.dom.js"),
  ),

  "src/lib/client/dialog-closeby-attribute-polyfill.dom.js":
    new JSPath(
      "src/lib/client/dialog-closeby-attribute-polyfill.dom.js",
      "src/lib/client",
      "dialog-closeby-attribute-polyfill.dom.js",
      "js",
      () =>
        import(
          "~/lib/client/dialog-closeby-attribute-polyfill.dom.js"
        ),
    ),

  "src/lib/client/invokers.dom.js": new JSPath(
    "src/lib/client/invokers.dom.js",
    "src/lib/client",
    "invokers.dom.js",
    "js",
    () => import("~/lib/client/invokers.dom.js"),
  ),

  "src/lib/client/TOC_intersection_polyfill.js": new JSPath(
    "src/lib/client/TOC_intersection_polyfill.js",
    "src/lib/client",
    "TOC_intersection_polyfill.js",
    "js",
    () =>
      import("~/lib/client/TOC_intersection_polyfill.js"),
  ),

  "src/lib/client/checkbox.init.dom.js": new JSPath(
    "src/lib/client/checkbox.init.dom.js",
    "src/lib/client",
    "checkbox.init.dom.js",
    "js",
    () => import("~/lib/client/checkbox.init.dom.js"),
  ),

  "src/lib/client/on-click-scroll.dom.ts": new JSPath(
    "src/lib/client/on-click-scroll.dom.ts",
    "src/lib/client",
    "on-click-scroll.dom.ts",
    "ts",
    () => import("~/lib/client/on-click-scroll.dom.ts"),
  ),

  "src/lib/client/code-copy.init.dom.js": new JSPath(
    "src/lib/client/code-copy.init.dom.js",
    "src/lib/client",
    "code-copy.init.dom.js",
    "js",
    () => import("~/lib/client/code-copy.init.dom.js"),
  ),

  "src/lib/client/auto-sticky-stack.js": new JSPath(
    "src/lib/client/auto-sticky-stack.js",
    "src/lib/client",
    "auto-sticky-stack.js",
    "js",
    () => import("~/lib/client/auto-sticky-stack.js"),
  ),

  "src/lib/client/debug-range.js": new JSPath(
    "src/lib/client/debug-range.js",
    "src/lib/client",
    "debug-range.js",
    "js",
    () => import("~/lib/client/debug-range.js"),
  ),

  "src/lib/form_helpers/with.forms.dom.ts": new JSPath(
    "src/lib/form_helpers/with.forms.dom.ts",
    "src/lib/form_helpers",
    "with.forms.dom.ts",
    "ts",
    () => import("~/lib/form_helpers/with.forms.dom.ts"),
  ),

  "src/lib/form_helpers/types.dual.ts": new JSPath(
    "src/lib/form_helpers/types.dual.ts",
    "src/lib/form_helpers",
    "types.dual.ts",
    "ts",
    () => import("~/lib/form_helpers/types.dual.ts"),
  ),

  "src/lib/form_helpers/with.dom.ts": new JSPath(
    "src/lib/form_helpers/with.dom.ts",
    "src/lib/form_helpers",
    "with.dom.ts",
    "ts",
    () => import("~/lib/form_helpers/with.dom.ts"),
  ),

  "src/pages/about.astro": new Path(
    "src/pages/about.astro",
    "src/pages",
    "about.astro",
    "astro",
  ),

  "src/pages/resume.astro": new Path(
    "src/pages/resume.astro",
    "src/pages",
    "resume.astro",
    "astro",
  ),

  "src/pages/blog/index.astro": new Path(
    "src/pages/blog/index.astro",
    "src/pages/blog",
    "index.astro",
    "astro",
  ),

  "src/pages/tags/index.astro": new Path(
    "src/pages/tags/index.astro",
    "src/pages/tags",
    "index.astro",
    "astro",
  ),

  "src/pages/tags/[tag].astro": new Path(
    "src/pages/tags/[tag].astro",
    "src/pages/tags",
    "[tag].astro",
    "astro",
  ),

  "src/apps/trpc.listen.deno.ts": new JSPath(
    "src/apps/trpc.listen.deno.ts",
    "src/apps",
    "trpc.listen.deno.ts",
    "ts",
    () => import("~/apps/trpc.listen.deno.ts"),
  ),

  "src/apps/types.ts": new JSPath(
    "src/apps/types.ts",
    "src/apps",
    "types.ts",
    "ts",
    () => import("~/apps/types.ts"),
  ),

  "src/apps/trpc.deno.ts": new JSPath(
    "src/apps/trpc.deno.ts",
    "src/apps",
    "trpc.deno.ts",
    "ts",
    () => import("~/apps/trpc.deno.ts"),
  ),

  "src/apps/task/frontend/api.dom.ts": new JSPath(
    "src/apps/task/frontend/api.dom.ts",
    "src/apps/task/frontend",
    "api.dom.ts",
    "ts",
    () => import("~/apps/task/frontend/api.dom.ts"),
  ),

  "src/apps/task/frontend/index.dom.tsx": new JSPath(
    "src/apps/task/frontend/index.dom.tsx",
    "src/apps/task/frontend",
    "index.dom.tsx",
    "tsx",
    () => import("~/apps/task/frontend/index.dom.tsx"),
  ),

  "src/apps/task/frontend/drag_handlers.dom.ts": new JSPath(
    "src/apps/task/frontend/drag_handlers.dom.ts",
    "src/apps/task/frontend",
    "drag_handlers.dom.ts",
    "ts",
    () =>
      import("~/apps/task/frontend/drag_handlers.dom.ts"),
  ),

  "src/apps/task/frontend/forms.dom.tsx": new JSPath(
    "src/apps/task/frontend/forms.dom.tsx",
    "src/apps/task/frontend",
    "forms.dom.tsx",
    "tsx",
    () => import("~/apps/task/frontend/forms.dom.tsx"),
  ),

  "src/apps/task/frontend/components.dom.tsx": new JSPath(
    "src/apps/task/frontend/components.dom.tsx",
    "src/apps/task/frontend",
    "components.dom.tsx",
    "tsx",
    () => import("~/apps/task/frontend/components.dom.tsx"),
  ),

  "src/apps/task/types.ts": new JSPath(
    "src/apps/task/types.ts",
    "src/apps/task",
    "types.ts",
    "ts",
    () => import("~/apps/task/types.ts"),
  ),

  "src/apps/task/db/index.json": new Path(
    "src/apps/task/db/index.json",
    "src/apps/task/db",
    "index.json",
    "json",
  ),

  "src/apps/task/api/index.trpc.deno.ts": new JSPath(
    "src/apps/task/api/index.trpc.deno.ts",
    "src/apps/task/api",
    "index.trpc.deno.ts",
    "ts",
    () => import("~/apps/task/api/index.trpc.deno.ts"),
  ),

  "src/apps/trpc.client.dom.ts": new JSPath(
    "src/apps/trpc.client.dom.ts",
    "src/apps",
    "trpc.client.dom.ts",
    "ts",
    () => import("~/apps/trpc.client.dom.ts"),
  ),
} as const
export type FILESYSTEM = typeof FS
export const SITEMAP = new SITEMAP_PART<FILESYSTEM>(FS)

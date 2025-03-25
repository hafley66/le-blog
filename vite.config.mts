import { existsSync, rmSync } from "node:fs"
import { copyFile, link, rename } from "node:fs/promises"
import { resolve } from "node:path"
import { glob } from "glob"
import { defineConfig } from "vite"

// console.log({ serverRewrites });
export default defineConfig(async it => {
  // https://vite.dev/config/
  const fileGlob = "src/**/*.vite.html"
  const htmlFiles = glob
    .sync(fileGlob, {
      ignore: ["dist/**", "node_modules/**"],
    })
    .reduce(
      (acc, path) => {
        if (it.command === "serve")
          acc[
            path.replace(".vite", "").replace(/^src/i, "")
          ] = path.replace(/^src/i, "")
        else {
          acc[path.replace(".vite", "")] = path
        }
        return acc
      },
      {} as Record<string, string>,
    )

  // console.log(htmlFiles)
  const serverRewrites = Object.fromEntries(
    Object.entries(htmlFiles)
      .map(([k, v]) => [`^${k}$`, v]) // This server config only listens to regex strings that begin with ^
      .flatMap(([key, value]) => [
        [
          key,
          {
            target: "http://localhost:5173",
            rewrite: () => value,
          },
        ],
        [
          key.replace(".html", ""),
          {
            target: "http://localhost:5173",
            rewrite: () => value,
          },
        ],
        [
          key.replace("/index.html", ""),
          {
            target: "http://localhost:5173",
            rewrite: () => value,
          },
        ],
      ]),
  )

  const input = {
    ...(it.command === "build"
      ? await Promise.all(
          Object.entries(htmlFiles).map(([k, v]) =>
            link(
              `${process.cwd()}/${v}`,
              `${process.cwd()}/${v.replace("index.vite.html", "index.html")}`,
            ),
          ),
        ).then(() => {
          return Object.fromEntries(
            Object.entries(htmlFiles).map(
              i =>
                [
                  i[0],
                  i[1].replace("vite.html", "html"),
                ] as const,
            ),
          )
        })
      : htmlFiles),
    ...Object.fromEntries(
      glob
        .sync("src/**/*.dom.*ts*", {
          ignore: ["dist/**", "node_modules/**"],
        })
        .map(i => [i, i]),
    ),
  }

  console.log({ input })

  return {
    root: "src",
    publicDir: `${process.cwd()}/public`,
    plugins: [
      {
        name: "remove index.html copies",
        buildEnd(error) {
          Object.entries(htmlFiles).map(([k, v]) =>
            rmSync(
              `${process.cwd()}/${v.replace("index.vite.html", "index.html")}`,
            ),
          )
        },
      },
    ],
    build: {
      emptyOutDir: true,
      assetsDir: "assets",
      outDir: `${process.cwd()}/dist`,
      minify: false,
      copyPublicDir: true,
      target: "ES2024",
      rollupOptions: {
        input,
        // output: {
        //   manualChunks: id => {
        //     if (id.includes("node_modules")) {
        //       return "vendor"
        //     }
        //   },
        // },
      },
    },
    server: {
      proxy: {
        ...serverRewrites,
      },
    },
    esbuild: {
      jsx: "automatic",
      jsxDev: false,
      jsxImportSource: "~/lib/rxjs-vhtml/v2",
      // jsxInject: `import { jsx } from '~/lib/rxjs-vhtml/v2/jsx-runtime'`,
      // jsxFactory: "jsx",
    },

    resolve: {
      alias: {
        "~": resolve(process.cwd(), "src"),
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "rxjs", "lodash"],
    },
  }
})

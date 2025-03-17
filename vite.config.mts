import { defineConfig } from "vite";
import { glob } from "glob";
import { resolve } from "node:path";
import { existsSync } from "node:fs";

// https://vite.dev/config/
const fileGlob = "src/**/*.vite.html";
const htmlFiles = glob
  .sync(fileGlob, {
    ignore: ["dist/**", "node_modules/**"],
  })
  .reduce(
    (acc, path) => {
      acc[path.replace(".vite", "").replace(/^src/i, "")] = path.replace(
        /^src/i,
        "",
      );
      return acc;
    },
    {} as Record<string, string>,
  );

console.log(htmlFiles);
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
);
console.log({ serverRewrites });
export default defineConfig({
  root: "src",
  publicDir: process.cwd() + "/public",
  build: {
    assetsDir: "",
    outDir: process.cwd() + "/dist",
    minify: false,
    copyPublicDir: true,
    target: "ES2024",
    rollupOptions: {
      input: htmlFiles,
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

  resolve: {
    alias: {
      "~": resolve(process.cwd(), "src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "rxjs", "lodash"],
  },
});

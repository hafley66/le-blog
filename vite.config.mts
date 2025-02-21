import { defineConfig } from "vite";
import { glob } from "glob";
import { resolve } from "path";

// https://vite.dev/config/
const fileGlob = "**/*.html";
const htmlFiles = glob
  .sync(fileGlob, { ignore: ["dist/**", "node_modules/**"] })
  // .concat(glob.sync("public/blog/**/*.html"))
  .reduce(
    (acc, path) => {
      acc[path] = path;
      return acc;
    },
    {} as Record<string, string>,
  );

console.log(htmlFiles);

export default defineConfig({
  experimental: {
    // renderBuiltUrl: (filename, type) => {
    //   console.log({ filename, type });
    //   if (type.hostType === "html" && type.type === "asset") {
    //     filename;
    //   }
    //   return filename;
    // },
  },
  plugins: [
    // {
    //   name: "html-partials",
    //   transformIndexHtml: {
    //     order: "pre",
    //     async handler(html) {
    //       // create a DOM on the server
    //       const dom = html;
    //       // console.log({ html });
    //       // get list of file names
    //       // return the updated html string
    //       return dom;
    //     },
    //   },
    // },
  ],
  logLevel: "info",
  build: {
    assetsDir: "",

    minify: false,
    copyPublicDir: true,
    target: "ES2024",
    rollupOptions: {
      input: htmlFiles,
      output: {
        manualChunks: id => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  // root: resolve(process.cwd(), "src"),
  resolve: {
    alias: {
      "~": resolve(process.cwd(), "src"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "rxjs",
      "lodash",
      "shiki/wasm",
      "@shikijs/langs/javascript",
      "@shikijs/langs/typescript",
      "@shikijs/langs/html",
      "@shikijs/langs/bash",
      "@shikijs/langs/css",
      "jquery",
      "@shikijs/themes/nord",
      "shiki/core",
      "shiki/engine/oniguruma",
    ],
  },
});

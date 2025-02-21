import { defineConfig } from "vite";
import { glob } from "glob";
import { resolve } from "path";

// https://vite.dev/config/
const fileGlob = "src/**/*.html";
const htmlFiles = glob
  .sync(fileGlob)
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
  plugins: [],
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

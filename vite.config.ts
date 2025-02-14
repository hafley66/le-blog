import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { resolve } from "path";
// https://vite.dev/config/
const fileGlob = "src/**/*.html";
const htmlFiles = glob.sync(fileGlob).reduce((acc, path) => {
  acc[path] = path;
  return acc;
}, {});

console.log("WTF", htmlFiles);
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
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
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "rxjs"],
  },
});

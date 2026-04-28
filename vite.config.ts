/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }: { mode: string }) =>
  defineConfig({
    plugins: [
      tailwindcss(),
      react(),
      viteCompression(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/global.scss" as *;`,
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
    },
  });
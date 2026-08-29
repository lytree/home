import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueJsxVapor from "vue-jsx-vapor/vite";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

export default ({ mode }: { mode: string }) =>
  defineConfig({
    plugins: [
      tailwindcss(),
      vue(),
      vueJsxVapor({
        include: /.[jt]sx?$/,
        exclude: /node_modules/,
      }),
      viteCompression(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: {
          chrome: 112 << 16,
          firefox: 117 << 16,
          safari: 162 << 16,
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

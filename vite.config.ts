import react from "@vitejs/plugin-react";
import { resolve } from "path";
import gzipPlugin from "rollup-plugin-gzip";
import { promisify } from "util";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import VitePluginWebpCompress from "vite-plugin-webp-compress";
import { brotliCompress, constants } from "zlib";

const brotliPromise = promisify(brotliCompress);

const compressOptionsDevelopment = {
  drop_console: false,
  drop_debugger: false,
};

const compressOptionsProduction = {
  drop_console: true,
  drop_debugger: true,
};

const noCompressExtensions = ["webp", "png", "jpg", "jpeg", "gif"];

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), VitePluginWebpCompress()],
    server: {
      port: parseInt(env.VITE_APP_PORT) || 4000,
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: parseInt(env.VITE_APP_PORT) || 4000,
      },
      allowedHosts: [env.VITE_SHOPIFY_HOST_NAME?.replace(/^https?:\/\//, "")],
    },
    preview: {
      port: parseInt(env.VITE_APP_PORT) || 4000,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    optimizeDeps: {
      force: true,
    },
    terserOptions: {
      format: {
        comments: false,
      },
      compress:
        env.VITE_APP_ENV === "production"
          ? compressOptionsProduction
          : compressOptionsDevelopment,
    },
    build: {
      assetsInlineLimit: 200,
      minify: "terser" as const,
      reportCompressedSize: false,
      rollupOptions: {
        plugins: [
          gzipPlugin({
            filter: (fileName) =>
              noCompressExtensions.every((ext) => !fileName.endsWith(ext)),
            customCompression: (content) =>
              brotliPromise(
                Buffer.isBuffer(content) ? content : Buffer.from(content),
                {
                  params: {
                    [constants.BROTLI_PARAM_QUALITY]:
                      constants.BROTLI_MAX_QUALITY,
                    [constants.BROTLI_PARAM_SIZE_HINT]: content.length,
                    [constants.BROTLI_PARAM_LGWIN]:
                      constants.BROTLI_LARGE_MAX_WINDOW_BITS,
                    [constants.BROTLI_PARAM_LGBLOCK]:
                      constants.BROTLI_MAX_INPUT_BLOCK_BITS,
                  },
                }
              ),
            fileName: ".br",
          }),
        ],
        input: {
          main: resolve(__dirname, "index.html"),
          // fullscreen: resolve(__dirname, 'fullscreen/index.html'),
          // maintain: resolve(__dirname, 'maintain.html')
        },
      },
    },
  };
});

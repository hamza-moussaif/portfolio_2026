import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "netlify",
    output: {
      dir: ".netlify/functions-internal",
      serverDir: ".netlify/functions-internal/server",
      publicDir: "dist",
    },
  },
});

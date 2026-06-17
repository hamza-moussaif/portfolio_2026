import { defineConfig } from "vite";
import { TanStackStartVite } from "@tanstack/start-plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackStartVite({
      server: {
        preset: "netlify",
      },
    }),
    react(),
    tailwindcss(),
  ],
});

import { defineConfig } from "vite";
import { TanStackStartVite } from "@tanstack/react-start/plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackStartVite({
      server: {
        preset: "netlify",
      },
    }),
    react(),
  ],
});

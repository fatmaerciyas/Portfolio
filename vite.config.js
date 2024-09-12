import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/", // This should match your GitHub Pages repository path
  build: {
    outDir: "dist", // build
  },
});

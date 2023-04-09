import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
  plugins: [eslint(), jsconfigPaths()],
});

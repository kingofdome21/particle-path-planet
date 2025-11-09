import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react()];

  // Load lovable-tagger only in development and only if available
  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    } catch (err) {
      // Optional dependency not available outside Lovable editor – safely ignore
      console.warn("lovable-tagger not available, skipping.");
    }
  }

  return {
    // Dynamic base for GitHub Pages (set via VITE_BASE_PATH in CI) or "/" locally
    base: process.env.VITE_BASE_PATH || "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      host: "8080-ioojwnmrvnnc4w72o9fzm-b2a32a7a.manusvm.computer",
      protocol: "wss",
    },
    origin: "https://8080-ioojwnmrvnnc4w72o9fzm-b2a32a7a.manusvm.computer",
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

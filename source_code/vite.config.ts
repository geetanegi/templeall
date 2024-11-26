import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/", // Replace with your desired base path
  plugins: [react()],
  server: {
    port: 8080, // Replace 3001 with your desired port
  },
  define: {
    global: {},
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Remove hash for PDF files
          if (assetInfo.name && assetInfo.name.endsWith(".pdf")) {
            return "assets/[name].[ext]";
          }
          // Keep hash for other assets
          return "assets/[name]-[hash].[ext]";
        },
      },
    },
  },
});

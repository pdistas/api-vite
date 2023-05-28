import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts"
    })
  ],
  optimizeDeps: {
    include: ["express"]
  }
});

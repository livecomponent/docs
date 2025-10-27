import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import path from "path";

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  esbuild: {
    keepNames: true,
  },
  resolve: {
    alias: {
      "@camertron/live-component": "/Users/camertron/workspace/camertron/live_component/testapp/app/javascript/@camertron/live-component",
      "app/components": path.resolve(__dirname, "app/components"),
    },
  },
})

import { defineConfig } from "vitest/config"
import path from "path"

// ---------------------------------------------------------------------------
// Vitest configuration
//
// Runs purely in Node — no DOM, no browser.
// Only the pure lib/ domain logic is tested here; React components are not.
// ---------------------------------------------------------------------------

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})

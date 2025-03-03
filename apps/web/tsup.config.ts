import { defineConfig } from "tsup";
import type { Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["lib/editor/index.ts"],
  banner: {
    js: "'use client'",
  },
  minify: true,
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  ...options,
})); 
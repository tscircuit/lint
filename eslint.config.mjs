import tsParser from "@typescript-eslint/parser"
import jsoncParser from "jsonc-eslint-parser"
import customPlugin from "./dist/index.js"

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "@tscircuit/lint": customPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@tscircuit/lint/banned-words": "error",
      "@tscircuit/lint/two-params": "error",
      "@tscircuit/lint/context-pattern": "error",
      "@tscircuit/lint/camel-case": "error",
      "@tscircuit/lint/snake-case": "error",
    },
  },
  {
    // Add separate config for package.json
    files: ["package.json"],
    plugins: {
      "@tscircuit/lint": customPlugin,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      "@tscircuit/lint/tscircuit-deps": "error",
    },
  },
]

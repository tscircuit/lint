import tsParser from "@typescript-eslint/parser"
import customPlugin from "./dist/index.js" // Import your local plugin

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "my-custom-plugin": customPlugin, // Register your plugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "my-custom-plugin/banned-words": "error", // Enable your custom rule
      "my-custom-plugin/two-params": "error", // Enable your custom rule
    },
  },
]

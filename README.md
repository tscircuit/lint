# @tscircuit/lint

A custom ESLint plugin for enforcing code quality standards in TSCircuit projects.

## Features

This plugin includes two main rules:

### 1. banned-words
Prevents the use of generic variable names to encourage more descriptive naming conventions.

Banned terms:
- `data`
- `info`
- `value`
- `param`

Example:
```ts
// ❌ Bad
const data = {};
const userInfo = {};
const paramValue = 5;

// ✅ Good
const orderDetails = {};
const customerProfile = {};
const priceAmount = 5;
```

### 2. two-params
Enforces a maximum of two parameters in functions to promote better function design through object parameters or the context pattern.

Example:
```ts
// ❌ Bad
function process(name, age, address, phone) {}

// ✅ Good
function process(userDetails, context) {}
function process({ name, age, address, phone }) {}
```

## Installation

```bash
bun add -D @tscircuit/lint
```

## Configuration

Add to your `eslint.config.mjs`:

```javascript
import tsParser from "@typescript-eslint/parser";
import tscircuitLint from "@tscircuit/lint";

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "@tscircuit/lint": tscircuitLint,
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
    },
  },
];
```

## Development

```bash
# Install dependencies
bun install

# Build the project
bun run build

# Run tests
bun test

# Run linting
bun run lint
```

## License

MIT © [tscircuit](LICENSE)

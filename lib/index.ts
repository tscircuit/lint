#!/usr/bin/env node

import bannedWords from "./rules/banned-words"
import twoParams from "./rules/two-params"
import tscircuitDeps from "./rules/tscircuit-deps"
import contextPattern from "./rules/context-pattern"
import camelCase from "./rules/camel-case"
import snakeCase from "./rules/snake-case"
const plugin = {
  // preferred location of name and version
  meta: {
    name: "@tscircuit/lint",
    version: "0.0.1",
  },
  rules: {
    "banned-words": bannedWords,
    "two-params": twoParams,
    "tscircuit-deps": tscircuitDeps,
    "context-pattern": contextPattern,
    "camel-case": camelCase,
    "snake-case": snakeCase,
  },
}

// for ESM
export default plugin

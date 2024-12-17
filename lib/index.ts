import bannedWords from "./rules/banned-words"
import twoParams from "./rules/two-params"

const plugin = {
  // preferred location of name and version
  meta: {
    name: "@tscircuit/lint",
    version: "0.0.1",
  },
  rules: {
    "banned-words": bannedWords,
    "two-params": twoParams,
  },
}

// for ESM
export default plugin

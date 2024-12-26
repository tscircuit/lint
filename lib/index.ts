import bannedWords from "./rules/banned-words"
import twoParams from "./rules/two-params"
import tscircuitDependencies from "./rules/tscircuit-dependencies" // Import new rule

const plugin = {
  meta: {
    name: "@tscircuit/lint",
    version: "0.0.1",
  },
  rules: {
    "banned-words": bannedWords,
    "two-params": twoParams,
    "tscircuit-dependencies": tscircuitDependencies, // Add new rule
  },
}

// for ESM
export default plugin

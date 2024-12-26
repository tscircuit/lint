import type { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure tscircuit dependencies are either devDependencies or peerDependencies (not listed in `dependencies`)",
    },
    fixable: "code",
    schema: [], // no options
    messages: {
      incorrectDependency:
        "tscircuit dependencies should be listed in devDependencies or peerDependencies only.",
      missingDevDependency:
        "tscircuit peerDependencies must also be listed as devDependencies.",
      incorrectPeerDependencyVersion:
        "tscircuit peerDependencies must have a version of '*'",
    },
  },
  create: function (context: Rule.RuleContext) {
    let packageJson
    try {
      packageJson = JSON.parse(context.getSourceCode().text)
    } catch (error: any) {
      context.report({
        loc: { line: 1, column: 0 }, // Report at the start of the file
        message: `JSON parsing error: ${error.message}`,
      })
      return {}
    }

    const dependencies = packageJson.dependencies || {}
    const devDependencies = packageJson.devDependencies || {}
    const peerDependencies = packageJson.peerDependencies || {}
    const tscircuitDependencies = [
      "@tscircuit/*",
      "circuit-to-svg",
      "jscad-fiber",
      "jscad-electronics",
      "circuit-json",
      "dsn-converter",
      "circuit-json-to-*",
    ]

    function isTscircuitDependency(dep: string): boolean {
      return tscircuitDependencies.some((pattern) => {
        const regex = new RegExp(`^${pattern.replace("*", ".*")}$`)
        return regex.test(dep)
      })
    }

    return {
      Program: function (node) {
        Object.keys(dependencies).forEach((dep) => {
          if (isTscircuitDependency(dep)) {
            context.report({
              node,
              messageId: "incorrectDependency",
            })
          }
        })

        Object.keys(peerDependencies).forEach((dep) => {
          if (isTscircuitDependency(dep)) {
            if (peerDependencies[dep] !== "*") {
              context.report({
                node,
                messageId: "incorrectPeerDependencyVersion",
              })
            }
            if (!devDependencies[dep]) {
              context.report({
                node,
                messageId: "missingDevDependency",
              })
            }
          }
        })
      },
    }
  },
}

export default rule

import type { Rule } from "eslint"
import { readFileSync } from "fs"
import { join } from "path"

const TSCIRCUIT_PATTERNS = [
  "@tscircuit/*",
  "circuit-to-svg",
  "jscad-fiber",
  "jscad-electronics",
  "circuit-json",
  "dsn-converter",
  "circuit-json-to-*",
]

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce TSCircuit dependency rules in package.json",
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        // Only run on package.json files
        if (!context.getFilename().endsWith("package.json")) {
          return
        }

        try {
          const packageJson = JSON.parse(context.getSourceCode().getText())
          const {
            dependencies = {},
            devDependencies = {},
            peerDependencies = {},
          } = packageJson

          // Helper to check if a package matches TSCircuit patterns
          const isTSCircuitDep = (pkg: string) => {
            return TSCIRCUIT_PATTERNS.some((pattern) => {
              if (pattern.endsWith("*")) {
                const prefix = pattern.slice(0, -1)
                return pkg.startsWith(prefix)
              }
              return pkg === pattern
            })
          }

          // Check dependencies section
          Object.keys(dependencies || {}).forEach((pkg) => {
            if (isTSCircuitDep(pkg)) {
              context.report({
                node,
                message: `TSCircuit package "${pkg}" should be in devDependencies or peerDependencies, not dependencies`,
              })
            }
          })

          // Check peerDependencies
          Object.entries(peerDependencies || {}).forEach(([pkg, version]) => {
            if (isTSCircuitDep(pkg)) {
              // Must have corresponding devDependency
              if (!devDependencies[pkg]) {
                context.report({
                  node,
                  message: `TSCircuit peerDependency "${pkg}" must also be listed in devDependencies`,
                })
              }
              // Must use "*" version
              if (version !== "*") {
                context.report({
                  node,
                  message: `TSCircuit peerDependency "${pkg}" must use "*" as version`,
                })
              }
            }
          })
        } catch (error) {
          context.report({
            node,
            message: `Error parsing package.json: ${error}`,
          })
        }
      },
    }
  },
}

export default rule

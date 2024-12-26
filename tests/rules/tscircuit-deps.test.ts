import { RuleTester } from "eslint"
import rule from "../../lib/rules/tscircuit-deps"
import { test } from "bun:test"
import jsoncParser from "jsonc-eslint-parser"

test("tscircuit-deps", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        sourceType: "module",
      },
    },
  })

  ruleTester.run("tscircuit-deps", rule, {
    valid: [
      {
        filename: "package.json",
        code: JSON.stringify({
          devDependencies: {
            "@tscircuit/core": "^1.0.0",
            "jscad-fiber": "^2.0.0",
          },
          peerDependencies: {
            "@tscircuit/core": "*",
            "jscad-fiber": "*",
          },
          dependencies: {
            "other-package": "^1.0.0",
          },
        }),
      },
    ],
    invalid: [
      {
        filename: "package.json",
        code: JSON.stringify({
          dependencies: {
            "@tscircuit/builder": "^1.0.0",
          },
        }),
        errors: [
          {
            message:
              'TSCircuit package "@tscircuit/builder" should be in devDependencies or peerDependencies, not dependencies',
          },
        ],
      },
      {
        filename: "package.json",
        code: JSON.stringify({
          peerDependencies: {
            "@tscircuit/core": "^1.0.0",
          },
        }),
        errors: [
          {
            message:
              'TSCircuit peerDependency "@tscircuit/core" must also be listed in devDependencies',
          },
          {
            message:
              'TSCircuit peerDependency "@tscircuit/core" must use "*" as version',
          },
        ],
      },
    ],
  })
})

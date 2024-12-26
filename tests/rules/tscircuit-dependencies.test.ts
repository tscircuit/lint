import { RuleTester } from "eslint"
import rule from "../../lib/rules/tscircuit-dependencies"
import { test } from "bun:test"
import tsParser from "@typescript-eslint/parser"

test("tscircuit-dependencies", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })

  ruleTester.run("tscircuit-dependencies", rule, {
    valid: [
      {
        code: `{
          "devDependencies": {
            "@tscircuit/foo": "^1.0.0"
          },
          "peerDependencies": {
            "@tscircuit/foo": "*"
          }
        }`,
        filename: "package.json",
      },
    ],
    invalid: [
      {
        code: `{
          "dependencies": {
            "@tscircuit/foo": "^1.0.0"
          }
        }`,
        filename: "package.json",
        errors: [
          {
            messageId: "incorrectDependency",
          },
        ],
      },
      {
        code: `{
          "peerDependencies": {
            "@tscircuit/foo": "^1.0.0"
          }
        }`,
        filename: "package.json",
        errors: [
          {
            messageId: "incorrectPeerDependencyVersion",
          },
          {
            messageId: "missingDevDependency",
          },
        ],
      },
      {
        code: `{
          "peerDependencies": {
            "@tscircuit/foo": "*"
          }
        }`,
        filename: "package.json",
        errors: [
          {
            messageId: "missingDevDependency",
          },
        ],
      },
    ],
  })
})

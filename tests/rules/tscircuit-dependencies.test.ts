import { RuleTester } from "eslint"
import rule from "../../lib/rules/tscircuit-dependencies"
import { test } from "bun:test"

test("tscircuit-dependencies", () => {
  const ruleTester = new RuleTester({})

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

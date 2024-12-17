import { RuleTester } from "eslint"
import rule from "../../lib/rules/banned-words"
import { test } from "bun:test"

test("banned-words", () => {
  const ruleTester = new RuleTester({})

  ruleTester.run("banned-words", rule, {
    valid: [
      {
        code: "const orderDetails = {};",
      },
      {
        code: "function processOrder() {}",
      },
      {
        code: "const userProfile = { name: 'John' };",
      },
    ],
    invalid: [
      {
        code: "const data = {};",
        errors: [
          {
            message:
              "Avoid using generic term 'data'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'",
          },
        ],
      },
      {
        code: "function processInfo() {}",
        errors: [
          {
            message:
              "Avoid using generic term 'info'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'",
          },
        ],
      },
      {
        code: "const paramValue = 5;",
        errors: [
          {
            message:
              "Avoid using generic term 'param'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'",
          },
          {
            message:
              "Avoid using generic term 'value'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'",
          },
        ],
      },
    ],
  })
})

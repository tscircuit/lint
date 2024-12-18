import { RuleTester } from "eslint"
import rule from "../../lib/rules/two-params"
import { test } from "bun:test"

test("two-params", () => {
  const ruleTester = new RuleTester()

  ruleTester.run("two-params", rule, {
    valid: [
      {
        code: "function test(a, b) {}",
      },
      {
        code: "const fn = (a, b) => {}",
      },
      {
        code: "function single(a) {}",
      },
      {
        code: "const obj = function(params) {}",
      },
      {
        code: "function contextPattern(params, ctx) {}",
      },
    ],
    invalid: [
      {
        code: "function test(a, b, c) {}",
        errors: [
          {
            message:
              "Functions should have at most 2 parameters. Consider using an object parameter or the context pattern instead. Example: (a, b, c) => {} → ({a, b, c}) => {}",
          },
        ],
      },
      {
        code: "const fn = (a, b, c, d) => {}",
        errors: [
          {
            message:
              "Functions should have at most 2 parameters. Consider using an object parameter or the context pattern instead. Example: (a, b, c) => {} → ({a, b, c}) => {}",
          },
        ],
      },
    ],
  })
})

import { RuleTester } from "eslint"
import rule from "../../lib/rules/context-pattern"
import { test } from "bun:test"

test("context-pattern", () => {
  const ruleTester = new RuleTester()

  ruleTester.run("context-pattern", rule, {
    valid: [
      {
        code: "function render(props, ctx) {}",
      },
      {
        code: "const fn = (config, appContext) => {}",
      },
      {
        code: "function process(data, renderContext) {}",
      },
      {
        code: "const single = (props) => {}", // Single param is fine
      },
      {
        code: "function multi(a, b, c) {}", // 3+ params handled by two-params rule
      },
    ],
    invalid: [
      {
        code: "function test(a, b) {}",
        errors: [
          {
            message:
              "When using two parameters, follow the context-passing pattern: first parameter should be a function-specific object, second parameter should be named 'ctx' or end with 'Context'",
          },
        ],
      },
      {
        code: "const fn = (config, helper) => {}",
        errors: [
          {
            message:
              "When using two parameters, follow the context-passing pattern: first parameter should be a function-specific object, second parameter should be named 'ctx' or end with 'Context'",
          },
        ],
      },
    ],
  })
})

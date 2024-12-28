import { RuleTester } from "eslint"
import rule from "../../lib/rules/camel-case" // Ensure path is correct

import { test } from "bun:test"

test("enforce camelCase naming convention", () => {
  const ruleTester = new RuleTester()

  ruleTester.run("camelCase-naming-convention", rule, {
    valid: [
      {
        code: "const myVariable = 1;",
      },
      {
        code: "function processData() {}",
      },
      {
        code: "const userProfileId = 123;",
      },
      {
        code: "const a = 'helloWorld';",
      },
      {
        code: "const b = 'hello';",
      },
    ],
    invalid: [
      {
        code: "const my_string = 1;",
        errors: [
          {
            message: "Variable or function name should be in camelCase.",
          },
        ],
      },
      {
        code: "function get_user_info() {}",
        errors: [
          {
            message: "Variable or function name should be in camelCase.",
          },
        ],
      },
      {
        code: "const my_string = 'hello_world';",
        errors: [
          {
            message: "Variable or function name should be in camelCase.",
          },
          {
            message: "String value should be in camelCase.",
          },
        ],
      },
    ],
  })
})

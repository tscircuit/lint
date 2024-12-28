import { RuleTester } from "eslint"
import rule from "../../lib/rules/snake-case" // Path to your snake-case rule
import { test } from "bun:test"

test("enforce snake_case naming convention", () => {
  const ruleTester = new RuleTester()

  ruleTester.run("snake_case-naming-convention", rule, {
    valid: [
      {
        code: "const my_variable = 1;",
      },
      {
        code: "function process_data() {}",
      },
      {
        code: "const user_profile_id = 123;",
      },
      {
        code: "const a = 'hello_world';",
      },
      {
        code: "const b = 'my_test_case';",
      },
    ],
    invalid: [
      {
        code: "const myVariable = 1;",
        errors: [
          {
            message: "Variable or function name should be in snake_case.",
          },
        ],
      },

      {
        code: "function getUserInfo() {}",
        errors: [
          {
            message: "Variable or function name should be in snake_case.",
          },
        ],
      },

      {
        code: "const myVariable = 'helloWorld';",
        errors: [
          {
            message: "Variable or function name should be in snake_case.",
          },
          {
            message: "String value should be in snake_case.",
          },
        ],
      },

      {
        code: "const UserName = 'JohnDoe';",
        errors: [
          {
            message: "Variable or function name should be in snake_case.",
          },
          {
            message: "String value should be in snake_case.",
          },
        ],
      },
    ],
  })
})

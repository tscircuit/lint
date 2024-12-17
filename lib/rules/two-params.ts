import type { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce maximum of two parameters in functions, suggesting use of object parameters or context pattern",
    },
    fixable: "code",
    schema: [], // no options
    messages: {
      tooManyParams:
        "Functions should have at most 2 parameters. Use an object parameter or context pattern instead.",
    },
  },
  create: function (context: Rule.RuleContext) {
    return {
      FunctionDeclaration(node: any) {
        if (node.params.length > 2) {
          context.report({
            node,
            message:
              "Functions should have at most 2 parameters. Consider using an object parameter or the context pattern instead. Example: (a, b, c) => {} → ({a, b, c}) => {}",
          })
        }
      },
      ArrowFunctionExpression(node: any) {
        if (node.params.length > 2) {
          context.report({
            node,
            message:
              "Functions should have at most 2 parameters. Consider using an object parameter or the context pattern instead. Example: (a, b, c) => {} → ({a, b, c}) => {}",
          })
        }
      },
      FunctionExpression(node: any) {
        if (node.params.length > 2) {
          context.report({
            node,
            message:
              "Functions should have at most 2 parameters. Consider using an object parameter or the context pattern instead. Example: (a, b, c) => {} → ({a, b, c}) => {}",
          })
        }
      },
    }
  },
}

export default rule

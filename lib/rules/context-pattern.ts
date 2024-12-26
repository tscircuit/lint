import type { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce the context-passing pattern for functions with two parameters",
    },
    schema: [], // no options
    messages: {
      invalidContextPattern:
        "When using two parameters, follow the context-passing pattern: first parameter should be a function-specific object, second parameter should be named 'ctx' or end with 'Context'",
    },
  },
  create: function (context: Rule.RuleContext) {
    function checkContextPattern(node: any) {
      if (node.params.length === 2) {
        const secondParam = node.params[1]
        const isValidContextName =
          secondParam.name === "ctx" || secondParam.name.endsWith("Context")

        if (!isValidContextName) {
          context.report({
            node,
            message:
              "When using two parameters, follow the context-passing pattern: first parameter should be a function-specific object, second parameter should be named 'ctx' or end with 'Context'",
          })
        }
      }
    }

    return {
      FunctionDeclaration: checkContextPattern,
      ArrowFunctionExpression: checkContextPattern,
      FunctionExpression: checkContextPattern,
    }
  },
}

export default rule

import type { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce camelCase for variable and function names.",
    },
    schema: [],
    messages: {
      invalidCasing:
        "Variable or function name should be in camelCase.",
    },
  },
  create(context: Rule.RuleContext) {
    // Function to check the variable/function name casing
    const checkCasing = (node: { name: string }) => {
      const name = node.name;

      // If the name contains an underscore, correct it to camelCase
      if (name.includes("_")) {
        context.report({
          node,
          message: `Variable or function name should be in camelCase.`,
        });
      }
    };

    return {
      Identifier: checkCasing, // Apply the check to variables and function names
      Literal: (node) => {
        if (typeof node.value === "string" && /_/.test(node.value)) {
          context.report({
            node,
            message: `String value should be in camelCase.`,
          });
        }
      },
    };
  },
};

export default rule;

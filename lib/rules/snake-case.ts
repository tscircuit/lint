import type { Rule } from "eslint";


const rule: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce snake_case for variable and function names.",
        },
        schema: [],
        messages: {
            invalidCasing:
                "Variable or function name should be in snake_case.",
        },
    },
    create: function (context: Rule.RuleContext) {
        const checkCasing = (node: any) => {
            const name = node.name;

            // Check for camelCase or other casing patterns and convert to snake_case
            if (/[A-Z]/.test(name)) {
                context.report({
                    node,
                    message: `Variable or function name should be in snake_case.`,
                });
            }
        };

        return {
            Identifier: checkCasing, // Apply the check to variables and function names
            Literal: (node) => {
                if (typeof node.value === "string" && /[A-Z]/.test(node.value)) {
                    context.report({
                        node,
                        message: `String value should be in snake_case.`,
                    });
                }
            },
        };
    },
};

export default rule;

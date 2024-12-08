const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["2023/"],
    },
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: "commonjs",
            globals: { ...globals.node, ...globals.jest }
        }
    }
];
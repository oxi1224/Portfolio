module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest"
  },
  globals: {
    React: true
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  rules: {
    "arrow-spacing": ["warn", { before: true, after: true }],
    "comma-dangle": ["error", "only-multiline"],
    "comma-spacing": "error",
    "comma-style": "error",
    "dot-location": ["error", "property"],
    "handle-callback-err": "off",
    indent: ["error", 2],
    "keyword-spacing": "error",
    "max-nested-callbacks": ["error", { max: 4 }],
    "no-console": "off",
    "no-empty-function": "error",
    "no-floating-decimal": "error",
    "no-lonely-if": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
    "@typescript-eslint/no-shadow": [
      "error",
      { allow: ["err", "resolve", "reject"] }
    ],
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    semi: ["error", "always"],
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "no-case-declarations": "off",
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": "error",
    yoda: "error",
    "max-len": ["error", { code: 80, ignoreStrings: true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
        caughtErrorsIgnorePattern: "_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }]
  }
};

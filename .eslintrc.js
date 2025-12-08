// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:recommended-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier", // Must be last
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react", "import", "react-native"],
  ignorePatterns: [
    "dist/",
    "public/",
    "babel-plugins/",
    "node_modules/",
    "*.d.ts",
  ],
  env: {
    browser: true,
    "react-native/react-native": true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
  },
  rules: {
    // React & JSX
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",

    // TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

    // Best practices
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    eqeqeq: ["error", "smart"],
    curly: "error",

    // Import
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],

    // React Native specific
    "react-native/no-unused-styles": "warn",
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": "off",

    // Performance & safety
    "no-var": "error",
    "no-case-declarations": "off",
    "no-empty": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["metro.config.js", "babel.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
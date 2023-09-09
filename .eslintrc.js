module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/function-component-definition": "off",
    "react/jsx-curly-brace-presence": "off",
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/order": "off",
    "no-unused-vars": "warn",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
  },
};

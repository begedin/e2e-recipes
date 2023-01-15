module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    '@vue/typescript',
    'plugin:vue/strongly-recommended',
    'plugin:vue-scoped-css/recommended',
    'prettier',
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 100,
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};

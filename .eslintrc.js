module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['**/node_modules/*'],
      },
    ],
    'no-case-declarations': ['off'],
    'no-async-promise-executor': ['off'],
    'no-useless-escape': ['off'],
    'no-empty': ['off'],
    'require-atomic-updates': ['off'],
    'no-prototype-builtins': ['off'],
    'no-extra-boolean-cast': ['off'],
    'no-unused-vars': ['off'],
    'prefer-const': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/consistent-type-assertions': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/ban-ts-ignore': ['off'],
  },
};
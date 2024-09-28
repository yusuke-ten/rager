module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['perfectionist', 'unused-imports'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
    // unused imports
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      0,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // perfectionist
    'perfectionist/sort-exports': [1, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-imports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
        internalPattern: ['@/**'],
      },
    ],
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-explicit-any': 1,
  },
}

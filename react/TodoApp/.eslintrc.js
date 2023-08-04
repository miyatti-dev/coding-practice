module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
        trailingComma: 'es5',
      },
    ],
  },
};

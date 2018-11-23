module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 0,
    'no-useless-escape': 0,
    'no-multiple-empty-lines': [
      2,
      {
        max: 3
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        // insertPragma: true,
        requirePragma: false
      }
    ],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

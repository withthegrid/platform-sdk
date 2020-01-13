// see https://medium.com/@myylow/how-to-keep-the-airbnb-eslint-config-when-moving-to-typescript-1abb26adb5c6

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-loop-func': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'import/extensions': 0,
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        }
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "no-undef": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    'import/extensions': [".js", ".jsx", ".ts", ".tsx"],
    'import/parsers': {
      '@typescript-eslint/parser': [".ts", ".tsx"]
    },
    'import/resolver': {
      'node': {
        'extensions': [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};

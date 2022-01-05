// see https://medium.com/@myylow/how-to-keep-the-airbnb-eslint-config-when-moving-to-typescript-1abb26adb5c6

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  rules: {
    'arrow-parens': ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-loop-func': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': 0,
    'no-implicit-coercion': 'error',
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-undef': 'off',
    'no-dupe-class-members': 'off',
    'lines-between-class-members': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['/commands/**/*.ts', '/release/**/*.ts', '**/*.test.ts', '/test/**/*.ts', '/src/types/**/**.d.ts'] }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  overrides: [{
    files: [
      'src/**/*.{ts,tsx}',
      'test/**/*.{ts,tsx}',
      'commands/**/*.{ts,tsx}',
    ],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-dupe-class-members': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': ['error', { allowArgumentsExplicitlyTypedAsAny: true }],
    },
    parserOptions: {
      project: './tsconfig.json',
    },
  }],
};

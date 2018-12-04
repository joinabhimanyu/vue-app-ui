// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:vue/essential'],
  // required to lint *.vue files
  plugins: ['html', 'vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    'no-nested-ternary': 2,
    'no-empty': 2,
    'no-prototype-builtins': 2,
    'wrap-iife': 2,
    'import/prefer-default-export': 2,
    'import/newline-after-import': 2,
    'import/first': 2,
    'new-cap': 2,
    'one-var': 2,
    'one-var-declaration-per-line': 2,
    'no-debugger': 2,
    'no-param-reassign': 0,
    'no-multi-assign': 2,
    'key-spacing': 2,
    'space-before-blocks': 2,
    'comma-spacing': 2,
    'object-curly-spacing': 2,
    'arrow-spacing': 2,
    'space-infix-ops': 2,
    'no-alert': 2,
    quotes: 2,
    'no-underscore-dangle': 2,
    'arrow-parens': 2,
    'no-unused-vars': 2,
    'linebreak-style': 2,
    semi: 2,
    'object-shorthand': 2,
    'padded-blocks': 2,
    'arrow-body-style': 2,
    'no-restricted-syntax': 2,
    'no-trailing-spaces': 2,
    indent: 0,
    'spaced-comment': 2,
    'no-multiple-empty-lines': 2,
    'max-len': 2,
    'comma-dangle': 2,
    'linebreak-style': ['error', 'windows'],

    'no-console': ['error', {
      allow: ['warn', 'error', 'log']
    }],
    // 'comma-dangle': ['error', { allow: ['warn', 'error'] }],

    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow  during development
    'no-': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
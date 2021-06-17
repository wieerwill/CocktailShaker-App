module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.js?(x)',
        '**/tests/unit/**/*.spec.js?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}

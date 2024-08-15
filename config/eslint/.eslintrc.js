/**
 * Eslint config
 */
const getNsConfig = require('../_utils/getNsConfig')
const prettierrc = require('../prettier/.prettierrc.js')
const nsConfig = getNsConfig()

let eslintConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'prettier', '@typescript-eslint'],
  globals: {
    __webpack_public_path__: true,
    API_SERVER: true,
    API_SERVER_PLACEHOLDER: true,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-cond-assign': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'semi': 'off',
    'eol-last': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    // react
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    // prettier
    'prettier/prettier': ['warn', prettierrc],
    // @typescript-eslint
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

// 用户自定义配置
if (nsConfig.eslint) {
  eslintConfig = nsConfig.eslint(eslintConfig, 'development')
}

module.exports = eslintConfig

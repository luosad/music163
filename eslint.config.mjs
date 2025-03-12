import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config} */
export default {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  globals: globals.browser,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  rules: {
    // 自定义规则
  },
  settings: {
    react: {
      version: 'detect' // 自动检测 React 版本
    }
  }
}

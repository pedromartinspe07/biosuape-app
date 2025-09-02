// @ts-check

const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react': require('eslint-plugin-react'),
      'react-native': require('eslint-plugin-react-native'),
    },
    rules: {
      // Regras de linting personalizadas para o seu projeto
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'react/prop-types': 'off', // Desabilitar a validação de prop-types, já que estamos usando TypeScript
      'react-native/no-unused-styles': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const importPlugin = require('eslint-plugin-import');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['/.expo', 'node_modules'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': ['error', { allow: ['error', 'warn'] }], // Allow only error and warn console statements
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
]);

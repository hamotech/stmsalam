// https://docs.expo.dev/guides/using-eslint/
// Performance-tuned flat config.
// Lint is invoked via `npm run lint` which scopes to `./app ./src`
// (see package.json), so ignores below are only a safety net.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      '.expo-shared/**',
      'dist/**',
      'web-build/**',
      'build/**',
      'coverage/**',
      'android/**',
      'ios/**',
      '**/.cache/**',
      'scripts/**',
      'components/**',
      'hooks/**',
      'constants/**',
      'assets/**',
      '*.config.js',
      '*.config.cjs',
      'expo-env.d.ts',
    ],
  },
  expoConfig,
  {
    // Speed: TypeScript already covers module resolution and named-export
    // checks. Disabling the import-graph-traversal rules avoids the slow
    // `eslint-import-resolver-typescript` crawl on every lint.
    settings: {
      'import/resolver': { node: true },
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/export': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-duplicates': 'off',
      'import/first': 'off',
    },
  },
]);

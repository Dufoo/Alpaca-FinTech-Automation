import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    // Define which files to lint
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off', // We allow console.log for our test tracing
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  },
  {
    // Specifically ignore these folders
    ignores: ['node_modules/', 'playwright-report/', 'test-results/']
  }
);
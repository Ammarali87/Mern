module.exports = {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2020, // Allow the latest ECMAScript features
      sourceType: 'module', // Allow the use of ES modules
    },
    env: {
      node: true, // Enable Node.js global variables like `require` and `process`
      es2020: true, // Enable ES2020 globals
    },
    extends: [
      'eslint:recommended', // Enable recommended ESLint rules
      'plugin:@typescript-eslint/recommended', // Enable recommended TypeScript rules
    ],
    plugins: [
      '@typescript-eslint', // Add TypeScript plugin for linting
    ],
   
  };
  
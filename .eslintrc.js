module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ["temp.js", "config/*"],
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

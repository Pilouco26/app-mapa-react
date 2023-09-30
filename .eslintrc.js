module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // ... other ESLint rules

    // Add the following rule to ignore Prettier-specific errors
    'prettier/prettier': 'off',
  },
};

module.exports = {
  extends: 'airbnb',
  // so we can use latest ES6 features not yet supported by ESLint
  parser: "babel-eslint",
  plugins: [
    'react',
    'jsx-a11y',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  env: {
    browser: true,
  }
};

// cypress/plugins/index.js

// eslint-disable-next-line
/// <reference types="cypress" />

const wp = require('@cypress/webpack-preprocessor');

const webpackOptions = {
  mode: 'development',
  // make sure the source maps work
  devtool: 'eval-source-map',
  // webpack will transpile TS and JS files
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const options = { webpackOptions };
  on('file:preprocessor', wp(options));

  Object.assign(config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  });

  return config;
};


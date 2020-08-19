// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {
  config
} = require('./protractor.conf');

exports.config = {
  ...config,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--headless',
        '--no-sandbox',
        '--allow-insecure-localhost',
        '--window-size=1280,2000',
        '--disable-gpu'
      ],
    },
  },
};

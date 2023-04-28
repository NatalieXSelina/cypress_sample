const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    videoCompression: false,
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1680,
    viewportHeight: 900,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 200000,
    requestTimeout: 10000,
    execTimeout: 10000,
    numTestsKeptInMemory: 10,
    env: { 
        Email: 'seltest@sel.com',
        Password: 'seltest1020#',
        allure: true
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Hirely Cypress Report',
      reportDir: 'cypress/report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents (on, config) {
          require('cypress-mochawesome-reporter/plugin')(on);
          allureWriter(on, config);
          on('before:browser:launch', (browser, launchOptions) => {
            if ((browser.name === 'chrome' || browser.name === 'edge')) {
                launchOptions.args.push('--disable-gpu');
                return launchOptions
            }
          });
          return config;
        },
        baseUrl: 'https://127.0.0.1:30001', /* Do not display website address for privacy reasons */
        specPattern: '**/*.spec.js'
    },
})
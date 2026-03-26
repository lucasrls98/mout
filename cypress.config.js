const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev', // URL do Frontend 
    env: {
      apiUrl: 'https://serverest.dev' // URL da API 
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    video: false, // Otimização de performance
    screenshotOnRunFailure: true
  },
});
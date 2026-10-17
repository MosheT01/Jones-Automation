const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://test.netlify.app/',
    browserName: 'chromium',
  },
});

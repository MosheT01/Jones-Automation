const { defineConfig } = require('@playwright/test');
const jones = require('./config/jones');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: jones.url,
    browserName: 'chromium',
  },
});

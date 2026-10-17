const { defineConfig } = require('@playwright/test');
const jones = require('./config/jones');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: jones.url,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});

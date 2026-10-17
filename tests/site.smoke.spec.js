const { expect, test } = require('@playwright/test');
const jones = require('../config/jones');

test('loads the Jones target landing page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: jones.homePage.heading }),
  ).toBeVisible();
});

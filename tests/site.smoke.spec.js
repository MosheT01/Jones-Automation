const { expect, test } = require('@playwright/test');

test('loads the Jones target landing page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Infuse your business with synergy' }),
  ).toBeVisible();
});

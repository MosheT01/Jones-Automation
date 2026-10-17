const { expect, test } = require('@playwright/test');
const jones = require('../config/jones');
const { fillTextFields, submitAndVerifySuccess } = require('../lib/formRunner');

test('submits the contact form and returns home from the thank-you page', async ({ page }, testInfo) => {
  await page.goto('/');
  await fillTextFields(page, jones.fields, jones.contactData.complete);
  await page.getByLabel(jones.employeeCount.label).selectOption(jones.employeeCount.bonusValue);

  for (const [fieldName, value] of Object.entries(jones.contactData.complete)) {
    await expect(page.getByLabel(jones.fields[fieldName])).toHaveValue(value);
  }
  await expect(page.getByLabel(jones.employeeCount.label)).toHaveValue(jones.employeeCount.bonusValue);

  await page.screenshot({
    path: testInfo.outputPath('form-before-submit.png'),
    fullPage: true,
  });

  await submitAndVerifySuccess(page, jones);

  await page.getByRole('link', { name: jones.homePage.backLinkLabel }).click();
  await expect(page).toHaveURL(jones.url);
  await expect(
    page.getByRole('heading', { name: jones.homePage.heading }),
  ).toBeVisible();
});

test('submits successfully when optional fields are omitted', async ({ page }) => {
  await page.goto('/');
  await fillTextFields(page, jones.fields, jones.contactData.requiredOnly);

  await expect(page.getByLabel(jones.fields.company)).toHaveValue('');
  await expect(page.getByLabel(jones.fields.website)).toHaveValue('');
  await expect(page.getByLabel(jones.employeeCount.label)).toHaveValue(jones.employeeCount.defaultValue);

  await submitAndVerifySuccess(page, jones);
});

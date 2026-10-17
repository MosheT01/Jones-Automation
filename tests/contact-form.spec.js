const { expect, test } = require('@playwright/test');
const jones = require('../config/jones');
const { clickSubmit, fillTextFields, submitAndVerifySuccess } = require('../lib/formRunner');

async function expectNativeValidation(page, field, validityProperty) {
  await expect(page).toHaveURL(jones.url);
  await expect(field).toBeFocused();
  await expect
    .poll(() => field.evaluate((element, property) => element.validity[property], validityProperty))
    .toBe(true);
}

test('submits the contact form and returns home from the thank-you page', async ({ page }, testInfo) => {
  await page.goto('/');
  await fillTextFields(page, jones.fields, jones.contactData.complete);
  await page.getByLabel(jones.employeeCount.label).selectOption(jones.employeeCount.bonusValue);

  for (const [fieldName, value] of Object.entries(jones.contactData.complete)) {
    await expect(page.getByLabel(jones.fields[fieldName])).toHaveValue(value);
  }
  await expect(page.getByLabel(jones.employeeCount.label)).toHaveValue(jones.employeeCount.bonusValue);

  const screenshotPath = testInfo.outputPath('form-before-submit.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach('form-before-submit', {
    path: screenshotPath,
    contentType: 'image/png',
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

test('blocks submission until each required field is filled', async ({ page }) => {
  await page.goto('/');

  for (const [fieldName, value] of Object.entries(jones.contactData.requiredOnly)) {
    const field = page.getByLabel(jones.fields[fieldName]);

    await clickSubmit(page, jones);
    await expectNativeValidation(page, field, 'valueMissing');
    await field.fill(value);
  }
});

test('blocks a malformed email and succeeds after it is corrected', async ({ page }) => {
  await page.goto('/');
  await fillTextFields(page, jones.fields, {
    ...jones.contactData.requiredOnly,
    email: jones.contactData.invalidEmail,
  });

  const emailField = page.getByLabel(jones.fields.email);
  await clickSubmit(page, jones);
  await expectNativeValidation(page, emailField, 'typeMismatch');

  await emailField.fill(jones.contactData.requiredOnly.email);
  await submitAndVerifySuccess(page, jones);
});

test('blocks a malformed optional website and succeeds after it is corrected', async ({ page }) => {
  await page.goto('/');
  await fillTextFields(page, jones.fields, jones.contactData.requiredOnly);

  const websiteField = page.getByLabel(jones.fields.website);
  await websiteField.fill(jones.contactData.invalidWebsite);
  await clickSubmit(page, jones);
  await expectNativeValidation(page, websiteField, 'typeMismatch');

  await websiteField.fill(jones.contactData.complete.website);
  await submitAndVerifySuccess(page, jones);
});

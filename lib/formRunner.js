const { expect } = require('@playwright/test');

async function fillTextFields(page, fieldLabels, values) {
  for (const [fieldName, value] of Object.entries(values)) {
    const label = fieldLabels[fieldName];

    if (!label) {
      throw new Error(`No accessible label is configured for contact field "${fieldName}".`);
    }

    await page.getByLabel(label).fill(value);
  }
}

async function submitAndVerifySuccess(page, site) {
  await page.getByRole('button', { name: site.submitButtonLabel }).click();

  await expect(page).toHaveURL(site.successPage.urlPattern);
  await expect(page).toHaveTitle(site.successPage.title);
  await expect(page.getByRole('heading', { name: site.successPage.heading })).toBeVisible();
  await expect(page.getByRole('heading', { name: site.successPage.message })).toBeVisible();

  console.log('Contact form submission reached the thank-you page.');
}

module.exports = {
  fillTextFields,
  submitAndVerifySuccess,
};

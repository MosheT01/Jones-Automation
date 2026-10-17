const { expect, test } = require('@playwright/test');

const requiredContact = {
  name: 'Alex Automation',
  email: 'alex@example.com',
  phone: '+1 555 010 0200',
};

const optionalContact = {
  company: 'Example QA Ltd',
  website: 'https://example.com',
};

async function fillRequiredContactFields(page) {
  await page.getByLabel('NAME *').fill(requiredContact.name);
  await page.getByLabel('EMAIL *').fill(requiredContact.email);
  await page.getByLabel('PHONE *').fill(requiredContact.phone);
}

async function submitAndVerifySuccess(page) {
  await page.getByRole('button', { name: 'Request a call back' }).click();

  await expect(page).toHaveURL(/\/thank-you\.html/);
  await expect(page).toHaveTitle('Thank You');
  await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();
  await expect(page.getByRole('heading', { name: "You'll hear from us soon." })).toBeVisible();

  console.log('Contact form submission reached the thank-you page.');
}

test('submits the contact form and returns home from the thank-you page', async ({ page }, testInfo) => {
  await page.goto('/');
  await fillRequiredContactFields(page);
  await page.getByLabel('COMPANY').fill(optionalContact.company);
  await page.getByLabel('WEBSITE').fill(optionalContact.website);
  await page.getByLabel('Number of Employees').selectOption('51-500');

  await expect(page.getByLabel('NAME *')).toHaveValue(requiredContact.name);
  await expect(page.getByLabel('EMAIL *')).toHaveValue(requiredContact.email);
  await expect(page.getByLabel('PHONE *')).toHaveValue(requiredContact.phone);
  await expect(page.getByLabel('COMPANY')).toHaveValue(optionalContact.company);
  await expect(page.getByLabel('WEBSITE')).toHaveValue(optionalContact.website);
  await expect(page.getByLabel('Number of Employees')).toHaveValue('51-500');

  await page.screenshot({
    path: testInfo.outputPath('form-before-submit.png'),
    fullPage: true,
  });

  await submitAndVerifySuccess(page);

  await page.getByRole('link', { name: 'Back to Home »' }).click();
  await expect(page).toHaveURL('https://test.netlify.app/');
  await expect(
    page.getByRole('heading', { name: 'Infuse your business with synergy' }),
  ).toBeVisible();
});

test('submits successfully when optional fields are omitted', async ({ page }) => {
  await page.goto('/');
  await fillRequiredContactFields(page);

  await expect(page.getByLabel('COMPANY')).toHaveValue('');
  await expect(page.getByLabel('WEBSITE')).toHaveValue('');
  await expect(page.getByLabel('Number of Employees')).toHaveValue('1-10');

  await submitAndVerifySuccess(page);
});

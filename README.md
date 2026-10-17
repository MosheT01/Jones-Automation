# Jones Playwright Automation

A small Playwright project for the Jones Software engineering challenge. It verifies that the target landing page loads and automates the contact form through its thank-you page and back-home link.

## Requirements

- Node.js 18 or newer
- npm

## Setup

```sh
npm ci
npx playwright install chromium
```

## Run the tests

```sh
npm test
```

Run with a visible browser window:

```sh
npm run test:headed
```

The contact form tests cover the complete flow with fictional data, including the bonus `51-500` employee selection, and a successful submission with the optional Company and Website fields left blank. The complete-flow test saves a full-page screenshot before submission under that test's Playwright output folder in `test-results/`.

The tests target <https://test.netlify.app/>. The form submits using a GET request, so the fictional values appear in the resulting URL query string.

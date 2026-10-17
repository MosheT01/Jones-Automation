# Jones Playwright Automation

A small Playwright project for the Jones Software engineering challenge. The tests target <https://test.netlify.app/>. Jones-specific website details live in `config/jones.js`, while `lib/formRunner.js` contains the form operations shared by the contact form scenarios.

## Project structure

- `config/jones.js` - target URL, accessible labels, fictional test data, and expected page details.
- `lib/formRunner.js` - configured text-field filling and form submission with success verification.
- `tests/` - smoke and contact form scenarios, including optional-field coverage.

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

The complete contact form test selects the bonus `51-500` employee value and saves a full-page screenshot before submitting under that test's Playwright output folder in `test-results/`. The optional-field test leaves Company and Website blank and keeps the employee selector at its default. The tests verify the thank-you page; the complete-flow test also follows the back-home link.

The form submits using a GET request, so the fictional values appear in the resulting URL query string.

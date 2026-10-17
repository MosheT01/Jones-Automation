# Jones Playwright Automation

A small Playwright project for the Jones Software engineering challenge. The tests target <https://test.netlify.app/>. Jones-specific website details live in `config/jones.js`, while `lib/formRunner.js` contains the form operations shared by the contact form scenarios.

## Project structure

- `config/jones.js` - target URL, accessible labels, fictional test data, and expected page details.
- `lib/formRunner.js` - configured text-field filling and form submission with success verification.
- `tests/` - landing page, valid submission, optional-field, and native-validation scenarios.

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

## Continuous integration

GitHub Actions runs the Playwright suite on pushes to `main`, pull requests targeting `main`, and daily at 06:00 UTC. You can also start a run from the Actions tab with **Run workflow**. Each run uploads the HTML report for 14 days; failed runs also upload screenshots and traces for 14 days.

The complete contact form test selects the bonus `51-500` employee value and saves a full-page screenshot before submitting. That screenshot is attached to the HTML report. The suite also checks that missing required fields, malformed email addresses, and malformed website URLs block submission, and that correcting invalid values allows submission.

Playwright writes its HTML report to `playwright-report/` and failure screenshots and traces to `test-results/`. Open the report with:

```sh
npx playwright show-report
```

Both output folders are ignored by Git and are refreshed by subsequent test runs. The form submits using a GET request, so the fictional values appear in the resulting URL query string.

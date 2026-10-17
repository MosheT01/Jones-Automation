# Jones Playwright Automation

A small Playwright project for the Jones Software engineering challenge. The current checkpoint is a browser smoke test that verifies the target landing page loads and displays its main heading.

## Requirements

- Node.js 18 or newer
- npm

## Setup

```sh
npm ci
npx playwright install chromium
```

## Run the smoke test

```sh
npm test
```

Run with a visible browser window:

```sh
npm run test:headed
```

The test targets <https://test.netlify.app/>. It currently verifies only the landing page heading; form entry, screenshot capture, submission, and success-state verification are not implemented yet.

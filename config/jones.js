module.exports = {
  url: 'https://test.netlify.app/',
  fields: {
    name: 'NAME *',
    email: 'EMAIL *',
    phone: 'PHONE *',
    company: 'COMPANY',
    website: 'WEBSITE',
  },
  contactData: {
    complete: {
      name: 'Alex Automation',
      email: 'alex@example.com',
      phone: '+1 555 010 0200',
      company: 'Example QA Ltd',
      website: 'https://example.com',
    },
    requiredOnly: {
      name: 'Alex Automation',
      email: 'alex@example.com',
      phone: '+1 555 010 0200',
    },
  },
  employeeCount: {
    label: 'Number of Employees',
    defaultValue: '1-10',
    bonusValue: '51-500',
  },
  submitButtonLabel: 'Request a call back',
  successPage: {
    urlPattern: /\/thank-you\.html/,
    title: 'Thank You',
    heading: 'Thank You!',
    message: "You'll hear from us soon.",
  },
  homePage: {
    backLinkLabel: 'Back to Home »',
    heading: 'Infuse your business with synergy',
  },
};

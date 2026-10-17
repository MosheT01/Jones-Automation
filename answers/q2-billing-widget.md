# Billing Form Mockup Review

## Executive summary

The mockup combines payment details, cardholder information, and a billing address in one crowded form. The highest-risk issue is unclear pricing: it displays `30.00` without saying what currency it is, what the customer is buying, or whether the charge repeats. A customer should understand the complete charge before confirming payment.

This review is based on the static mockup on page 2 of the Jones Automation exercise. It identifies design risks, not confirmed implementation defects. The image cannot prove how payment data is transmitted or stored, how validation behaves, whether the controls are accessible, or how the flow performs.

## Findings

| Priority | Area | Finding and impact | Recommendation |
| --- | --- | --- | --- |
| High | Price transparency | The form shows `30.00` but no currency, product or plan, billing interval, tax treatment, or renewal terms. Customers cannot tell what they are agreeing to pay or when they will be charged again. | Show the product or plan, currency, amount due now, applicable taxes, billing interval, and next renewal date and amount before payment confirmation. |
| High | International addresses | There is no country selector, while the form asks for a state or province. Postal code instructions say “no dashes,” which may not fit local formats. | Ask for country, adapt region fields to the country, and accept and validate postal formats appropriate to that country. Do not assume postal codes contain only digits. |
| Medium | Card type | The customer must select Visa separately from entering the card number. A valid number could be paired with the wrong selection and fail. | Detect and display the card network from the number prefix as the customer types. The first four digits are not a universal detection rule; require enough prefix digits for the supported network. Validate the full number separately. |
| Medium | Card number entry | The instruction “No dashes or spaces” makes entry less forgiving and may hinder pasting or autofill. | Accept pasted values with common separators, normalize them, and format the display as the customer types. Support a numeric mobile keyboard without rejecting useful paste input. Do not assume all card numbers have the same length or grouping. |
| Medium | Expiration date | Month and year are both dropdowns, but the mockup does not show how the year list stays current. Free text could also admit invalid or expired dates. | Use a clearly formatted `MM/YY` entry or selectors with a dynamically maintained set of valid years. Whichever control is chosen, validate month range and that the card is not expired. |
| Medium | Cardholder name | `MI` is unexplained, and the form assumes a first, middle, and last name structure. | Remove the middle-initial field or label it “Middle initial (optional).” Consider one “Name on card” field to avoid imposing a naming format. |
| Medium | Billing address | The second address line is unlabeled, and the form does not explain when it should be used. | Label it “Address line 2 (optional)” or reveal it with an “Add apartment, suite, or unit” control. Keep it optional. |
| Medium | Layout and actions | Payment amount and expiration are separated from the card number, while cardholder and address fields follow without clear section boundaries. “Continue” and “Cancel” do not explain what happens next. | Group the flow into Payment, Cardholder, Billing address, and Order summary sections. Name the primary action for its outcome, and explain whether cancel goes back or abandons checkout. |
| Verify in implementation | Security | The screenshot cannot establish secure transport, tokenization, data retention, or logging behavior. No card security code field is visible; whether one is needed depends on the payment processor and transaction flow. | Review the real processor integration. Keep card data out of URLs, logs, and analytics; use processor-hosted fields or tokenization, and never retain a card security code after authorization. |
| Verify in implementation | Accessibility and performance | A screenshot cannot prove programmatic labels, required-field semantics, keyboard order, error announcements, contrast, loading time, or payment response time. | Test the implemented flow with keyboard and assistive technology, verify accessible validation, and measure page and payment-response performance in the sandbox. |

## Sample test cases

### 1. Make the charge clear before confirmation

**Given** a customer is checking out with a selected plan  
**When** the customer reaches the payment form and review step  
**Then** the order summary shows the plan, currency, amount due now, taxes, billing interval, trial terms if any, and next renewal date and amount. The customer can go back to change the selection. No payment is submitted before an explicit confirmation of the displayed charge, and the server calculates the authoritative amount.

### 2. Accept and validate card details safely

**Given** a customer enters card details in the payment sandbox  
**When** the customer types or pastes a number with spaces or dashes, enters an unsupported or malformed number, or uses an invalid or expired date  
**Then** the UI formats supported numbers, detects and displays the network when enough digits are available, and gives accessible field-specific errors for invalid details. Invalid details do not submit payment. A valid sandbox card can be submitted once, and retries or repeated clicks do not create duplicate charges. Card data does not appear in URLs, logs, or analytics.

### 3. Support international addresses and keyboard use

**Given** a customer selects a country with a different address format, such as the United Kingdom or Canada  
**When** the customer enters a valid local address and postal code  
**Then** the form shows applicable region fields, accepts the country’s postal format, and preserves values through validation. Address line 2 remains optional. Every field and error is keyboard-accessible, programmatically labeled, and announced to assistive technology.

## Product solution for the highest-priority issue

Add a clear order summary before the customer commits: product or plan, currency, amount due today, taxes, billing interval, trial terms, and the next renewal date and amount. Use a final action such as **Pay $30.00 USD** only when those details are accurate for the selected plan. Let the customer edit details before confirming. Calculate the final amount on the server and use a payment processor’s tokenized card fields. This gives the customer informed consent and prevents the interface from relying on a client-supplied price.

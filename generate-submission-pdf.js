import { chromium } from "playwright";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const currentDir = dirname(fileURLToPath(import.meta.url));

function imageToDataUri(path) {
  const base64 = readFileSync(path).toString("base64");
  return `data:image/png;base64,${base64}`;
}

const mockupImageUrl = imageToDataUri(
  "/Users/yoelibarthel/.cursor/projects/Users-yoelibarthel-javascript-leetcode/assets/Capture_d_e_cran_2026-06-28_a__20.21.44-e3f7e465-bfdc-4a04-966d-21e50da5c021.png",
);

const automationScreenshotUrl = imageToDataUri(
  join(currentDir, "screenshots", "jones-form-before-submit.png"),
);

const outputPath = join(currentDir, "Jones-Automation-Exercise-Yoeli-Barthel.pdf");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Jones Automation Exercise - Yoeli Barthel</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
      line-height: 1.55;
      margin: 0;
      padding: 36px;
      background: #ffffff;
      font-size: 13px;
    }

    h1 {
      font-size: 30px;
      margin: 0 0 8px;
      color: #111827;
    }

    h2 {
      font-size: 21px;
      margin: 30px 0 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #e5e7eb;
      color: #111827;
    }

    h3 {
      font-size: 16px;
      margin: 20px 0 8px;
      color: #1f2937;
    }

    .meta {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 14px 16px;
      margin: 18px 0 22px;
      background: #f9fafb;
    }

    .meta p {
      margin: 4px 0;
    }

    .todo-link {
      color: #b45309;
      font-weight: 700;
    }

    .note {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 10px 12px;
      margin: 14px 0;
      border-radius: 6px;
    }

    code {
      background: #f3f4f6;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: Menlo, Consolas, monospace;
      font-size: 12px;
    }

    pre {
      background: #111827;
      color: #f9fafb;
      padding: 12px;
      border-radius: 8px;
      overflow-wrap: break-word;
      white-space: pre-wrap;
      font-size: 12px;
    }

    ul {
      margin-top: 6px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0 18px;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #d1d5db;
      padding: 8px;
      vertical-align: top;
    }

    th {
      background: #f3f4f6;
      text-align: left;
    }

    img {
      max-width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      margin: 10px 0 18px;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <h1>Jones Automation Exercise</h1>
  <p>Playwright automation and QA analysis submission.</p>

  <div class="meta">
    <p><strong>Candidate:</strong> Yoeli Barthel</p>
    <p><strong>GitHub repository:</strong> <span class="todo-link">TODO: add GitHub repository link here</span></p>
    <p><strong>Automation target:</strong> https://test.netlify.app/</p>
    <p><strong>Main automation file:</strong> <code>automation.js</code></p>
    <p><strong>QA answers file:</strong> <code>qa-responses.md</code></p>
  </div>

  <h2>1. Assignment Summary</h2>
  <p>The exercise has two parts:</p>
  <ul>
    <li>Create a Playwright automation file for the site <code>https://test.netlify.app/</code>.</li>
    <li>Answer QA questions about a billing widget UI mock-up.</li>
  </ul>

  <h3>Automation requirements</h3>
  <ul>
    <li>Type values in the <code>Name</code>, <code>Email</code>, <code>Phone</code>, <code>Company</code>, and <code>Website</code> fields.</li>
    <li>Create a screenshot before clicking the <code>Request a call back</code> button.</li>
    <li>Bonus: change <code>Number of Employees</code> from <code>1-10</code> to <code>51-500</code>.</li>
    <li>Click the <code>Request a call back</code> button.</li>
    <li>Write to <code>console.log</code> when reaching the thank-you page.</li>
  </ul>

  <h3>QA questions</h3>
  <ol type="a">
    <li>Test this UI mock-up. Can you find any problems with this screen? Please pay attention to functional aspects such as security, usability, performance, etc.</li>
    <li>Can you write 2-3 sample test cases for this functionality?</li>
    <li>Can you suggest a product solution for the most severe bug found?</li>
  </ol>

  <h2>2. Setup and Run Instructions</h2>
  <p>From the <code>jones-automation</code> folder:</p>
  <pre>npm install
npx playwright install chromium
npm start</pre>

  <p>Expected console output:</p>
  <pre>Reached thank you page</pre>

  <p>The automation creates the screenshot here:</p>
  <pre>screenshots/jones-form-before-submit.png</pre>

  <h2>3. Automation Screenshot</h2>
  <p>This screenshot is taken before clicking the <code>Request a call back</code> button.</p>
  <img src="${automationScreenshotUrl}" alt="Jones form before submit" />

  <div class="page-break"></div>

  <h2>4. Billing Widget Mock-up</h2>
  <p>This is the mock-up used for the QA analysis.</p>
  <img src="${mockupImageUrl}" alt="Billing widget mock-up" />

  <h2>5. QA Answers</h2>

  <h3>a. Problems found in the billing UI mock-up</h3>
  <p>Overall, the billing widget is understandable, but I found several issues that could affect security, usability, and payment clarity.</p>
  <p>From a <strong>security</strong> point of view, the screen asks the user to enter sensitive credit card information, but it does not show any clear reassurance such as "Secure payment", encryption notice, or trusted payment provider branding. This can make users less confident when entering payment details. In addition, there is no CVV/CVC field, which may reduce card verification quality depending on the payment flow.</p>
  <p>From a <strong>functional</strong> point of view, the payment amount is shown only as <code>30.00</code>, without any currency. The user cannot know if this is USD, EUR, or another currency. The screen also does not explain what the user is paying for, whether this is a one-time payment or a recurring charge, and whether taxes are included. Another issue is that the user must manually select the card type. This can create inconsistent data, for example if the user selects VISA but enters a MasterCard number. A better approach would be to detect the card type automatically from the card number.</p>
  <p>The form is also quite strict in places where it could be more user-friendly. For example, the card number field says "No dashes or spaces". In practice, many users copy or type card numbers with spaces, so the system should accept spaces or dashes and normalize the value internally. The same applies to the postal code field, which says "no dashes" and may not support valid postal code formats in some countries.</p>
  <p>From a <strong>usability</strong> point of view, required fields are marked with <code>*</code>, but the explanation is only shown at the bottom of the form. There are also no visible examples of inline validation or error messages, so it is not clear how the user would recover from mistakes. The <code>Continue</code> button is also a bit ambiguous for a billing screen. It does not clearly say whether the user is moving to a review step or submitting payment information.</p>
  <p>The layout of the name fields is also not very clear. The <code>MI</code> field is placed between <code>First Name</code> and <code>Last Name</code>, but <code>MI</code> (<code>Middle Initial</code>) as an abbreviation may not be obvious to all users. A clearer label such as <code>Middle Initial (optional)</code> would be easier to understand. The form could also use a simpler structure, such as <code>First Name</code>, <code>Middle Initial</code>, and <code>Last Name</code>, or a single <code>Full Name</code> field if a middle initial is not really required.</p>
  <p>The expiration date is split into two separate fields: <code>Month</code> and <code>Year</code>. In many payment forms, this is usually presented as one combined field, such as <code>MM/YY</code>, which is shorter and easier for users to understand and complete.</p>
  <p>The placement of the <code>Continue</code> and <code>Cancel</code> buttons may also be confusing. In many interfaces, the secondary action (<code>Cancel</code>) is placed on the left and the primary action (<code>Continue</code>) on the right, especially when the user is moving forward in a flow. Here, <code>Continue</code> appears before <code>Cancel</code>, which can feel inconsistent depending on the product's design conventions.</p>
  <p>For <strong>international users</strong>, the address section may be problematic because there is no country field, while <code>State or Province</code> is required. This makes the form feel more suitable for a specific region than for a global SaaS company.</p>
  <p>The second address input under <code>Credit Card Billing Street Address</code> also has no label. Users may not understand if it is meant for apartment, suite, building, or an optional address line 2.</p>
  <p>There is also a small inconsistency between the label <code>State or Province</code> and the dropdown placeholder <code>Select a state</code>. If the form is intended for international users, the wording should be consistent.</p>

  <h3>b. Sample test cases</h3>

  <table>
    <tr><th>Field</th><th>Details</th></tr>
    <tr><td><strong>Test Case ID</strong></td><td>TC-01</td></tr>
    <tr><td><strong>Title</strong></td><td>Valid card details submit successfully</td></tr>
    <tr><td><strong>Priority</strong></td><td>High</td></tr>
    <tr><td><strong>Type</strong></td><td>Positive / Functional</td></tr>
    <tr><td><strong>Preconditions</strong></td><td>User is on the billing widget screen.</td></tr>
    <tr><td><strong>Test Data</strong></td><td>Card type: VISA, valid card number, future expiration date, valid billing address.</td></tr>
    <tr><td><strong>Steps</strong></td><td>1. Select VISA as card type.<br>2. Enter a valid Visa card number.<br>3. Select a valid future expiration month and year.<br>4. Enter first name, last name, billing street address, city, state, and postal code.<br>5. Click Continue.</td></tr>
    <tr><td><strong>Expected Result</strong></td><td>The form accepts the data and moves the user to the next step or confirmation page. The payment amount and billing details are preserved correctly, and the user is not charged more than once.</td></tr>
  </table>

  <table>
    <tr><th>Field</th><th>Details</th></tr>
    <tr><td><strong>Test Case ID</strong></td><td>TC-02</td></tr>
    <tr><td><strong>Title</strong></td><td>Expired card is rejected</td></tr>
    <tr><td><strong>Priority</strong></td><td>High</td></tr>
    <tr><td><strong>Type</strong></td><td>Negative / Validation</td></tr>
    <tr><td><strong>Preconditions</strong></td><td>User is on the billing widget screen.</td></tr>
    <tr><td><strong>Test Data</strong></td><td>Valid card number, expiration date in the past, valid billing address.</td></tr>
    <tr><td><strong>Steps</strong></td><td>1. Enter a valid card number.<br>2. Select an expiration month and year in the past.<br>3. Fill all other required fields with valid data.<br>4. Click Continue.</td></tr>
    <tr><td><strong>Expected Result</strong></td><td>The form does not continue. An inline error message is displayed near the expiration fields, clearly explaining that the card is expired. No payment is submitted.</td></tr>
  </table>

  <table>
    <tr><th>Field</th><th>Details</th></tr>
    <tr><td><strong>Test Case ID</strong></td><td>TC-03</td></tr>
    <tr><td><strong>Title</strong></td><td>Payment amount is clear before continuing</td></tr>
    <tr><td><strong>Priority</strong></td><td>High</td></tr>
    <tr><td><strong>Type</strong></td><td>Usability / Functional</td></tr>
    <tr><td><strong>Preconditions</strong></td><td>User is on the billing widget screen.</td></tr>
    <tr><td><strong>Test Data</strong></td><td>Payment amount displayed as 30.00.</td></tr>
    <tr><td><strong>Steps</strong></td><td>1. Review the payment amount area.<br>2. Check whether the currency is displayed.<br>3. Check whether the screen explains what the user is paying for.<br>4. Check whether it is clear if the payment is one-time or recurring.</td></tr>
    <tr><td><strong>Expected Result</strong></td><td>The user can clearly understand the amount, currency, payment purpose, and whether the charge is one-time or recurring before clicking Continue.</td></tr>
  </table>

  <h3>c. Product solution for the most severe bug</h3>
  <p><strong>Most severe bug:</strong> The payment amount is not clear enough.</p>
  <p>In my opinion, the most severe visible issue is that the payment amount is displayed only as <code>30.00</code>, without currency or explanation. On a billing screen, users should clearly understand what they are about to pay before continuing.</p>
  <p>This can create confusion because the user does not know if the amount is in USD, EUR, or another currency. It is also not clear what the amount is for, whether it is a one-time payment or a recurring charge, and whether taxes are included.</p>
  <p>The product solution would be to make the payment summary clearer. For example, the screen could show <code>Payment Amount: $30.00 USD</code>, followed by a short description such as <code>Monthly subscription</code> or <code>One-time setup fee</code>. If taxes or additional fees may apply, this should also be shown before the user continues.</p>
  <p>I would also suggest changing the button text if needed. If the next step is only a review step, <code>Continue to Review</code> would be clearer. If the action submits payment details, the button should be more explicit.</p>
  <p>This solution makes the billing screen more transparent and helps users feel more confident before entering payment information.</p>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: {
    top: "14mm",
    right: "12mm",
    bottom: "14mm",
    left: "12mm",
  },
});
await browser.close();

console.log(`PDF generated: ${outputPath}`);

# Jones Automation Exercise — QA Responses

## a. Problems found in the billing UI mock-up

Overall, the billing widget is understandable, but I found several issues that could affect security, usability, and payment clarity.

From a **security** point of view, the screen asks the user to enter sensitive credit card information, but it does not show any clear reassurance such as "Secure payment", encryption notice, or trusted payment provider branding. This can make users less confident when entering payment details. In addition, there is no CVV/CVC field, which may reduce card verification quality depending on the payment flow.

From a **functional** point of view, the payment amount is shown only as `30.00`, without any currency. The user cannot know if this is USD, EUR, or another currency. The screen also does not explain what the user is paying for, whether this is a one-time payment or a recurring charge, and whether taxes are included. Another issue is that the user must manually select the card type. This can create inconsistent data, for example if the user selects VISA but enters a MasterCard number. A better approach would be to detect the card type automatically from the card number.

The form is also quite strict in places where it could be more user-friendly. For example, the card number field says "No dashes or spaces". In practice, many users copy or type card numbers with spaces, so the system should accept spaces or dashes and normalize the value internally. The same applies to the postal code field, which says "no dashes" and may not support valid postal code formats in some countries.

From a **usability** point of view, required fields are marked with `*`, but the explanation is only shown at the bottom of the form. There are also no visible examples of inline validation or error messages, so it is not clear how the user would recover from mistakes. The `Continue` button is also a bit ambiguous for a billing screen. It does not clearly say whether the user is moving to a review step or submitting payment information.

The layout of the name fields is also not very clear. The `MI` field is placed between `First Name` and `Last Name`, but `MI` (`Middle Initial`) as an abbreviation may not be obvious to all users. A clearer label such as `Middle Initial (optional)` would be easier to understand. The form could also use a simpler structure, such as `First Name`, `Middle Initial`, and `Last Name`, or a single `Full Name` field if a middle initial is not really required.

The expiration date is split into two separate fields: `Month` and `Year`. In many payment forms, this is usually presented as one combined field, such as `MM/YY`, which is shorter and easier for users to understand and complete.

The placement of the `Continue` and `Cancel` buttons may also be confusing. In many interfaces, the secondary action (`Cancel`) is placed on the left and the primary action (`Continue`) on the right, especially when the user is moving forward in a flow. Here, `Continue` appears before `Cancel`, which can feel inconsistent depending on the product's design conventions.

For **international users**, the address section may be problematic because there is no country field, while `State or Province` is required. This makes the form feel more suitable for a specific region than for a global SaaS company.

The second address input under `Credit Card Billing Street Address` also has no label. Users may not understand if it is meant for apartment, suite, building, or an optional address line 2.

There is also a small inconsistency between the label `State or Province` and the dropdown placeholder `Select a state`. If the form is intended for international users, the wording should be consistent.

## b. Sample test cases

### Test Case 1

| Field | Details |
|---|---|
| **Test Case ID** | TC-01 |
| **Title** | Valid card details submit successfully |
| **Priority** | High |
| **Type** | Positive / Functional |
| **Preconditions** | User is on the billing widget screen. |
| **Test Data** | Card type: VISA, valid card number, future expiration date, valid billing address. |
| **Steps** | 1. Select `VISA` as card type.<br>2. Enter a valid Visa card number.<br>3. Select a valid future expiration month and year.<br>4. Enter first name, last name, billing street address, city, state, and postal code.<br>5. Click `Continue`. |
| **Expected Result** | The form accepts the data and moves the user to the next step or confirmation page. The payment amount and billing details are preserved correctly, and the user is not charged more than once. |

### Test Case 2

| Field | Details |
|---|---|
| **Test Case ID** | TC-02 |
| **Title** | Expired card is rejected |
| **Priority** | High |
| **Type** | Negative / Validation |
| **Preconditions** | User is on the billing widget screen. |
| **Test Data** | Valid card number, expiration date in the past, valid billing address. |
| **Steps** | 1. Enter a valid card number.<br>2. Select an expiration month and year in the past.<br>3. Fill all other required fields with valid data.<br>4. Click `Continue`. |
| **Expected Result** | The form does not continue. An inline error message is displayed near the expiration fields, clearly explaining that the card is expired. No payment is submitted. |

### Test Case 3

| Field | Details |
|---|---|
| **Test Case ID** | TC-03 |
| **Title** | Payment amount is clear before continuing |
| **Priority** | High |
| **Type** | Usability / Functional |
| **Preconditions** | User is on the billing widget screen. |
| **Test Data** | Payment amount displayed as `30.00`. |
| **Steps** | 1. Review the payment amount area.<br>2. Check whether the currency is displayed.<br>3. Check whether the screen explains what the user is paying for.<br>4. Check whether it is clear if the payment is one-time or recurring. |
| **Expected Result** | The user can clearly understand the amount, currency, payment purpose, and whether the charge is one-time or recurring before clicking `Continue`. |

## c. Product solution for the most severe bug

**Most severe bug:** The payment amount is not clear enough.

In my opinion, the most severe visible issue is that the payment amount is displayed only as `30.00`, without currency or explanation. On a billing screen, users should clearly understand what they are about to pay before continuing.

This can create confusion because the user does not know if the amount is in USD, EUR, or another currency. It is also not clear what the amount is for, whether it is a one-time payment or a recurring charge, and whether taxes are included.

The product solution would be to make the payment summary clearer. For example, the screen could show `Payment Amount: $30.00 USD`, followed by a short description such as `Monthly subscription` or `One-time setup fee`. If taxes or additional fees may apply, this should also be shown before the user continues.

I would also suggest changing the button text if needed. If the next step is only a review step, `Continue to Review` would be clearer. If the action submits payment details, the button should be more explicit.

This solution makes the billing screen more transparent and helps users feel more confident before entering payment information.

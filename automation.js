/**
 * Jones Automation Exercise
 *
 * Run:
 *   npm run jones
 *   node automation.js
 *
 * Screenshot output:
 *   screenshots/jones-form-before-submit.png
 */

// Import Chromium from Playwright (browser engine similar to Chrome).
import { chromium } from "playwright";
// Node.js helpers to create folders and build file paths.
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Build an absolute path to screenshots/.
const automationDir = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(automationDir, "screenshots");
const screenshotPath = join(screenshotDir, "jones-form-before-submit.png");

// Create the screenshots folder if it does not exist yet.
await mkdir(screenshotDir, { recursive: true });

// Open a visible Chromium window (headless: false = you can see the browser).
const browser = await chromium.launch({ headless: false });

// Open a new tab. Most actions are done on "page".
const page = await browser.newPage();

// Go to the Jones test site and wait until the page is loaded.
await page.goto("https://test.netlify.app/");

// Step 1: fill the form fields (assignment requirement).
await page.getByLabel("Name").fill("John Smith");
await page.getByLabel("Email").fill("john.smith@example.com");
await page.getByLabel("Phone").fill("5550102030");
await page.getByLabel("Company").fill("Acme Corporation");
await page.getByLabel("Website").fill("https://www.acme-corporation.com");

// Bonus: change Number of Employees from 1-10 to 51-500 (dropdown <select>).
await page.getByLabel("Number of Employees").selectOption("51-500");

// Step 2: screenshot BEFORE clicking submit (assignment requirement).
await page.screenshot({ path: screenshotPath, fullPage: true });

// Step 3: click the submit button.
await page.getByRole("button", { name: "Request a call back" }).click();

// Step 4: wait until the thank-you page is loaded (URL contains "thank").
await page.waitForURL(/thank/i);

// Step 5: log a message when the thank-you page is reached (assignment requirement).
console.log("Reached thank you page");

// Close the browser cleanly.
await browser.close();

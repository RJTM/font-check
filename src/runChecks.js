import { chromium } from "playwright";

// Run this script using node to use Playwright to run the checks
(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();
  await page.goto("http://localhost:5173");

  const result = await page.evaluate(async () => {
    return window.runChecks();
  });

  console.log(result);

  await browser.close();
})();

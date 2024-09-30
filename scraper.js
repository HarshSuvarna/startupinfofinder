import playwright from "playwright";
import { scrapeDomain, takeScreenShot } from "./helpers.js";

(async () => {
  // creating a chromium browser
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  // await page.setViewportSize({ width: 800, height: 600 });

  const output = await scrapeDomain(page);
  await browser.close(); // closing the browser after all pages have been scraped
  console.log("output :>> ", output);
})().catch((error) => {
  console.log("error :>> ", error);
});

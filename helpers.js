import { getCompanyInfo } from "./openAI.js";

export async function scrapeDomain(page) {
  const domains = [
    "https://tonestro.com/about",
    "https://www.prewave.com/",
    "https://www.twinn.health/",
    "https://www.sendtrumpet.com/about?ref=website",
    "https://kokoon.io/pages/about-kokoon",
  ];
  let output = [];
  for (const domain of domains) {
    try {
      await page.goto(domain); // visit website
      // takeScreenShot(page, "page_1");

      // get important text from all p tags
      const paragraphs = await page.$$eval("p", (elements) =>
        elements.map((el) => el.innerText)
      );
      // get important text from all span tags
      const spans = await page.$$eval("span", (elements) =>
        elements.map((el) => el.innerText)
      );

      // get important text from all h4 tags
      const h4 = await page.$$eval("h4", (elements) =>
        elements.map((el) => el.innerText)
      );
      // const div = await page.$$eval("div", (elements) =>
      //   elements.map((el) => el.innerText)
      // );

      //creating a string of all the texts
      const scrapedText = paragraphs.join(" ") + spans.join(" ") + h4.join(" ");
      console.log(`data scraped successfully from ${domain}`);

      //sending text string to openAI.
      const res = await getCompanyInfo(scrapedText); // returns a string
      output.push(JSON.parse(res.replace(/\n/g, " "))); //converting output string to valid dictionary
    } catch (error) {
      // takeScreenShot(page, "Error");
      console.log(`error in scraping ${domain} :>>`, error);
    }
  }
  return output;
}

export async function takeScreenShot(page, log) {
  console.log(log ? log + "ss" : "Taking ss");
  await page.screenshot({ path: "page.png", fullPage: false });
}

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.vanlansh.wang');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
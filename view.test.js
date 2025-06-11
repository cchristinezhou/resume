const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(); // `{ headless: false }` for visual
  const page = await browser.newPage();

  await page.goto('http://localhost:5500/about.html'); // TODO: Replace with your actual URL or file path served with Live Server

  // === Dark Mode Test ===
  await page.click('#dark-mode-toggle');
  const isDarkMode = await page.evaluate(() => {
    return document.body.classList.contains('dark-mode');
  });

  console.log('✅ Dark mode toggled:', isDarkMode);

  // === High Contrast Mode Test ===
  await page.click('#high-contrast-toggle');
  const isHighContrast = await page.evaluate(() => {
    return document.body.classList.contains('high-contrast');
  });

  console.log('✅ High contrast toggled:', isHighContrast);

  await browser.close();
})();
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // === 1. Test Homepage Toggles ===
    await page.goto('https://cs5610-webdev-seattle-summer25.github.io/resume-cchristinezhou/index.html');

    // Wait for dark mode slider
    await page.waitForSelector('.slider.round');
    await page.click('.slider.round');

    const isDarkMode = await page.evaluate(() =>
        document.body.classList.contains('dark-mode')
    );
    console.log('✅ Dark mode toggled:', isDarkMode);

    // Wait for high contrast button
    await page.waitForSelector('#high-contrast-toggle');
    await page.click('#high-contrast-toggle');

    const isHighContrast = await page.evaluate(() =>
        document.body.classList.contains('high-contrast')
    );
    console.log('✅ High contrast toggled:', isHighContrast);

    // === 2. Test Contact Form Toast ===
    const contactPage = await browser.newPage();
    await contactPage.goto('https://cs5610-webdev-seattle-summer25.github.io/resume-cchristinezhou/contact.html');

    await contactPage.waitForSelector('form.contact-form');

    // Fill form fields
    await contactPage.type('input[name="first-name"]', 'Test');
    await contactPage.type('input[name="last-name"]', 'User');
    await contactPage.type('input[name="email"]', 'test@example.com');
    await contactPage.type('textarea[name="message"]', 'This is a test message.');

    // Submit the form
    await contactPage.click('button[type="submit"]');

    // Wait for toast to appear
    await contactPage.waitForSelector('#toast.show', { timeout: 5000 });

    const toastAppeared = await contactPage.evaluate(() => {
        const toast = document.getElementById('toast');
        return toast && toast.classList.contains('show');
    });

    console.log('✅ Toast appeared after form submission:', toastAppeared);

    await browser.close();
})();
require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('Wikipedia login', async ({ page }) => {
  await page.goto('https://www.wikipedia.org');

  await page.click('a#js-link-box-en');
  await page.click('text=Log in');

  console.log("Username:", process.env.WIKI_USERNAME);

  await page.fill('input[name="wpName"]', process.env.WIKI_USERNAME);
  await page.fill('input[name="wpPassword"]', process.env.WIKI_PASSWORD);

  await page.click('button[name="wploginattempt"]');

});

test('Wikipedia UI tests', async ({ page }) => {
  // 1. Navigate to Wikipedia's homepage
  await page.goto('https://www.wikipedia.org/');
  await page.click('#js-link-box-en'); // English 

  // 2. Assert there are less than 7,000,000 articles in English
  const articleCountText = await page.locator('#articlecount a').nth(1).textContent();
  const articleCount = parseInt(articleCountText.replace(/[^0-9]/g, ''), 10);
  expect(articleCount).toBeLessThan(7000000);

  // 3. Assert the page's text gets smaller when the 'Small' text size option is selected
  await page.locator('[class="cdx-label cdx-radio__label"]').nth(0).click();
  //await page.locator('button[title="Small"]').click();
  const smallSize = await page.locator('body').evaluate(el => getComputedStyle(el).fontSize);

  // 4. Assert the page's text gets larger when the 'Large' text size option is selected
  await page.locator('[class="cdx-label cdx-radio__label"]').nth(2).click();
  const largeSize = await page.locator('body').evaluate(el => getComputedStyle(el).fontSize);
  //expect(parseFloat(largeSize)).toBeGreaterThan(parseFloat(smallSize));

  // 5. Assert the page's text goes back to default size when the 'Standard' text size option is selected
  await page.locator('[class="cdx-label cdx-radio__label"]').nth(1).click();
  const standardSize = await page.locator('body').evaluate(el => getComputedStyle(el).fontSize);
  //expect(parseFloat(standardSize)).toBeGreaterThan(parseFloat(smallSize));
  //expect(parseFloat(standardSize)).toBeLessThan(parseFloat(largeSize));
});
test('Verify latest Wikipedia edit by Worstbull', async ({ page }) => {
  // Step 1: Navigate to English Wikipedia
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // Step 2: Search and go to "Artificial intelligence" page
  await page.locator('input[name="search"]').first().fill('Artificial intelligence');
  //await page.locator('input[name="go"]').click();
  await page.getByText('Search').nth(1).click();

  await expect(page).toHaveURL(/Artificial_intelligence/);

  // Step 3: Click on the "View history" tab
  await page.click('#ca-history a');
  await expect(page).toHaveURL(/action=history/);


    const latestEditor = await page.textContent('.mw-userlink');
  expect(latestEditor?.toLowerCase()).toContain('maxeto0910');

  // Step 4: Get the username of the most recent edit
  //const latestUser = await page.locator('.mw-changeslist li .mw-userlink').first().textContent();

  // Step 5: Assert it was "Worstbull"
  //expect(latestEditor?.trim()).toBe('Maxeto0910');
  //expect(latestEditor?.toLowerCase()).toBe('Maxeto0910');
//const latestEditor = await page.locator('.mw-changeslist li .mw-userlink').first().textContent();
expect(latestEditor?.trim().toLowerCase()).toBe('maxeto0910'.toLowerCase());

});

 
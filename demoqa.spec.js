import { test, expect } from '@playwright/test';

test('Login page load test', async ({ page }) => {
  await page.goto('https://demoqa.com/login');

  // Wait for the login button to appear
  await expect(page.locator('#login')).toBeVisible();
  await page.getByPlaceholder('UserName').fill('vinutha')
    await page.waitForTimeout(60000)
    await page.getByPlaceholder('Password').fill('Vinu@123')
    await page.waitForTimeout(50000)
    await page.click('[id="login"]')
    await page.waitForTimeout(60000)
    await page.goto('ht ps://demoqa.com/profile')
    await expect(page.locator('[id="userName-value"]')).toHaveText('vinutha')
    // Check that the button is visible
await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
await page.getByRole('button', { name: 'Go To Book Store' }).click()
await page.getByPlaceholder('Type to search').fill('Learning JavaScript Design Patterns');
await expect(page.locator('a', { hasText: 'Learning JavaScript Design Patterns' })).toBeVisible()
await page.locator('a', { hasText: 'Learning JavaScript Design Patterns' }).click();

const row = page.locator('.rt-tr', { hasText: 'Learning JavaScript Design Patterns' });

/*const title = await row.locator('a').innerText();
const author = await row.locator('.rt-td').nth(2).innerText();
const publisher = await row.locator('.rt-td').nth(3).innerText();

const bookDetails = `
Title: ${title}
Author: ${author}
Publisher: ${publisher}
`;

fs.writeFileSync('book-details.txt', bookDetails.trim());
console.log('✅ Book details saved.');*/

const title = await bookStorePage.firstBookRow.locator('.rt-td').nth(0).textContent();
const author = await bookStorePage.firstBookRow.locator('.rt-td').nth(1).textContent();
const publisher = await bookStorePage.firstBookRow.locator('.rt-td').nth(2).textContent();


await page.getByRole('button', { name: 'Log out' }).click();


}, { timeout: 100000  });  // Safe in case it takes longer

const { test, expect } = require('@playwright/test');

test('Automate full signup form', async ({ page }) => {
  await page.goto('https://freelance-learn-automation.vercel.app/signup');

  // Fill text fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await page.fill('input[name="password"]', 'SuperSecret123');


// Interests - multi-select checkboxes
//await page.check('input[type="checkbox"][value="csharp"]');
await page.check('input[type="checkbox"][value="java"]');
await page.check('input[type="checkbox"][value="test"]');


  await page.locator('input[type="radio"][value="Male"]').check();
    await page.selectOption('select[name="state"]', { label: 'Tamil Nadu' });

  // You could also use:
  // await page.selectOption('select[name="state"]', { value: 'MH' }); // by value
  // await page.selectOption('select[name="state"]', { index: 2 });     // by index

  // Multi-select hobbies
  await page.selectOption('select[name="hobbies"]', [
    { label: 'Music' },
    { label: 'Gaming' },
  ]);

  // Submit the form
  await page.getByRole('button', { name: 'Sign up' }).click();



});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Task Management App - Accessibility', () => {
  const clientUrl = 'http://localhost:5173'; // Assuming Vite dev server runs on 5173

  test.beforeEach(async ({ page }) => {
    await page.goto(clientUrl);
    // Wait for a key element to be visible, indicating the app has loaded
    // Adjust the selector as necessary for your app
    await page.waitForSelector('h1:has-text("Task Management")');
  });

  test('should not have any automatically detectable accessibility issues on the main page', async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable accessibility issues after adding a task', async ({
    page,
  }) => {
    // Add a task
    await page
      .getByPlaceholder('Enter new task title...')
      .fill('New Test Task');
    await page.getByText('Add Task').click();
    await page.waitForSelector('text=New Test Task'); // Wait for the task to appear

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable accessibility issues after removing a task', async ({
    page,
  }) => {
    // Add a task first to ensure there is something to remove
    await page
      .getByPlaceholder('Enter new task title...')
      .fill('Task To Remove');
    await page.getByText('Add Task').click();
    await page.waitForSelector('text=Task To Remove');

    // Remove the task
    // Note: The selector for the remove button might be very specific if it's not accessible
    // This assumes the remove button is a div sibling to the span containing the task title
    await page
      .locator('div:has-text("Task To Remove") >> div:has-text("Remove")')
      .click();
    await page.waitForSelector('text=No tasks yet. Add one!'); // Or whatever indicates an empty list

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // You can add more tests here for other interactions or pages
});

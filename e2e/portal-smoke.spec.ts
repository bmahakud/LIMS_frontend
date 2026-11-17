import { test, expect } from '@playwright/test';

test('laboratory login page renders without a backend session', async ({ page }) => {
  await page.goto('/concepts/industrial/login');
  await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Sign in to Portal/i })).toBeVisible();
  await expect(page.locator('input[type=email]')).toBeVisible();
  await expect(page.locator('input[type=password]')).toBeVisible();
});

test('unauthenticated users cannot open the private LIMS dashboard', async ({ page }) => {
  await page.goto('/lims/dashboard');
  await expect(page).toHaveURL(/\/concepts\/industrial\/login/);
  await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
});

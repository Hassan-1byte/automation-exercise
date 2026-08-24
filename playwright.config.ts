import { defineConfig, devices } from '@playwright/test';


import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalTimeout: 60 * 1000,
  timeout: 30 * 1000,
  use: {
    actionTimeout: 10 * 1000,
    baseURL: process.env.URL,
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'chromium',
      use:
      {
        ...devices['Desktop Chrome'],
        storageState: 'test-data/authentication.json',
      },
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },


  ],


});

import { defineConfig, devices } from '@playwright/test';
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";


export default defineConfig({

  //------------------ GLOBAL SECTION ---------------------//

  timeout: 90000,
  //globalTimeout: 600000,
  expect: {
    timeout: 10000
  },
  retries: 1,
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: "argos_3e6e650d57a54f0d185266d76c3f33fc6b",
      }),
    ],
    ['allure-playwright', { outputFolder: 'allure-results' }]
    //['html']
  ],

  // RUN TIME SETTINGS IN USE SECTION.
  use: {
    baseURL: 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  //------------------ PROJECTS SECTION ---------------------//
  // Command to run => npx playwright test auth.spec.ts --project=dev


  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://automationexercise-dev.com',
      },
    },

    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://automationexercise-staging.com'
      },

    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: "firefox"
      },
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 12 Pro Max']
      },
    },
    

  ],

  // USE WHEN THE PROJECT NEEDS TO BE START ON YOUR LOCAL DEVICE FOR TESTING. NOT FOR LIVE PROJECTS.
  // webServer:{
  //   command: 'npm run start',
  //   url: 'https://localhost:4200'
  // }

});









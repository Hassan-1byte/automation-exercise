import { defineConfig, devices } from '@playwright/test';

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
    ['list'],
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









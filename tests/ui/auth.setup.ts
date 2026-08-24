import { test } from "../../fixtures/testfixtures";

test('Login Page TestCases', async ({ page, loginPage }) => {

    await loginPage.gotoLoginPage()

    await loginPage.FillForm(process.env.EMAIL!, process.env.PASSWORD!)

    // Save Storage
    await page.context().storageState({path:'test-data/authentication.json'})

})
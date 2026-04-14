import { test, Page } from "@playwright/test";
import { PageManager } from "../../core/PageManager";
import { argosScreenshot } from "@argos-ci/playwright";


test.beforeEach(async ({ page }) => {
    await page.goto("/login")

    const pm = new PageManager(page)
    const authPage = await pm.goToAuthPage()
    await authPage.loginWithValidCred("Hassan1@test.com", "pakistan123")

})

test('Checkout the Products', async ({ page }) => {
    const pm = new PageManager(page)
    const homePage = await pm.goToCheckOutPage();
    await homePage.CheckoutProducts()
    await argosScreenshot(page, "Checkout page")


})
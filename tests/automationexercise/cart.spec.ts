import { test, Page } from "@playwright/test";
import { PageManager } from "../../core/PageManager";
import { argosScreenshot } from "@argos-ci/playwright";


test.beforeEach(async ({ page }) => {
    await page.goto("/login")
    const pm = new PageManager(page)
    const authPage = await pm.goToAuthPage()
    await authPage.loginWithValidCred("Hassan1@test.com", "pakistan123")

})

test.describe('Cart Testcases', () => {

    test('Add product to cart', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.AddProductToCart('Rose Pink Embroidered Maxi Dress');
        await argosScreenshot(page, "Cart page")
    })

    test('Add multiple products', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.AddMultipleProducts('Sleeveless Dress', 'Colour Blocked Shirt – Sky Blue', 'Rose Pink Embroidered Maxi Dress');
        await argosScreenshot(page, "Cart page")

    })

    test('Update quantity', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.UpdateQuantity()
        await argosScreenshot(page, "Cart page")

    })

    test('Remove product', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.RemoveProduct()
        await argosScreenshot(page, "Cart page")

    })

})
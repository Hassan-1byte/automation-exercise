import { test, Page } from "@playwright/test";
import { PageManager } from "../../core/PageManager";

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
    })

    test('Add multiple products', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.AddMultipleProducts('Sleeveless Dress', 'Colour Blocked Shirt – Sky Blue', 'Rose Pink Embroidered Maxi Dress');
    })

    test('Update quantity', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.UpdateQuantity()
    })

    test('Remove product', async ({ page }) => {
        const pm = new PageManager(page);
        const homePage = await pm.goToCartPage()
        await homePage.RemoveProduct()
    })

})
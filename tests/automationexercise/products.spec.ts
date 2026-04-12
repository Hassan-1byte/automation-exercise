import { test } from "@playwright/test";
import { PageManager } from "../../core/PageManager";

test.beforeEach(async ({ page }) => {
    await page.goto("/")
})

// Product Page (Listing Page) - A list/grid of multiple products.
// Product Detail Page (PDP) - This is a single product page.


test.describe('Product browsing & discovery behavior.', () => {

    test('View all products page', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        await homePage.ViewAllProducts()
    })

    test('Open product detail page - PDP', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        await homePage.OpenProductDetailPage()
    })

    test('Search product', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        const ViewAllProducts = await homePage.ViewAllProducts()
        const searchProduct = await homePage.searchProduct()
    })

    test('Verify product info (price, name, etc.)', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        await homePage.VerifyProductInfo()
    })

    test('Category filtering', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        await homePage.CategoryFiltering()
    })

    test('Brand filtering', async ({ page }) => {
        const pm = new PageManager(page)
        const homePage = await pm.goToProductPage()
        await homePage.BrandFiltering()
    })


})
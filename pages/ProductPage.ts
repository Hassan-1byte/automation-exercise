import { Page, expect } from "@playwright/test";

export class ProductPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async ViewAllProducts() {
        await this.page.getByRole('link', { name: ' Products' }).click();
        await expect(this.page.getByText('All Products', { exact: true })).toBeVisible();
    }

    async OpenProductDetailPage() {
        const home = await this.page.getByRole("link", { name: "Home" }).click()
        await this.page.getByRole("link", { name: "View Product" }).first().click()
    }

    async searchProduct() {
        const searchBox = await this.page.getByPlaceholder('Search Product').fill('Frozen Tops For Kids')
        await this.page.locator("#submit_search").click()
        // Assertion
        expect(this.page.locator('.productinfo', { hasText: "Frozen Tops For Kids" }))
    }

    async VerifyProductInfo() {

        // Verify from the HomePage
        expect(this.page.locator('.productinfo', { hasText: "Beautiful Peacock Blue Cotton Linen Saree" }))
        expect(this.page.locator('.productinfo', { hasText: "Rs. 5000" }))

        //----- Verify from the Products Page and Search

        // Click Products
        const ProductsPage = await this.page.getByRole('link', { name: "Products" }).click()

        // Fill Item name and search.
        const searchBox = await this.page.getByPlaceholder('Search Product').fill('Beautiful Peacock Blue Cotton Linen Saree')
        await this.page.locator("#submit_search").click()

        // Assertion for check relevant search result.
        expect(this.page.locator('.productinfo', { hasText: "Beautiful Peacock Blue Cotton Linen Saree" }))

        // Click View Product
        await this.page.getByRole('link', { name: "View Product" }).click()

        // Verify Name And Price 
        expect(this.page.locator('.productinfo', { hasText: "Beautiful Peacock Blue Cotton Linen Saree" }))
        expect(this.page.locator('.productinfo', { hasText: "Rs. 5000" }))

    }

    async CategoryFiltering() {
        // 1. Updated to match the actual text casing on the site
        const expectedCategories = ['Women', 'Men', 'Kids'];

        const accordion = this.page.locator('#accordian');
        const categoryTitles = accordion.locator('.panel-title a');

        // 2. Verify the count matches
        await expect(categoryTitles).toHaveCount(expectedCategories.length);

        // 3. Loop through and verify
        for (let i = 0; i < expectedCategories.length; i++) {
            await expect(categoryTitles.nth(i)).toContainText(expectedCategories[i], { ignoreCase: true });
        }
    }

    async BrandFiltering() {

        const expectedBrands = [
            '(6)Polo',
            '(5)H&M',
            '(5)Madame',
            '(3)Mast & Harbour',
            '(4)Babyhug',
            '(3)Allen Solly Junior',
            '(3)Kookie Kids',
            '(5)Biba'
        ]

        const brandsContainer = this.page.locator('.brands-name')
        const brandsLinks = brandsContainer.locator('ul li a')

        // Verify the count matches our array length (8 brands)
        await expect(brandsLinks).toHaveCount(expectedBrands.length)

        // Loop
        for (let i = 0; i < expectedBrands.length; i++) {
            await expect(brandsLinks.nth(i)).toHaveText(expectedBrands[i])
        }

    }

}

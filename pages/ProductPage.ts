import { Page } from "@playwright/test";

export class ProductPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goToProductPage() {
        await this.page.goto('/products')
    }


    async viewProduct() {
        await this.page.getByRole('link', { name: 'View Product' }).first().click()
    }



}
import { expect, Page } from "@playwright/test";

export class CheckoutPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    async CheckoutProducts() {

        // 2- Go to the Cart Page
        await this.page.getByRole('link', { name: "Cart" }).click()

        // 3- Click the "Proceed to Checkout" button.
        await this.page.locator('#do_action .check_out').click();

        // 4- Add comment for the order
        const container = this.page.locator('#ordermsg')
        await container.locator('.form-control').fill('If you would like to add a comment about your order, please write it in the field below.')

        // 5- Click on the button "Place Order"
        await this.page.getByRole('link', { name: "Place Order" }).click()

        // 6- On the Payment Page, Enter Card Name, Card Number, CVC, Expiration and Year.
        await this.page.locator('[data-qa="name-on-card"]').fill('Hassan Qayyum')
        await this.page.locator('[data-qa="card-number"]').fill('1234567890')
        await this.page.locator('[data-qa="cvc"]').fill('311')
        await this.page.locator('[data-qa="expiry-month"]').fill('12')
        await this.page.locator('[data-qa="expiry-year"]').fill('2029')

        // 7- Click on the button "Pay and Confirm Order"
        await this.page.locator('[data-qa="pay-button"]').click()

        // 8- Verify success text prompt.
        expect(this.page.locator('[data-qa="order-placed"]')).toBeVisible()
        expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible()

        // 11 - Verify "Continue" button.
        await this.page.locator('[data-qa="continue-button"]').click()

    }













}
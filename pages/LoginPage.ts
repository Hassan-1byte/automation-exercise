import { Page, expect } from "@playwright/test";

export class LoginPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async gotoLoginPage() {
        await this.page.goto('/login')
    }

    
    async FillForm(email: string, password: string){

        const emailField = this.page.locator('input[data-qa="login-email"]')
        const passwordField = this.page.locator('[data-qa="login-password"]')
        const loginButton = this.page.locator('[data-qa="login-button"]')

        
        await emailField.fill(email)

        await passwordField.fill(password)

        await loginButton.click()

        await expect(this.page).toHaveURL('/')

        await expect(this.page).toHaveTitle('Automation Exercise')

    }

}
import { expect, Page } from "@playwright/test";

export class AuthPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    // New User Signup Page!
    async New_User_Signup() {
        expect(this.page.getByText('New User Signup!'))

        const nameField = await this.page.locator('[data-qa="signup-name"]').fill('Hassan')
        const EmailAddressField = await this.page.locator('[data-qa="signup-email"]').fill('Hassan7@test.com')
        const SignUpButton = await this.page.locator('[data-qa="signup-button"]').click()

        // Assert to verify Enter Account Information Page
        expect(this.page.getByText('Enter Account Information'))
    }

    // Signup Page! - Enter Account Information Page! -------->>>>
    async fillAccountInformation(details: any) {

        await expect(this.page.getByText('Enter Account Information')).toBeVisible()

        // 1. Select Title (Radio Button)
        if (details.title === 'Mr') {
            await this.page.locator('#id_gender1').check()
        } else {
            await this.page.locator('#id_gender2').check()
        }

        // 2. Personal Details
        await this.page.locator('[data-qa="password"]').fill(details.password)


        // 3. Date of Birth (Dropdowns)
        await this.page.locator('[data-qa="days"]').selectOption(details.day)
        await this.page.locator('[data-qa="months"]').selectOption(details.month)
        await this.page.locator('[data-qa="years"]').selectOption(details.year)

        // 4. Checkboxes
        await this.page.locator('#newsletter').check()
        await this.page.locator('#optin').check()

    }

    async fillAddressInformation(address: any) {

        await this.page.locator('[data-qa="first_name"]').fill(address.firstName)
        await this.page.locator('[data-qa="last_name"]').fill(address.lastName)
        await this.page.locator('[data-qa="company"]').fill(address.company)
        await this.page.locator('[data-qa="address"]').fill(address.street)
        await this.page.locator('[data-qa="country"]').selectOption(address.country)
        await this.page.locator('[data-qa="state"]').fill(address.state)
        await this.page.locator('[data-qa="city"]').fill(address.city)
        await this.page.locator('[data-qa="zipcode"]').fill(address.zip)
        await this.page.locator('[data-qa="mobile_number"]').fill(address.mobile)

        // 5. Submit the form

        await this.page.locator('[data-qa="create-account"]').click()

        // Verify account creation success
        await expect(this.page.getByText('Account Created!')).toBeVisible();

        // Click Continue Button
        await this.page.locator('[data-qa="continue-button"]').click()

        // Verify HomePage
        await expect(this.page.locator('#slider-carousel')).toBeVisible();

        // Delete the Account
        await this.page.getByRole("link", { name: "Delete Account" }).click()

        // Verify Delete action is performed
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
        await this.page.locator('[data-qa="continue-button"]').click()

    }

    // Login Page! - Login the user with valid credentials -------->>>>
    async loginWithValidCred(email: string, password: string) {
        expect(this.page.getByText('Login to your account'))

        await this.page.locator('[data-qa="login-email"]').fill(email)

        await this.page.locator('[data-qa="login-password"]').fill(password)

        await this.page.locator('[data-qa="login-button"]').click()

        await this.page.screenshot({ path: 'screenshorts/authPageSS.png' }) // SCREENSHORT STEP

        // await expect(this.page.locator('.fa-user')).toBeVisible(); 
    }

    // Login Page! - Login the user with Invalid credentials -------->>>>
    async loginWithInValidCred(email: string, password: string) {
        expect(this.page.getByText('Login to your account'))

        await this.page.locator('[data-qa="login-email"]').fill(email)

        await this.page.locator('[data-qa="login-password"]').fill(password)

        await this.page.locator('[data-qa="login-button"]').click()

        await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
    }

    // Logout User -------------->>>>>
    async logout(email: string, password: string) {
        expect(this.page.getByText('Login to your account'))

        await this.page.locator('[data-qa="login-email"]').fill(email)

        await this.page.locator('[data-qa="login-password"]').fill(password)

        await this.page.locator('[data-qa="login-button"]').click()

        await expect(this.page.locator('.fa-user')).toBeVisible();

        await this.page.getByRole('link', { name: " Logout" }).click()

        expect(this.page.getByText('Login to your account'))

    }

    // Register with existing email! -------------->>>>>
    async registerWithExistingEmail() {
        expect(this.page.getByText('New User Signup!'))

        const nameField = await this.page.locator('[data-qa="signup-name"]').fill('Hassan Exisiting')
        const EmailAddressField = await this.page.locator('[data-qa="signup-email"]').fill('Hassan1@test.com')
        const SignUpButton = await this.page.locator('[data-qa="signup-button"]').click()

        // Assert to verify Email Address already exist!
        expect(this.page.getByText('Email Address already exist!'))
    }

}
import { test } from "@playwright/test"
import { PageManager } from "../../core/PageManager"
import { faker } from "@faker-js/faker"
import { argosScreenshot } from "@argos-ci/playwright";



test.beforeEach(async ({ page }) => {
    await page.goto("/login")
})

test.describe("All authentication & account entry flows.", () => {

    test("Register new user", async ({ page }) => {

        // ---> Faker Test Data start here
        const randomFirstName = faker.person.firstName()
        // const randomLastName = faker.person.lastName()
        const randomCompany = faker.company.name()
        // const randomStreet = faker.person.jobArea()
        // const randomCountry = faker.location.country()
        // const randomState = faker.location.state()
        // const randomCity = faker.location.city()
        // const randomZip = faker.location.zipCode()
        // const randomMobile = faker.phone.number()
        // ---> Faker Test Data End here

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Sign-Up new user Method
        await authPage.New_User_Signup();

        // Auth Page - fill Account Information Method
        await authPage.fillAccountInformation({
            title: 'Mr',
            password: "pakistan123",
            day: "3",
            month: "12",
            year: "1995",
        });

        // Auth Page - fill Address Information Method
        await authPage.fillAddressInformation({
            firstName: randomFirstName,
            lastName: "Qayyum",
            company: randomCompany,
            street: "123 Playwright St",
            country: "United States",
            state: "California",
            city: "Los Angeles",
            zip: "90210",
            mobile: "1234567890"
        })



    })

    test('Login with invalid credentials', async ({ page }) => {

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Login with Invalid Cred Method
        await authPage.loginWithValidCred("HassanX@test.com", "Xakistan123")


    })

    test('Logout', async ({ page }) => {

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Login Method
        await authPage.logout("Hassan1@test.com", "pakistan123")


    })

    test("Register with existing email", async ({ page }) => {

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Sign-Up new user Method
        await authPage.registerWithExistingEmail()


    })

    test('Login with valid credentials', async ({ page }) => {

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Login Method
        await authPage.loginWithValidCred("Hassan1@test.com", "pakistan123")
        await argosScreenshot(page, "auth page")


    })





})
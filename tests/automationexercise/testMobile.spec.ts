import { test } from "@playwright/test"
import { PageManager } from "../../core/PageManager"

test.beforeEach(async ({ page }) => {
    await page.goto("/login")
})


test('Login with valid credentials', async ({ page }) => {

        const pm = new PageManager(page);
        const authPage = await pm.goToAuthPage();

        // Auth Page - Login Method
        await authPage.loginWithValidCred("Hassan1@test.com", "pakistan123")

    })
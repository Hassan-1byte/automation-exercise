import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

type pageObject = {

    loginPage: LoginPage
    productPage: ProductPage

}

export const test = base.extend<pageObject>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        use(loginPage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page)
        use(productPage);
    }
})
import { expect } from "@playwright/test";
import { test } from "../../fixtures/testfixtures";

test('Product Page TestCases', async ({ page, productPage }) => {

    await productPage.goToProductPage()
    expect(page).toHaveURL('/products')

    await productPage.viewProduct()


})
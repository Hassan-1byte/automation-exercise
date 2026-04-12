import { expect, Page } from "@playwright/test";

export class CartPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    async AddProductToCart(productName: string) {
        // 1. Wait for the page to be ready
        await expect(this.page.locator('#slider-carousel')).toBeVisible();

        // 2. Locate the product on the HOME page
        const productHome = this.page.locator('.product-image-wrapper', { hasText: productName }).first();

        await productHome.waitFor({ state: 'visible' });
        await productHome.scrollIntoViewIfNeeded();
        await productHome.hover();

        // 3. Click the add button
        await productHome.locator('.add-to-cart').first().click();

        // 4. Verify the "Added!" Modal
        const modal = this.page.locator('#cartModal');
        await expect(modal).toBeVisible();
        await expect(modal.locator('.modal-title')).toHaveText('Added!');

        // 5. Navigate to the Cart page
        await modal.getByRole('link', { name: 'View Cart' }).click();

        // 6. THE FIX: Verify the product is in the CART TABLE
        const cartTable = this.page.locator('#cart_info_table');
        await expect(cartTable).toBeVisible();
        await expect(cartTable).toContainText(productName);
    }

    async AddMultipleProducts(productOne: string, productTwo: string, productThird: string) {

        // 1. Wait for the page to be ready
        await expect(this.page.locator('#slider-carousel')).toBeVisible();

        // 2. Locate the First product on the HOME page
        const firstProduct = this.page.locator('.product-image-wrapper', { hasText: productOne })
        await firstProduct.waitFor({ state: 'visible' });
        await firstProduct.scrollIntoViewIfNeeded()
        await firstProduct.hover()

        // 3. Click the add button
        await firstProduct.locator('.add-to-cart').first().click();

        // 4. Verify the "Added!" Modal
        const modal = this.page.locator('#cartModal');
        await expect(modal).toBeVisible();
        await expect(modal.locator('.modal-title')).toHaveText('Added!');
        await modal.getByRole('button', { name: 'Continue Shopping' }).click()

        // 5. Locate the Second product on the HOME page
        const secondProduct = this.page.locator('.product-image-wrapper', { hasText: productTwo })
        await secondProduct.waitFor({ state: 'visible' });
        await secondProduct.scrollIntoViewIfNeeded()
        await secondProduct.hover()

        // 6. Click the add button
        await secondProduct.locator('.add-to-cart').first().click();

        // 7. Verify the "Added!" Modal
        const modal2 = this.page.locator('#cartModal');
        await expect(modal2).toBeVisible();
        await expect(modal2.locator('.modal-title')).toHaveText('Added!');
        await modal.getByRole('button', { name: 'Continue Shopping' }).click()


        // 8. Locate the Third product on the HOME page
        const thirdProduct = this.page.locator('.product-image-wrapper', { hasText: productThird })
        await thirdProduct.waitFor({ state: 'visible' });
        await thirdProduct.scrollIntoViewIfNeeded()
        await thirdProduct.hover()

        // 9. Click the add button
        await thirdProduct.locator('.add-to-cart').first().click();

        // 10. Verify the "Added!" Modal
        const modal3 = this.page.locator('#cartModal');
        await expect(modal3).toBeVisible();
        await expect(modal3.locator('.modal-title')).toHaveText('Added!');

        // 11. Navigate to the Cart page
        await modal.getByRole('link', { name: 'View Cart' }).click();

        // 6. Verify the products is in the CART TABLE
        const cartTable = this.page.locator('#cart_info_table');
        await expect(cartTable).toBeVisible();
        await expect(cartTable).toContainText(productOne);
        await expect(cartTable).toContainText(productTwo);
        await expect(cartTable).toContainText(productThird);

    }

    async UpdateQuantity() {

        // 1. Wait for the page to be ready
        await expect(this.page.locator('#slider-carousel')).toBeVisible();
        await this.page.getByRole('link', { name: "Cart" }).click()

        // 2. Quantity of first Product should be 2.
        const firstRowQuantity = this.page.locator('tbody tr').first().locator('.cart_quantity')
        expect(firstRowQuantity).toHaveText('2')

        // 3. Go back to the HomePage
        await this.page.locator('.breadcrumb').getByRole('link', { name: "Home" }).click()

        // 4. Click add to Cart first Product.
        const productHome = this.page.locator('.product-image-wrapper', { hasText: 'Rose Pink Embroidered Maxi Dress' }).first();

        await productHome.waitFor({ state: 'visible' });
        await productHome.scrollIntoViewIfNeeded();
        await productHome.hover();

        await productHome.locator('.add-to-cart').first().click();


        // 5. Verify product Added Modal:
        const modal = this.page.locator('#cartModal');
        await expect(modal.locator('.modal-title')).toHaveText('Added!');

        // 5. Navigate to the Cart Page
        await modal.getByRole('link', { name: 'View Cart' }).click();

        // 6. Verify quantity of the first product increased.
        expect(firstRowQuantity).toHaveText('3')

    }

    async RemoveProduct() {

        // 1. Wait for the page to be ready
        await expect(this.page.locator('#slider-carousel')).toBeVisible();
        await this.page.getByRole('link', { name: "Cart" }).click()

        // 2. Delete the first Row
        const DeleteFirstRow = this.page.locator('tbody tr').first().locator('.cart_delete')
        await DeleteFirstRow.click()

        // 3. Go back to the HomePage & Cart Page.
        //await this.page.locator('.breadcrumb').getByRole('link', { name: "Home" }).click()
        //await this.page.getByRole('link', { name: "Cart" }).click()

        // 4. Delete the Row
        //const DeleteSecondRow = this.page.locator('tbody tr').first().locator('.cart_delete')
        //await DeleteSecondRow.click()

        // 5. Go back to the HomePage & Cart Page.
        //await this.page.locator('.breadcrumb').getByRole('link', { name: "Home" }).click()
        //await this.page.getByRole('link', { name: "Cart" }).click()

        // 6. Delete the Row
        //const DeleteThirdRow = this.page.locator('tbody tr').first().locator('.cart_delete')
        //await DeleteThirdRow.click()



    }







}
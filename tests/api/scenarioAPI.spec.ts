import { expect, test } from '@playwright/test';

test('Query Parameters & Response Data Filtering', async ({ request }) => {

    const response = await request.get('https://automationexercise.com/api/productsList')

    expect(response.status()).toBe(200);

    const responseBody = await response.json()

    expect(responseBody.responseCode).toBe(200)

    const poloProduct = responseBody.products.filter(
        (product: { brand: string }) => product.brand === 'Polo'
    )

    const ExpensiveItems = poloProduct.products.filter(
        (price: { brand: string }) => price.brand === '1000'
    )

    console.log(ExpensiveItems)
})  
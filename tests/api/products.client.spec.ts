import { test, expect } from "@playwright/test"

test('API 1: Get All Products List', async ({ request }) => {

    const response = await request.get('https://automationexercise.com/api/productsList')

    expect(response.status()).toBe(200);

    const responseBody = await response.json()

    console.log(responseBody)

});

test('API 5: POST To Search Product', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        form: {
            search_product: 'tshirt'
        }
    })


    expect(response.status()).toBe(200);

    const responseBody = await response.json()

    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBe(true)

    const art = responseBody.products
    console.log(art)

})

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {

    const response = await request.post('https://automationexercise.com/api/searchProduct')

    expect(response.status()).toBe(200)

    const responsebody = await response.json()

    expect(responsebody.responseCode).toBe(400)

    expect(responsebody.message).toBe('Bad request, search_product parameter is missing in POST request.')

})

test('MOCK API', async ({ page }) => {

    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: 'Playwright by the testers talk', id: 12 },
            { name: 'Hassan by the testers talk', id: 13 },
            { name: 'Cypress by the testers talk', id: 14 },
        ];
        await route.fulfill({ json })
    });

    // Goto the Site
    await page.goto('https://demo.playwright.dev/api-mocking');

    // assertion
    await expect(page.getByTitle('Playwright by the testers talk')).toBeVisible()
    await expect(page.getByTitle('Hassan by the testers talk')).toBeVisible()
    await expect(page.getByTitle('Cypress by the testers talk')).toBeVisible()






})



test.describe('Test Suit for API TESTING', () => {

    test('Create User Account', async ({ request }) => {
        const response = await request.post('/api/createAccount', {
            form: {
                name: 'Ibrahim',
                email: 'ibrahimKing3@test.com',
                password: 'helloooo',
                birth_date: '22',
                birth_month: 'october',
                birth_year: '2025',
                firstname: "Ibrahim",
                lastname: 'Hassan',
                company: 'fastex7',
                address1: 'Main Lahore',
                address2: 'Out lahore',
                country: 'Pakistan',
                zipcode: '0987',
                state: "England",
                city: "Neywork",
                mobile_number: '57757553086'
            }
        })



        expect(response.status()).toBe(200)

        const responseBody = await response.json()

        expect(responseBody.responseCode).toBe(201)

        console.log(responseBody.message)
    })

    test('Verify Login with Created Credentials', async ({ request }) => {

        const response = await request.post('/api/verifyLogin', {
            form: {
                email: 'ibrahimKing1@test.com',
                password: 'helloooo',
            }
        })
        expect(response.status()).toBe(200)

        const responseBody = await response.json()

        expect(responseBody.responseCode).toBe(200)

        console.log(responseBody.message)

    })

    test('Delete User Account', async ({ request }) => {

        const response = await request.delete('/api/deleteAccount', {
            form: {
                email: 'ibrahimKing@test.com',
                password: 'helloooo',
            }
        })
        expect(response.status()).toBe(200)

        const responseBody = await response.json()

        expect(responseBody.responseCode).toBe(200)

        console.log(responseBody.message)

    })

})




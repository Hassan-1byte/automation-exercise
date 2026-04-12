import { test, expect } from "@playwright/test"

test('API 1: Get All Products List', async ({ request }) => {

    // 1. SEND THE REQUEST
    const response = await request.get('https://automationexercise.com/api/productsList')

    // 2. THE RUTHLESS CHECK (Status Code)
    expect(response.status()).toBe(200)

    // 3. PEEK INSIDE THE BOX 
    const body = JSON.parse(await response.text())

    // Automation Exercise is unique; they put a 'responseCode' inside the body
    expect(body.products[0].name).toBeDefined()

    console.log("Mastery Check: Product 1 is " + body.products[0].name)

})

test('API 2: POST To All Products List', async ({ request }) => {

    const response = await request.post('https://automationexercise.com/api/productsList', {
        data: {
            title: 'Book Title',
            author: 'John Doe',
        }
    })

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text())

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.')

})

test('API 3: Get All Brands List', async ({ request }) => {
    // Request and URL
    const response = await request.get('https://automationexercise.com/api/brandsList')
    // Verify Status Code
    expect(response.status()).toBe(200)

    const body = await JSON.parse(await response.text())
    expect(body.brands.length).toBeGreaterThan(0)

    console.log("Total brands found: " + body.brands.length)
    expect(body.brands[0]).toHaveProperty('brand')
})

test('API 4: PUT To All Brands List', async ({ request }) => {

    const response = await request.put('https://automationexercise.com/api/brandsList', {
        data: {
            title: 'Book Title',
            author: 'John Doe',
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(405)

    expect(body.message).toBe('This request method is not supported.')

})

test('API 5: POST To Search Product', async ({ request }) => {

    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        form: {
            search_product: 'tshirt'
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(200)

    expect(body.products.length).toBeGreaterThan(0)

    const productName = body.products[0].name.toLowerCase();
    expect(productName).toContain('shirt')

    console.log("Mastery Check: Search returned " + body.products.length + " items.")

})

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        form: {

        }
    })

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(400)

    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.')

    console.log(body.message)
})
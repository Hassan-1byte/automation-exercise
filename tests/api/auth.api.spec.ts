import { test, expect } from "@playwright/test"

test('API 7: POST To Verify Login with valid details', async ({ request }) => {

    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'Hassan1@test.com',
            password: 'pakistan123'
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.message).toBe('User exists!')

    console.log(body.message)


})

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {

    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            password: "pakistan123"
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(400)

    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.')

    console.log(body.message)

})

test('API 9: DELETE To Verify Login', async ({ request }) => {

    const response = await request.delete('https://automationexercise.com/api/verifyLogin')
    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(405)

    expect(body.message).toBe('This request method is not supported.')

    console.log(body.message)

})

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: "Apple@gmail.com",
            password: "123456789"
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(404)

    expect(body.message).toBe('User not found!')

    console.log(body.message)

    console.log('Status: ' + body.responseCode + ' Message: ' + body.message)
})

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {

    const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
        form: {
            email: "manahil1@test.com",
            password: "pakistan123"
        }
    })

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text())

    expect(body.responseCode).toBe(200)
    expect(body.message).toBe('Account deleted!')

    console.log(body.message)


})

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        form: {
            name: "Manahil",
            email: "manahil1@test.com",
            password: "pakistan123",
            title: "Miss",
            birth_date: "06",
            birth_month: "May",
            birth_year: "1996",
            firstname: "Manahil",
            lastname: "Hassan",
            company: "",
            address1: "Street address, P.O. Box, Company name, etc.",
            address2: "",
            country: "India",
            zipcode: "62300",
            state: "Punjab",
            city: "Delhi",
            mobile_number: "9334-7993817"

        }
    })

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(201)

    expect(body.message).toBe('User created!')

    console.log(body.message)
})

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    const response = await request.put('https://automationexercise.com/api/updateAccount', {
        form: {
            name: "Mini",
            email: "manahil1@test.com",
            password: "pakistan123",
            title: "Mrs",
            birth_date: "06",
            birth_month: "May",
            birth_year: "1996",
            firstname: "Wife",
            lastname: "Hassan",
            company: "",
            address1: "Street address, P.O. Box, Company name, etc.",
            address2: "",
            country: "India",
            zipcode: "62300",
            state: "Punjab",
            city: "Lucknow",
            mobile_number: "9334-7993817"
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())
    expect(body.responseCode).toBe(200)
    expect(body.message).toBe('User updated!')

    console.log("User Updated")
})

test('API 14: GET user account detail by email', async ({ request }) => {

    const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
        params: {
            email: "manahil1@test.com"
        }
    })

    expect(response.status()).toBe(200)

    const body = JSON.parse(await response.text())

    expect(body.responseCode).toBe(200)

    expect(body.user).toBeDefined()

    expect(body.user.email).toBe("manahil1@test.com")

    console.log(body.user)


})
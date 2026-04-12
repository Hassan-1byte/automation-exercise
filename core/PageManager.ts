import { Page } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export class PageManager {

    private readonly page: Page
    private readonly authpage: AuthPage
    private readonly productpage: ProductPage
    private readonly cartPage: CartPage
    private readonly checkOutPage: CheckoutPage


    constructor(page: Page) {
        this.page = page
        this.authpage = new AuthPage(this.page)
        this.productpage = new ProductPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkOutPage = new CheckoutPage(this.page)
    }


    // Now we need to create methods that will return the instances of the all page objects.

    async goToAuthPage() {
        return this.authpage
    }

    async goToProductPage() {
        return this.productpage
    }

    async goToCartPage() {
        return this.cartPage
    }

    async goToCheckOutPage(){
        return this.checkOutPage
    }





}
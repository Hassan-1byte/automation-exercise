import { Page } from "@playwright/test";

export class AccountPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
}
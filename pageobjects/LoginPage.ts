
import { Locator, Page } from '@playwright/test'

export class LoginPage {

    page : Page;
    email : Locator;
    password : Locator;
    signInbutton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.email = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        this.signInbutton = this.page.locator("[value='Login']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(email: string, password: string) {

        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".card-body b").first().waitFor();

    }


}
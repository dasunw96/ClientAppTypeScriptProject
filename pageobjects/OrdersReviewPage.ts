import { expect,Locator, Page } from '@playwright/test'

export class OrdersReviewPage {

    page : Page;
    emailId : Locator;
    addedItem : Locator;
    checkoutBtn : Locator;
    country : Locator;
    dropdown : Locator;
    placeOrderBtn : Locator;
    orderConfirmationText : Locator;
    orderId : Locator;

    constructor(page : Page) {

        this.page = page;
        this.emailId = page.locator(".user__name [type='text']").first();
        this.addedItem = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutBtn = page.locator("text=Checkout");
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeOrderBtn = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async VerifyEmailId(username: string) {
        await expect(this.emailId).toHaveText(username);
    }

    async searchCountryAndSelect(typedtext:string, country: string) {
        await this.country.pressSequentially(typedtext);
        await this.dropdown.waitFor({ state: "visible" });
        const countryOption = this.dropdown.locator("button", { hasText: country }).first();
        await countryOption.waitFor({ state: "visible" });
        await countryOption.click();
    }

    async SubmitAndGetOrderId() {
        await this.placeOrderBtn.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }


}
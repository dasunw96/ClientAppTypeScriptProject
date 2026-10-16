
import { Locator, Page } from '@playwright/test'

export class DashboardPage{

    page : Page;
    products : Locator;
    productTitles : Locator;
    cartlink : Locator;
    productList : Locator;
    orders : Locator

constructor(page : Page){

    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productTitles = this.page.locator(".card-body b");
    this.cartlink = this.page.locator("[routerlink*='cart']");
    this.productList = this.page.locator("div li");
    this.orders = page.locator("button[routerlink*='myorders']");
}

async searchProduct(productName : string){
       const titles = await this.productTitles.allTextContents();
       console.log(titles);
       const count = await this.products.count();
       for (let i = 0; i < count; ++i) {
          if (await this.products.nth(i).locator("b").textContent() === productName) {
             //add to cart
             await this.products.nth(i).locator("text= Add To Cart").click();
             break;
          }
       }
}

async navigateToCart(){

    await this.cartlink.click();
}

async navigateToOrders()
{
    await this.orders.click();
}

}
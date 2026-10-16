import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManger'

//json > string > jsObject

const testData = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')));

//e2e flow from login>select product>add to cart> checkout> place order> validate order id from order history page

for (const data of testData) {

   test(`Client App login ${data.productName}'`, async ({ page }) => {

      const poManager = new POManager(page);
      const loginPage = poManager.getLoginPage()

      await loginPage.goTo();
      await loginPage.validLogin(data.username, data.password);

      const dashboardPage = poManager.getDashboardPage();

      await dashboardPage.searchProduct(data.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      ordersReviewPage.VerifyEmailId(data.username);
      await ordersReviewPage.searchCountryAndSelect("sri", " Sri Lanka");
      const orderId:any = await ordersReviewPage.SubmitAndGetOrderId();

      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

   });

}










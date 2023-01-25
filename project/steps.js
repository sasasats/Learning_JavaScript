import LoginPage from "./pages/login.page.js";

export default class Steps {
  static loginPage = new LoginPage();

  static async Authorize(login, password) {
    await this.loginPage.enterPhoneOrEmail(login);
    await this.loginPage.clickSignInButton();
    await this.loginPage.enterPassword(password)
    await this.loginPage.clickContinueButton();
  }
}
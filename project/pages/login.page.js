import Page from "./page.js";
import WaitUtils from "../../framework/utils/wait.utils.js";

export default class LoginPage extends Page {

  get phoneOrEmailInput() {
    return $("//input[@id='index_email']");
  }

  get signInButton() {
    return $("//button[contains(@class,'VkIdForm__signInButton')]");
  }

  get passwordInput() {
    return $("//input[@type='password']");
  }

  get continueButton() {
    return $("//button[@type='submit']");
  }

  async enterPhoneOrEmail(phoneOrEmail) {
    await this.phoneOrEmailInput.setValue(phoneOrEmail);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async enterPassword(password) {
    await WaitUtils.setValue(this.passwordInput, password);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async isOpened() {
    return super.isOpened(this.phoneOrEmailInput);
  }
}
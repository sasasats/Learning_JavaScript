import LoginPage from "../../project/pages/login.page.js";
import VkApiUtils from "./vk.api.utils.js";

export default class Steps {
  static loginPage = new LoginPage();

  static async authorize(login, password) {
    await this.loginPage.enterPhoneOrEmail(login);
    await this.loginPage.clickSignInButton();
    await this.loginPage.enterPassword(password)
    await this.loginPage.clickContinueButton();
  }

  static async uploadPhoto(photoPath) {
    const uploadedPhoto = await VkApiUtils.uploadPhoto(photoPath);
    return VkApiUtils.saveWallPhoto(uploadedPhoto);
  }
}
import LoginCardPage from "../pages/login.card.page.js";
import TextUtils from "../../framework/utils/text.utils.js";

class LoginCardSteps {
  #loginCardPage = new LoginCardPage();

  async login() {
    let email = TextUtils.generateRandomString(TextUtils.ENGILSH_ALPHABET, 5) +
      TextUtils.generateRandomString(TextUtils.NUMBERS, 3) +
      TextUtils.generateRandomString(TextUtils.ENGILSH_ALPHABET, 1)
        .toUpperCase();

    await this.#loginCardPage.enterPassword(email +
      TextUtils.generateRandomString(TextUtils.CYRILLIC_ALPHABET, 1));
    await this.#loginCardPage.enterEmail(email);
    await this.#loginCardPage.enterDomain(TextUtils.generateRandomString(
      TextUtils.ENGILSH_ALPHABET, 3) +
      TextUtils.generateRandomString(TextUtils.NUMBERS, 2));

    await this.#loginCardPage.openDropdownDomains();
    await this.#loginCardPage.selectRandomDropdown();
    await this.#loginCardPage.clickTermsConditionsCheckBox();
    await this.#loginCardPage.goToNextCard();
  }
}

export default new LoginCardSteps();
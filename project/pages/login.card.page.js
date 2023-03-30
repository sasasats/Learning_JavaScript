import RandomUtils from '../../framework/utils/random.utils.js';

export default class LoginCardPage {
  getInputByPlaceholder(placeholder) {
    return `//input[@placeholder='${placeholder}']`;
  }

  get passwordInput() {
    return $(this.getInputByPlaceholder('Choose Password'));
  }

  get emailInput() {
    return $(this.getInputByPlaceholder('Your email'));
  }

  get domainInput() {
    return $(this.getInputByPlaceholder('Domain'));
  }

  get domainDropdownOpener() {
    return $("//span[contains(@class,'icon-chevron-down')]");
  }

  get domains() {
    return $$("//div[@class='dropdown__list-item']");
  }

  get termsConditionsCheckBox() {
    return $("//span[@class='checkbox__box']");
  }

  get goToNextCardButton() {
    return $("//a[text()='Next']");
  }

  async enterPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async enterEmail(email) {
    await this.emailInput.setValue(email);
  }

  async enterDomain(domain) {
    await this.domainInput.setValue(domain);
  }

  async openDropdownDomains() {
    await this.domainDropdownOpener.click();
  }

  async selectRandomDropdown() {
    await (await RandomUtils.getRandomElement(this.domains)).click();
  }

  async clickTermsConditionsCheckBox() {
    await this.termsConditionsCheckBox.click();
  }

  async goToNextCard() {
    await this.goToNextCardButton.click();
  }
}
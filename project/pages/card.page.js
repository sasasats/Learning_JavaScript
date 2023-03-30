import Page from './page.js';

export default class CardPage extends Page {
  get pageIndicator() {
    return $("//div[@class='page-indicator']");
  }

  get helpForm() {
    return $("//div[contains(@class,'help-form')]");
  }

  get hideHelpFormButton() {
    return $(`//div[@class='help-form']//button[contains(
      @class,'help-form__send-to-bottom-button')]`);
  }

  get cookiesForm() {
    return $("//div[@class='cookies']");
  }

  get acceptCookiesButton() {
    return $(`//div[@class='cookies']//button[contains(
      @class,'button--transparent')]`);
  }

  get timer() {
    return $("//div[contains(@class,'timer')]");
  }

  async getCardIndicatorByNumber(cardNumber) {
    return $(`//div[@class='page-indicator' and text()='${cardNumber} / 4']`);
  }

  async isOpened(cardNumber) {
    return super.isOpened(await this.getCardIndicatorByNumber(cardNumber));
  }

  async isHelpFormHidden() {
    return (await this.helpForm.getAttribute('class')).includes('is-hidden');
  }

  async clickHideHelpFormButton() {
    await this.hideHelpFormButton.click();
  }

  async isCookiesFormDisplayed() {
    return this.cookiesForm.isDisplayed();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async getTimerValue() {
    return this.timer.getText();
  }
}
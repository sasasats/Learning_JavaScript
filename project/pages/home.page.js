import Page from './page.js'

export default class HomePage extends Page {
  get page() {
    return $("//div[contains(@class,'start')]");
  }

  get linkToCardsPage() {
    return $("//a[@class='start__link']");
  }

  async isHomePageOpened() {
    return this.page.isDisplayed();
  }

  async clickLinkToCardsPage() {
    await this.linkToCardsPage.click();
  }

  async open() {
    return super.open('');
  }
}
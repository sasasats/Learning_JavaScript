import Page from './page.js'

export default class HomePage extends Page {
  get page() {
    return $("//div[contains(@class,'start')]");
  }

  get linkToCardsPage() {
    return $("//a[@class='start__link']");
  }

  async isOpened() {
    return super.isOpened(this.page);
  }
  async clickLinkToCardsPage() {
    await this.linkToCardsPage.click();
  }
}
import Page from "./page.js";

export default class MainPage extends Page {
  get myPage() {
    return $("//li[@id='l_pr']");
  }

  async clickMyPage() {
    await this.myPage.click();
  }

  async isOpened() {
    await this.myPage.waitForClickable({ timeout: 100000 });
    return super.isOpened(this.myPage);
  }
}
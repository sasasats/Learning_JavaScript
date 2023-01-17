export default class BrowserUtils {
  static async open(path) {
    return browser.navigateTo(`https://userinyerface.com/${path}`);
  }
}
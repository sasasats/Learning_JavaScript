export default class BrowserUtils {
  static async open(path = '') {
    return browser.navigateTo(`https://vk.com/${path}`);
  }
}
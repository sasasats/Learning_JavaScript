export default class Page {
  async open(path) {
    return browser.navigateTo(`https://userinyerface.com/${path}`);
  }
}
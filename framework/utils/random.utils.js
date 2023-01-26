export default class RandomUtils {
  static CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  static getRandomString(length) {
    const charactersLength = this.CHARACTERS.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * charactersLength);
      let a = this.CHARACTERS.charAt(index);
      randomString += a;
    }
    return randomString;
  }
}
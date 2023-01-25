export default class RandomUtils {
  static CHARACTERS = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
  0123456789`;

  static getRandomString(length) {
    let result = '';
    const charactersLength = this.CHARACTERS.length - 1;

    for (let i = 0; i < length; i++) {
      result += this.CHARACTERS.charAt(Math.floor(
        Math.random() * charactersLength));
    }

    return result;
  }
}
export default class TextUtils {
  static ENGILSH_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  static CYRILLIC_ALPHABET =
    "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  static NUMBERS = "1234567890";

  static generateRandomString(symbolCollection, length) {
    let string = "";
    for (let i = 0; i < length; i++) {
      string += symbolCollection[Math.floor(
        Math.random() * symbolCollection.length)];
    }
    return string;
  }
}
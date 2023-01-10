class TextUtils {
  ENGILSH_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  CYRILLIC_ALPHABET =
    "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  NUMBERS = "1234567890";

  generateRandomString(symbolCollection, length) {
    let string = "";
    for (let i = 0; i < length; i++) {
      string += symbolCollection[Math.floor(
        Math.random() * symbolCollection.length)];
    }
    return string;
  }
}

export default new TextUtils();
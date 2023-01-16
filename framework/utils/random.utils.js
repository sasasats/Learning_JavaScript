class RandomUtils {
  getRandomAlphaNumericString(length) {
    return Math.random().toString(36).substring(2, length + 2);
  }
}

export default new RandomUtils();
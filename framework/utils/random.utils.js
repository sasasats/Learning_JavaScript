class RandomUtils {
  async getRandomElement(array) {
    return array[Math.floor(Math.random() * await array.length)];
  }

  async getRandomElements(array, quantity) {
    let resultArray = [];
    for (let i = 0; i < quantity; i++) {
      let randomIndex = Math.floor(Math.random() * await array.length);
      resultArray.push(array[randomIndex]);
      array.splice((randomIndex), 1);
    }
    return resultArray;
  }
}

export default new RandomUtils();
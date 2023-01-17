import { expect } from "chai";

export default class AssertUtils {
  static async isStatuscodeCorrect(response, expectedStatuscode) {
    expect(response.status).equals(expectedStatuscode);
  }

  static async isResponseBodyEmpty(response) {
    expect(String(await response.json())).equals(String({}));
  }

  static isCreatedPostFilled(post, data) {
    expect(post.userId).equals(data.userId);
    expect(post.title).equals(data.title);
    expect(post.body).equals(data.body);
    expect(post.id).not.equals(undefined);
  }
}
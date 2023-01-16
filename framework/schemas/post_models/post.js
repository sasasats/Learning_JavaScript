import Statuscode from "../../enums/statuscodes.js";
import Endpoint from "../../enums/endpoints.js";
import AssertUils from "../../utils/assert.uils.js";

export default class Post {
  constructor(data) {
    this.userId = data.userId;
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
  }

  static async getPost(postId) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS + postId);
    AssertUils.isStatuscodeCorrect(response, Statuscode.CREATED);
    return new Post(await response.json());
  }

  static async createPost(data) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    AssertUils.isStatuscodeCorrect(response, Statuscode.CREATED);
    const post = new Post(await response.json());
    AssertUils.isCreatedPostFilled(post, data);
    return post;
  }

  static async getNoSuchPost(postId) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS + postId);
    AssertUils.isStatuscodeCorrect(response, Statuscode.NOT_FOUND);
    AssertUils.isResponseBodyEmpty(response);
  }
}
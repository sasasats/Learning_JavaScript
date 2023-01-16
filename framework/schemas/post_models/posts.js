import Statuscode from "../../enums/statuscodes.js";
import Post from "./post.js";
import Endpoint from "../../enums/endpoints.js";
import AssertUils from "../../utils/assert.uils.js";

export default class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  isPostsSorted() {
    let ids = [];
    for (let post of this.posts) {
      ids.push(new Post(post).id)
    }
    return ids.toString() === ids.slice().sort((a, b) => a - b).toString();
  }

  static async getPosts() {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS);
    AssertUils.isStatuscodeCorrect(response, Statuscode.OK)
    let posts = [];
    for (let post of await response.json()) {
      posts.push(new Post(post))
    }
    return new Posts(posts);
  }
}
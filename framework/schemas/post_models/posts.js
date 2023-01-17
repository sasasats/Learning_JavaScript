import Post from "./post.js";

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
}
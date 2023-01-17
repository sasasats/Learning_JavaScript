import Statuscode from "../enums/statuscodes.js";
import Endpoint from "../enums/endpoints.js";
import AssertUtils from "./assert.utils.js";
import { expect } from "chai";
import Posts from "../schemas/post_models/posts.js";
import Post from "../schemas/post_models/post.js";
import Users from "../schemas/user_models/users.js";
import User from "../schemas/user_models/user.js";


export default class ApiUtils {
  static async getPost(postId) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS + postId);
    AssertUtils.isStatuscodeCorrect(response, Statuscode.CREATED);
    return new Post(await response.json());
  }

  static async createPost(data) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    AssertUtils.isStatuscodeCorrect(response, Statuscode.CREATED);
    const post = new Post(await response.json());
    AssertUtils.isCreatedPostFilled(post, data);
    return post;
  }

  static async getNoSuchPost(postId) {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS + postId);
    AssertUtils.isStatuscodeCorrect(response, Statuscode.NOT_FOUND);
    AssertUtils.isResponseBodyEmpty(response);
  }

  static async getPosts() {
    const response = await fetch(Endpoint.URL + Endpoint.POSTS);
    AssertUtils.isStatuscodeCorrect(response, Statuscode.OK)
    let posts = [];
    for (let post of await response.json()) {
      posts.push(new Post(post))
    }
    return new Posts(posts);
  }

  static async getUser(userId) {
    const response = await fetch(Endpoint.URL + Endpoint.USERS + userId);
    expect(response.status).equals(Statuscode.OK);
    return new User(await response.json());
  }

  static async getUsers() {
    const response = await fetch(Endpoint.URL + Endpoint.USERS);
    AssertUtils.isStatuscodeCorrect(response, Statuscode.OK)
    let users = [];
    for (let user of await response.json()) {
      users.push(new User(user))
    }
    return new Users(users);
  }
}
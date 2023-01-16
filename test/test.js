import Posts from '../framework/schemas/post_models/posts.js';
import Post from '../framework/schemas/post_models/post.js';
import User from '../framework/schemas/user_models/user.js';
import RandomUtils from '../framework/utils/random.utils.js';
import Users from '../framework/schemas/user_models/users.js';
import user5 from '../framework/templates/user5.json' assert { type: "json" };
import { expect } from 'chai';

describe('Rest API task', () => {
  it('Get all posts', async () => {
    const posts = await Posts.getPosts();
    expect(posts.isPostsSorted()).to.be.true;
  })

  it('Get post 99', async () => {
    const post = await Post.getPost(99);
  })

  it('Get post 150', async () => {
    const post = await Post.getNoSuchPost(150);
  })

  it('Create post', async () => {
    const data = {
      'userId': 1,
      'title': RandomUtils.getRandomAlphaNumericString(10),
      'body': RandomUtils.getRandomAlphaNumericString(10)
    };
    const post = await Post.createPost(data);
  })

  it('Get all users', async () => {
    const templateUser = new User(user5);
    const user = await (await Users.getUsers()).getUser(5);
    expect(JSON.stringify(templateUser)).equals(JSON.stringify(user));
  })

  it('Get user 5', async () => {
    const templateUser = new User(user5);
    const user = await User.getUser(5);
    expect(JSON.stringify(templateUser)).equals(JSON.stringify(user));
  })
})
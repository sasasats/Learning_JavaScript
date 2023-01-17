import Post from '../framework/schemas/post_models/post.js';
import User from '../framework/schemas/user_models/user.js';
import RandomUtils from '../framework/utils/random.utils.js';
import Users from '../framework/schemas/user_models/users.js';
import user5 from '../framework/templates/user5.json' assert { type: "json" };
import { expect } from 'chai';
import ApiUtils from '../framework/utils/api.utils.js';

describe('Rest API task', () => {
  const USER_NUMBER_5 = 5;
  const RANDOM_STRING_LENGTH = 10;
  const EXISTING_POST_ID = 99;
  const NOT_EXISTING_POST_ID = 150;

  it('Get all posts', async () => {
    const posts = await ApiUtils.getPosts();
    expect(posts.isPostsSorted()).to.be.true;
  })

  it('Get post 99', async () => {
    const post = await ApiUtils.getPost(EXISTING_POST_ID);
  })

  it('Get post 150', async () => {
    const post = await ApiUtils.getNoSuchPost(NOT_EXISTING_POST_ID);
  })

  it('Create post', async () => {
    const post = await ApiUtils.createPost({
      'userId': 1,
      'title': RandomUtils.getRandomAlphaNumericString(RANDOM_STRING_LENGTH),
      'body': RandomUtils.getRandomAlphaNumericString(RANDOM_STRING_LENGTH)
    });
  })

  it('Get all users', async () => {
    const templateUser = new User(user5);
    const user = await (await ApiUtils.getUsers()).getUser(USER_NUMBER_5);
    expect(JSON.stringify(templateUser)).equals(JSON.stringify(user));
  })

  it('Get user 5', async () => {
    const templateUser = new User(user5);
    const user = await ApiUtils.getUser(USER_NUMBER_5);
    expect(JSON.stringify(templateUser)).equals(JSON.stringify(user));
  })
})
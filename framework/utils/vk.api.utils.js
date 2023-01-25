import { userData } from '../data/user.data.js';
import { apiData } from '../data/api.data.js';
import { apiEndpoints } from '../data/api.endpoints.js';
import { apiParameters } from '../data/api.parameters.js';
import fs from 'fs'
import path from "path";
import FormData from "form-data";

export default class VkApiUtils {
  static async createPost(textMessage) {
    const response = await fetch(apiData.request(apiEndpoints.wallPost), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.message]: textMessage,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return await (await response.json()).response.post_id;
  }

  static async changePostText(postId, textMessage) {
    const response = await fetch(apiData.request(apiEndpoints.wallEdit), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
        [apiParameters.message]: textMessage,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return await (await response.json()).response.post_id;
  }

  static async getUploadLink() {
    const response = await fetch(apiData.request(apiEndpoints.uploadLink), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.user_id]: userData.id,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return await (await response.json()).response.upload_url;
  }

  static async uploadPhoto() {
    const filePath = '../resources/ochoba359.jpg';
    let reader = fs.createReadStream(path.resolve(filePath));
    let formData = new FormData();
    formData.append('photo', reader);

    console.log(`\n\n${await this.getUploadLink()}\n\n`);

    const response = await fetch(await this.getUploadLink(), {
      method: 'post',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.json();
  }


  static async createComment(postId, textMessage) {
    const response = await fetch(
      apiData.request(apiEndpoints.wallCreateComment), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
        [apiParameters.message]: textMessage,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return await (await response.json()).response.comment_id;
  }

  static async isPostLiked(postId) {
    const response = await fetch(
      apiData.request(apiEndpoints.likesIsLiked), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.user_id]: userData.id,
        [apiParameters.type]: apiParameters.post,
        [apiParameters.owner_id]: userData.id,
        [apiParameters.item_id]: postId,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return await (await response.json()).response.liked;
  }

  static async deletePost(postId) {
    const response = await fetch(
      apiData.request(apiEndpoints.wallDelete), {
      method: 'post',
      body: new URLSearchParams({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
        [apiParameters.access_token]: apiData.token,
        [apiParameters.v]: apiData.version
      }),
      headers: { 'Content-Type': 'Multipart/form-data' }
    });
    return await (await response.json());
  }
}
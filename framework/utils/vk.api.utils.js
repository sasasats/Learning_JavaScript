import fs from 'fs';
import fetch from 'node-fetch';
import FormData from "form-data";

import { apiData } from '../data/api.data.js';
import { userData } from '../data/user.data.js';
import { apiEndpoints } from '../data/api.endpoints.js';
import { apiParameters } from '../data/api.parameters.js';

export default class VkApiUtils {
  static DEFAULT_PARAMETERS = {
    [apiParameters.access_token]: apiData.token,
    [apiParameters.v]: apiData.version
  }

  static async createPost(textMessage) {
    const response = await fetch(apiData.request(apiEndpoints.wallPost), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.message]: textMessage,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return await (await response.json()).response.post_id;
  }

  static async changePost(postId, textMessage, uploadedPhoto) {
    const response = await fetch(apiData.request(apiEndpoints.wallEdit), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
        [apiParameters.message]: textMessage,
        [apiParameters.attachments]:
          `${apiParameters.photo}${uploadedPhoto.owner_id}_${uploadedPhoto.id}`,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return await (await response.json()).response.post_id;
  }

  static async getUploadLink() {
    const response = await fetch(apiData.request(apiEndpoints.uploadLink), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.user_id]: userData.id,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return await (await response.json()).response.upload_url;
  }

  static async uploadPhoto(filePath) {
    const reader = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append(apiParameters.photo, reader);

    const response = await fetch(await this.getUploadLink(), {
      method: apiParameters.post,
      body: formData,
      headers: formData.getHeaders(),
    });
    return response.json();
  }

  static async saveWallPhoto(uploadedPhoto) {
    const response = await fetch(
      apiData.request(apiEndpoints.photosSaveWallPhoto), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.user_id]: userData.id,
        [apiParameters.photo]: uploadedPhoto.photo,
        [apiParameters.server]: uploadedPhoto.server,
        [apiParameters.hash]: uploadedPhoto.hash,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return (await response.json()).response[0];
  }

  static async createComment(postId, textMessage) {
    const response = await fetch(
      apiData.request(apiEndpoints.wallCreateComment), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
        [apiParameters.message]: textMessage,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return await (await response.json()).response.comment_id;
  }

  static async isPostLiked(postId) {
    const response = await fetch(
      apiData.request(apiEndpoints.likesIsLiked), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.user_id]: userData.id,
        [apiParameters.type]: apiParameters.post,
        [apiParameters.owner_id]: userData.id,
        [apiParameters.item_id]: postId,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return await (await response.json()).response.liked;
  }

  static async deletePost(postId) {
    const response = await fetch(
      apiData.request(apiEndpoints.wallDelete), {
      method: apiParameters.post,
      body: new URLSearchParams(Object.assign({
        [apiParameters.owner_id]: userData.id,
        [apiParameters.post_id]: postId,
      }, this.DEFAULT_PARAMETERS)),
      headers: {
        [apiParameters.content_type]: apiParameters.application_urlencoded
      }
    });
    return response.json();
  }
}
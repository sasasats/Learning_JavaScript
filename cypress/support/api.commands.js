import vkApiParamteres from '../fixtures/vk.api.parameters.json';
import vkApiEndpoints from '../fixtures/vk.api.endpoints.json';
import vkApiData from '../fixtures/vk.api.data.json';
import user from '../fixtures/user.json';

Cypress.Commands.add('createPost', (message) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.wallPost,
    qs: Object.assign({
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.message]: message,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    })
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('getAddressToUploadingPhoto', () => {
  return cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.getWallUploadServer,
    qs: {
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('createComment', (postId, message) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.createComment,
    qs: {
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.postId]: postId,
      [vkApiParamteres.message]: message,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('isPostLiked', (postId) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.isLiked,
    qs: {
      [vkApiParamteres.userId]: user.id,
      [vkApiParamteres.type]: 'post',
      [vkApiParamteres.itemId]: postId,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('deletePost', (postId) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.deletePost,
    qs: {
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.postId]: postId,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('saveWallPhoto', (resp) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.saveWallPhoto,
    qs: {
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.photo]: resp.photo,
      [vkApiParamteres.server]: resp.server,
      [vkApiParamteres.hash]: resp.hash,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('editPost', (postId, photoId, message) => {
  cy.request({
    method: "POST",
    url: vkApiData.baseUrl + vkApiEndpoints.editPost,
    qs: {
      [vkApiParamteres.ownerId]: user.id,
      [vkApiParamteres.postId]: postId,
      [vkApiParamteres.attachments]: `photo${user.id}_${photoId}`,
      [vkApiParamteres.message]: message,
      [vkApiParamteres.accessToken]: user.token,
      [vkApiParamteres.version]: vkApiData.version
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  })
});

Cypress.Commands.add('updatePost', (userId, postId, message, file, fileType) => {
  cy.getBinary(file).then((binary) => {
    const blob = Cypress.Blob.base64StringToBlob(binary, fileType);

    const formData = new FormData();
    formData.set('file', blob, file);

    cy.getAddressToUploadingPhoto().then((addressResponse) => {
      const uploadUrl = addressResponse.body.response.upload_url;

      const request = new XMLHttpRequest();
      request.open('POST', uploadUrl, false);
      request.send(formData);

      cy.saveWallPhoto(JSON.parse(request.response)).then((photoResponse) => {
        let imageId = photoResponse.body.response[0].id;
        return cy.editPost(postId, imageId, message).then(() => {
          cy.log('7 Check that text was updated and the picture was uploaded (make sure that pictures are the same) without refreshing the page');
          cy.reload();
          cy.isPostHasText(userId, postId, message);
          cy.isPostHasImage(userId, postId, imageId);
        })
      })
    })
  })
})
export const parameterizedLocators = {
  post: (userId, postId, xpath = '') =>
    `//div[@id='post${userId}_${postId}']${xpath}`,
  comment: (userId, commentId, xpath = '') =>
    `//div[@id='wpt${userId}_${commentId}']${xpath}`,
}
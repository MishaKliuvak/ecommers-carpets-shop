import base from './base'

export const uploadFiles = (image, authToken) =>
  base.post('/upload-images', { image }, {
    headers: {
      authToken
    }
  })

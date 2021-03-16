import base from './base'

export const uploadFiles = (image, authToken) =>
  base.post('/upload-images', { image }, {
    headers: {
      authToken
    }
  })

export const removeFile = (public_id, authToken) =>
  base.post('/remove-image', { public_id }, {
    headers: {
      authToken
    }
  })


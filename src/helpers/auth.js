import request from '../axios/base'

export const createOrUpdateUser = async (authToken) => {
  return await request.post('/create-or-update-user', {}, {
    headers: {
      authToken
    }
  })
}

export const currentUser = async (authToken) => {
  return await request.post('/current-user', {}, {
    headers: {
      authToken
    }
  })
}


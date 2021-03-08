import login from '../axios/login'

export const createOrUpdateUser = async (authToken) => {
  return await login.post('/create-or-update-user', {}, {
    headers: {
      authToken
    }
  })
}

export const currentUser = async (authToken) => {
  return await login.post('/current-user', {}, {
    headers: {
      authToken
    }
  })
}


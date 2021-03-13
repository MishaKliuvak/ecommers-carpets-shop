import request from '../axios/base'

const isAdmin = async (authToken) => {
  return await request.post('/current-admin', {}, {
    headers: {
      authToken
    }
  })
}

export default isAdmin


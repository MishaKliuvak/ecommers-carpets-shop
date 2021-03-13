import { login as admin } from '../axios/login'

const isAdmin = async (authToken) => {
  return await admin.post('/current-admin', {}, {
    headers: {
      authToken
    }
  })
}

export default isAdmin


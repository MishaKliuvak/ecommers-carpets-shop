import login from '../axios/login'

const isAdmin = async (authToken) => {
  return await login.post('/current-admin', {}, {
    headers: {
      authToken
    }
  })
}

export default isAdmin


import base from './base'

export const userCart = async (cart, authToken) =>
  await base.post('/user/cart', { cart }, {
    headers: {
      authToken
    }
  })

import base from './base'

export const userCart = async (cart, authToken) =>
  await base.post('/user/cart', { cart }, {
    headers: {
      authToken
    }
  })

export const getUserCart = async (authToken) =>
  await base.get('/user/cart', {
    headers: {
      authToken
    }
  })

export const emptyCart = async (authToken) =>
  await base.delete('/user/cart',  {
    headers: {
      authToken
    }
  })

export const saveUserAddress = async (address, authToken) =>
  await base.post('/user/address', { address }, {
    headers: {
      authToken
    }
  })

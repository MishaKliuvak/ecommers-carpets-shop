import base from './base'

export const createPaymentIntent = async (authToken) =>
  await base.post('/create-payment-intent', {}, {
    headers: {
      authToken
    }
  })

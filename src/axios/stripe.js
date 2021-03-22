import base from './base'

export const createPaymentIntent = async (authToken, coupon) =>
  await base.post('/create-payment-intent', { couponApplied: coupon }, {
    headers: {
      authToken
    }
  })

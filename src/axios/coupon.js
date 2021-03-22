import base from './base'

export const getCoupons = async () =>
  await base.get('/coupons')

export const removeCoupon = async (couponId, authToken) =>
  await base.delete(`/coupon/${couponId}`, {
    headers: {
      authToken
    }
  })

export const createCoupon = async (coupon, authToken) =>
  await base.post(`/coupon`, { coupon }, {
    headers: {
      authToken
    }
  })

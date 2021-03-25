import base from './base'

export const getOrders = async (authToken) =>
  await base.get('/admin/orders', {
    headers: {
      authToken
    }
  })

export const changeStatus = async (orderId, orderStatus, authToken) =>
  await base.put('/admin/order-status', { orderId, orderStatus}, {
    headers: {
      authToken
    }
  })

import request from './base'

export const createProduct = async (product, authToken) =>
  await request.post(`/product`, product,{
    headers: {
      authToken
    }
  })

export const getProducts = async (count) =>
  await request.get(`/products/${count}`)

export const removeProduct = async (slug, authToken) =>
  await request.delete(`/products/${slug}`, {
    headers: {
      authToken
    }
  })

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

export const getProduct = async (slug) =>
  await request.get(`/product/${slug}`)

export const updateProduct = async (slug, product, authToken) =>
  await request.put(`/product/${slug}`, product, {
    headers: {
      authToken
    }
  })

export const getProductsToHome = async (sort, order, limit) =>
  await request.post(`/products`, { sort, order, limit})

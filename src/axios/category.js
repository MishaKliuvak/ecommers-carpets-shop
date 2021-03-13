import request from './base'

export const getCategories = async () =>
  await request.get('/categories')

export const getCategory = async (slug) =>
  await request.get(`/category/${slug}`)

export const removeCategory = async (slug, authToken) =>
  await request.delete(`/category/${slug}`, {
    headers: {
      authToken
    }
  })

export const updateCategory = async (slug, category, authToken) =>
  await request.put(`/category/${slug}`, category, {
    headers: {
      authToken
    }
  })

export const createCategory = async (category, authToken) =>
  await request.post(`/category`, category,{
    headers: {
      authToken
    }
  })

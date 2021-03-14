import request from './base'

export const getSubs = async () =>
  await request.get('/subs')

export const getSub = async (slug) =>
  await request.get(`/sub/${slug}`)

export const removeSub = async (slug, authToken) =>
  await request.delete(`/sub/${slug}`, {
    headers: {
      authToken
    }
  })

export const updateSub = async (slug, sub, authToken) =>
  await request.put(`/sub/${slug}`, sub, {
    headers: {
      authToken
    }
  })

export const createSub = async (sub,authToken) =>
  await request.post(`/sub`, sub, {
    headers: {
      authToken
    }
  })

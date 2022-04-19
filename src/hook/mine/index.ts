import httpRequest from '@/api'

// eslint-disable-next-line camelcase
export async function getUserInfo (user_id:number):Promise<Record<string, any>> {
  const { status, data } = await httpRequest('/api/v1/user', 'get', { user_id })
  return status === 200 ? data : {}
}

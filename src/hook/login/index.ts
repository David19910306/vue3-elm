import httpRequest from '@/api'

export async function refreshCode (): Promise<string> {
  const { status, data } = await httpRequest('/api/v1/captchas', 'post')
  return status === 200 ? data.code : ''
}

// eslint-disable-next-line camelcase
export async function login (username:string, password:string, captcha_code:string): Promise<{[propsName: string]: any}> {
  const { status, data } = await httpRequest('/api/v2/login', 'post', undefined, { username, password, captcha_code })
  return status === 200 ? data : null
}

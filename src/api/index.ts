/* eslint-disable camelcase */
import { AxiosPromise } from 'axios'
import request from '../utils/request'

interface IParams{
  type?: string,
  city_id?: string | string[],
  keyword?: string
}

export default function httpRequest (url: string, method: 'get' | 'post', params?:IParams): AxiosPromise {
  return request({
    url,
    method,
    params
  })
}

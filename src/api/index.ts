/* eslint-disable camelcase */
import { AxiosPromise } from 'axios'
import request from '../utils/request'

interface IParams{
  /** 获取城市列表信息 */
  type?: string,
  /** 获取详细地址信息 */
  city_id?: string | string[],
  keyword?: string,
  /** 获取food列表信息 */
  geohash?: string,
  /** 获取商店列表信息 */
  latitude?: string,
  longitude?: string,
  offset?: number,
  limit?: number,
  restaurant_category_id?: number,
  order_by?: number,
  delivery_mode?: [],
  support_ids?: [],
  restaurant_category_ids?: []
}

export default function httpRequest (url: string, method: 'get' | 'post', params?:IParams): AxiosPromise {
  return request({
    url,
    method,
    params
  })
}

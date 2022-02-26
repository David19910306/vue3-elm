import { AxiosPromise } from 'axios'
import request from '../utils/request'

export function getCities (params:{type:string}): AxiosPromise {
  return request({
    url: 'https://elm.cangdu.org/v1/cities',
    method: 'get',
    params
  })
}

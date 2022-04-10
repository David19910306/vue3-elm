import { reactive, toRefs, Ref } from 'vue'
import httpRequest from '@/api'
import { IFetchResult } from '@/interface'
import { AxiosResponse } from 'axios'

interface IState{
  restaurantInfo: IFetchResult,
  menus: IFetchResult
}

interface IParams{
  shopId: any,
  // eslint-disable-next-line camelcase
  restaurant_id: any
}

export interface IFetchRequest{
  // eslint-disable-next-line camelcase
  getScores: (restaurant_id: any) => Promise<AxiosResponse<any>>,
  // eslint-disable-next-line camelcase
  getTags: (restaurant_id: any) => Promise<AxiosResponse<any>>,
  // eslint-disable-next-line camelcase
  getComments: (restaurant_id: any, tag_name: string, offset: number, limit: number) => Promise<AxiosResponse<any>>
}

export function comments (): IFetchRequest {
  // eslint-disable-next-line camelcase
  function getScores (restaurant_id: any):Promise<AxiosResponse<any>> {
    // eslint-disable-next-line camelcase
    return httpRequest(`/api/ugc/v2/restaurants/${restaurant_id}/ratings/scores`, 'get')
  }

  // eslint-disable-next-line camelcase
  function getTags (restaurant_id: any):Promise<AxiosResponse<any>> {
    // eslint-disable-next-line camelcase
    return httpRequest(`/api/ugc/v2/restaurants/${restaurant_id}/ratings/tags`, 'get')
  }

  // eslint-disable-next-line camelcase
  function getComments (restaurant_id: any, tag_name: string, offset: number, limit: number):Promise<AxiosResponse<any>> {
    // eslint-disable-next-line camelcase
    return httpRequest(`/api/ugc/v2/restaurants/${restaurant_id}/ratings`, 'get', { tag_name, offset, limit })
  }
  return { getScores, getTags, getComments }
}

// eslint-disable-next-line camelcase
export default async function useFetchRequest ({ shopId, restaurant_id }:IParams) {
  const fetchResult:IFetchResult = reactive({
    restaurantInfo: {},
    menus: []
  })

  // onMounted(async () => {
  const restaurantInfo = await httpRequest(`/api/shopping/restaurant/${shopId}`, 'get')
  const menus = await httpRequest('/api/shopping/v2/menu', 'get', { restaurant_id })
  fetchResult.restaurantInfo = restaurantInfo.data
  fetchResult.menus = menus.data
  // console.log(menus, restaurantInfo)
  // })

  return { ...toRefs(fetchResult) }

  // async function fetchRestaurantInfo (shopId: any) {
  //   const result = await httpRequest(`/api/shopping/restaurant/${shopId}`, 'get')
  //   data.restaurantInfo = result.data
  //
  //   return { ...toRefs(data) }
  // }
  //
  // // eslint-disable-next-line camelcase
  // async function getMenus (restaurant_id: number) {
  //   const result = await httpRequest('/api/shopping/v2/menu', 'get', { restaurant_id })
  //   data.menus = result.data
  //
  //   return { ...toRefs(data) }
  // }

  // return { fetchRestaurantInfo, getMenus }
}

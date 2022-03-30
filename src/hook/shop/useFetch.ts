import { reactive, toRefs, Ref } from 'vue'
import httpRequest from '@/api'
import { IFetchResult } from '@/interface'

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
  fetchRestaurantInfo: (shopId: any) => Promise<{ restaurantInfo: Ref<Record<string, any>> }>,
  // eslint-disable-next-line camelcase
  getMenus: (restaurant_id: number) => Promise<{ menus: Ref<Record<string, any>> }>
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

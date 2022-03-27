import httpRequest from '@/api'
import { reactive } from 'vue'
import { IResult } from '@/interface'

interface IRequestFunc{
  onMountedRequest: () => Promise<IResult>,
  filterBySpecs: (id:number) => Promise<IResult>,
  filterBySorts: (order:number) => Promise<IResult>,
  // eslint-disable-next-line camelcase
  filterByCondition: (delivery_mode:[], support_ids:[]) => Promise<IResult>
}

export default function useRequest (latitude:string, longitude:string):IRequestFunc {
  const requestResult = reactive({
    category: [],
    shop: []
  })

  async function onMountedRequest ():Promise<IResult> {
    const category = await httpRequest('/api/shopping/v2/restaurant/category', 'get', { latitude, longitude })
    const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
    if (category.status === 200 && shop.status === 200) {
      requestResult.category = category.data
      requestResult.shop = shop.data
    }

    return { requestResult }
  }

  async function filterBySpecs (id:number):Promise<IResult> {
    const result = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0, limit: 20, restaurant_category_ids: [id] })
    requestResult.shop = result.data
    return { requestResult }
  }

  async function filterBySorts (order:number):Promise<IResult> {
    const result = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0, limit: 20, order_by: order })
    requestResult.shop = result.data
    return { requestResult }
  }

  // eslint-disable-next-line camelcase
  async function filterByCondition (delivery_mode:[], support_ids:[]):Promise<IResult> {
    const result = await httpRequest('/api/shopping/restaurants', 'get', {
      latitude,
      longitude,
      offset: 0,
      limit: 20,
      // eslint-disable-next-line camelcase
      delivery_mode: delivery_mode.length > 0 ? [...delivery_mode] : [],
      // eslint-disable-next-line camelcase
      support_ids: support_ids.length > 0 ? [...support_ids] : []
    })
    requestResult.shop = result.data
    return { requestResult }
  }

  return { filterBySpecs, onMountedRequest, filterBySorts, filterByCondition }
}

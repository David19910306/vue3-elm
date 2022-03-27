import httpRequest from '@/api'
import { reactive, Ref, toRefs } from 'vue'
import { useStore } from 'vuex'

interface IRequest{
  category: Ref<never[]>,
  shop: Ref<never[]>
}

export default async function useRequest (): Promise<IRequest> {
  const state = reactive({
    category: [],
    shop: []
  })

  const store = useStore()
  const [latitude, longitude] = store.getters.getGeoHash.split(',')

  const category = await httpRequest('/api/shopping/v2/restaurant/category', 'get', { latitude, longitude })
  const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
  if (category.status === 200 && shop.status === 200) {
    state.category = category.data
    state.shop = shop.data
  }

  return { ...toRefs(state) }
}

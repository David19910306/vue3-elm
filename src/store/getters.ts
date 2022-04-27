import { State } from './state'

const getters = {
  getGeoHash (state: State): string {
    return state.geohash
  },
  getCartFoods (state: State): {[propName:string]: any} {
    // console.log(state.cartFoods)
    return state.cartFoods
  },
  getRestaurantInfo (state: State): {[propName:string]: any} {
    // console.log(state.cartFoods)
    return state.restaurantInfo
  },
  getUserId (state: State): number {
    return state.userId
  },
  getUserInfo (state: State): Record<string, any> {
    return state.userInfo
  },
  getSelectAddress (state: State): Record<string, any> {
    return state.selectAddress
  }
}

export default getters

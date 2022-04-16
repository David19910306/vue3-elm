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
  }
}

export default getters

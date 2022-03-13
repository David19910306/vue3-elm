import { State } from './state'

const getters = {
  getGeoHash (state: State): string {
    return state.geohash
  }
}

export default getters

import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  recordGeoHash (state:State, payload:string):void {
    state.geohash = payload
  }
}

export default mutations

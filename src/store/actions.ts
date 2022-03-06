import { ActionTree } from 'vuex'
import { State } from './state'

const actions:ActionTree<State, State> = {
  recordGeoHash (store, payload:string):void {
    store.commit('recordGeoHash', payload)
  }
}

export default actions

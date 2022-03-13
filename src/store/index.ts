import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import getters from './getters'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState()] // 数据持久化
})

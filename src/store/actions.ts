import { ActionTree } from 'vuex'
import { State } from './state'

const actions:ActionTree<State, State> = {
  recordGeoHash (context, payload:string):void {
    context.commit('recordGeoHash', payload)
  },
  recordFoods (context, payload:{[propName:string]: any}): void{
    context.commit('recordFoods', payload)
  },
  deleteFood (context, payload:number):void{
    context.commit('deleteFood', payload)
  },
  addFoodInCart (context, payload: number):void{
    context.commit('addFoodInCart', payload)
  },
  minusFoodInCart (context, payload: number):void{
    context.commit('minusFoodInCart', payload)
  },
  clearCartById (context, payload: string):void{
    context.commit('clearCartById', payload)
  },
  recordRestaurant (context, payload: Record<string, any>) {
    context.commit('recordRestaurant', payload)
  },
  recordUserId (context, payload: number) {
    context.commit('recordUserId', payload)
  },
  recordUserInfo (context, payload: Record<string, any>) {
    context.commit('recordUserInfo', payload)
  },
  // 修改用户名
  setUserName (context, payload: string) {
    context.commit('setUserName', payload)
  },
  // 选中的地址
  selectAddress (context, payload: Record<string, any>) {
    context.commit('selectAddress', payload)
  },
  // 订单备注信息
  recordOrderRemarks (context, payload: string[]) {
    context.commit('recordMarks', payload)
  }
}

export default actions

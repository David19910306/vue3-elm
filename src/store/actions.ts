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
  }
}

export default actions

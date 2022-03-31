import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  recordGeoHash (state:State, payload:string):void {
    state.geohash = payload
  },
  recordFoods (state: State, payload:{[propName:string]: any}): void{
    // console.log(payload)
    const food = state.cartFoods.find(food => food.food_id === payload.food_id)
    // console.log(food)
    const newFood = food ? { foodCount: ++food.foodCount, ...food } : { foodCount: 1, ...payload }
    // console.log(newFood)
    state.cartFoods = [{ ...newFood }, ...state.cartFoods.filter(food => food.food_id !== payload.food_id)]
    // console.log(state.cartFoods)
  }
}

export default mutations

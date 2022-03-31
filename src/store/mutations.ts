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
  },
  deleteFood (state: State, payload:number):void{
    const delFood = state.cartFoods.find(cartFood => cartFood.item_id === payload)
    // console.log(delFood)
    // console.log({ foodCount: delFood && --delFood.foodCount, ...delFood })
    // console.log(state.cartFoods.filter(cartFood => cartFood.item_id !== payload))
    // delFood? --delFood.foodCount > 0?
    // state.cartFoods = [{ foodCount: delFood.foodCount, ...delFood }, ...state.cartFoods.filter(cartFood => cartFood.item_id !== payload)]
    if (delFood) {
      --delFood.foodCount > 0 ? state.cartFoods = [{ foodCount: delFood.foodCount, ...delFood }, ...state.cartFoods.filter(cartFood => cartFood.item_id !== payload)]
        : state.cartFoods = [...state.cartFoods.filter(cartFood => cartFood.item_id !== payload)]
    }
  }
}

export default mutations

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
  },
  // 在购物车中添加商品
  addFoodInCart (state: State, payload: number):void{
    const addFood = state.cartFoods.find((food: Record<string, any>) => food.food_id === payload)
    if (addFood) ++addFood.foodCount
  },
  // 在购物车中删减商品
  minusFoodInCart (state: State, payload: number):void{
    const minusFood = state.cartFoods.find((food: Record<string, any>) => food.food_id === payload)
    if (minusFood && --minusFood.foodCount === 0) {
      state.cartFoods = [...state.cartFoods.filter(food => food.food_id !== payload)]
    }
  },
  // 根据传过来的餐馆id，清空对应餐馆的购物车
  clearCartById (state: State, payload: string):void{
    // console.log(typeof payload)
    state.cartFoods = [...state.cartFoods.filter(food => food.restaurant_id !== parseInt(payload))]
    console.log(state.cartFoods)
  },
  // 记录当前的餐馆信息
  recordRestaurant (state: State, payload: Record<string, any>) {
    state.restaurantInfo = payload
  },
  // 记录登录用户的id
  recordUserId (state: State, payload: number) {
    state.userId = payload
  }
}

export default mutations

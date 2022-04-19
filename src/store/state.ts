export interface State{
  geohash: string,
  cartFoods: {[propName:string]: any}[],
  restaurantInfo: Record<string, any>,
  userId: number
}

const state:State = {
  geohash: '',
  cartFoods: [], // 购物车的数据存储
  restaurantInfo: {}, // 当前餐馆信息
  userId: 0 // 用户id
}

export default state

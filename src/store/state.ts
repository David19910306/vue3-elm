export interface State{
  geohash: string,
  cartFoods: {[propName:string]: any}[]
}

const state:State = {
  geohash: '',
  cartFoods: [] // 购物车的数据存储
}

export default state

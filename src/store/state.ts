export interface State{
  geohash: string,
  cartFoods: {[propName:string]: any}[],
  restaurantInfo: Record<string, any>,
  userId: number,
  userInfo: Record<string, any>,
  selectAddress: Record<string, any>,
  orderRemarks: string[]
}

const state:State = {
  geohash: '',
  cartFoods: [], // 购物车的数据存储
  restaurantInfo: {}, // 当前餐馆信息
  userId: 0, // 用户id, 默认为0
  userInfo: {},
  selectAddress: {}, // 选中的地址
  orderRemarks: [] // 订单备注信息
}

export default state

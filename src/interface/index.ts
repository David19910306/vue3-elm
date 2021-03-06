export interface ICity {
  abbr: string,
  'area_code': string,
  id: number,
  'is_map': boolean,
  latitude: number,
  longitude: number,
  name: string,
  pinyin: string,
  sort: number
}

export interface ILocation {
  address: string,
  geohash: string,
  latitude: number,
  longitude: number,
  name: string
}

export interface IResult{
  category?: never[],
  shop?: never[],
  requestResult: Record<string, never[]>
}

export interface IRequestFunc{
  onMountedRequest: () => Promise<IResult>,
  filterBySpecs: (id:number) => Promise<IResult>,
  filterBySorts: (order:number) => Promise<IResult>,
  // eslint-disable-next-line camelcase
  filterByCondition: (delivery_mode:[], support_ids:[]) => Promise<IResult>
}

export interface IFetchResult{
  restaurantInfo: {
    [propName: string]:any // 为餐馆详情设置任意属性
  },
  menus: never[], // 获取菜单信息
  scores?: {
    // eslint-disable-next-line camelcase
    compare_rating: number,
    // eslint-disable-next-line camelcase
    overall_score: number,
    [propName: string]: number
  },
  tags?: never[], // 评价标签
  comments?: never[] // 详细评价
}

export interface IAddress{
  name: string,
  address: string,
  geohash: string,
  latitude: number,
  longitude: number
}

interface INewAddress{
  name: string,
  // eslint-disable-next-line camelcase
  address_detail: string,
  geohash: string,
  address: string,
  phone: string,
  // eslint-disable-next-line camelcase
  phone_bk: string
}

export interface IAddressState{
  form:INewAddress
}

export interface IOrderState{
  checkout: Record<string, any>,
  carts: [],
  restaurantName: string,
  // eslint-disable-next-line camelcase
  image_path: string,
  addresses: Record<string, any>[]
}

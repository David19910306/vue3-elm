import { Ref } from 'vue'

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

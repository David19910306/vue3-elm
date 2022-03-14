import httpRequest from '@/api'
/** 后续需要用hook抽离公共方法 */

// 请求商店列表的方法
function fetchStoreList (latitude:string, longitude:string) {
  const shop:any = {}
  function storeList () {
    return httpRequest('/api/shopping/restaurants', 'get', {
      latitude,
      longitude,
      offset: 0
    })
  }
  return shop.status === 200 ? shop.data : []
}
export default fetchStoreList

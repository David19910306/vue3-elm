<template>
  <div class="msite">
    <section class="swipe-container">
      <Swipe class="my-swipe">
        <SwipeItem>
          <StoreItem v-for="item in state.foodlist.slice(0, 8)" :key="item.id" :item="item"></StoreItem>
        </SwipeItem>
        <SwipeItem>
          <StoreItem v-for="item in state.foodlist.slice(8)" :key="item.id" :item="item"></StoreItem>
        </SwipeItem>
      </Swipe>
    </section>
    <div class="list-container">
      <header><i class="iconfont icon-shangjia"></i><span>附近商家</span></header>
      <section>
        <ListItem v-for="listItem in state.shoplist" :key="listItem.id" :list="listItem"></ListItem>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import StoreItem from '@/components/storeItem/storeItem.vue'
import ListItem from '@/components/listItem/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Msite',
  components: { Swipe, SwipeItem, StoreItem, ListItem },
  setup () {
    const state = reactive({
      foodlist: [],
      shoplist: []
    })
    const store = useStore()
    const [latitude, longitude] = store.getters.getGeoHash.split(',')
    // 组件挂载完毕，请求后台数据
    onMounted(async () => {
      const food = await httpRequest('/api/v2/index_entry', 'get', { geohash: store.getters.getGeoHash })
      const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
      if (food.status === 200 && shop.status === 200) {
        state.foodlist = food.data
        state.shoplist = shop.data
      }
    })
    console.log(state.foodlist)
    return { state }
  }
})
</script>

<style lang="less" scoped>
.msite{
  height: 100%;
  display: flex;
  flex-direction: column;
  .swipe-container{
    background-color: #fff;
    .my-swipe .van-swipe-item {
      height: 1.75rem;
      color: #333;
      font-size: 20px;
      display: flex;
      flex-wrap: wrap;
      padding-bottom: .12rem;
    }
  }
  .list-container{
    margin-top: .1rem;
    background-color: #fff;
    flex: 1;
    header{
      height: .3rem;
      font-size: .13rem;
      color: #999;
      padding: 0 .13rem;
      i{
        margin-right: .05rem;
        line-height: .3rem;
      }
      span{
        line-height: .3rem;
      }
    }
  }
}
</style>

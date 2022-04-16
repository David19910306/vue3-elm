<template>
  <div class="msite">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-sousuo searchIcon"></i></span></template>
      <template v-slot:center><span class="city-name">{{location.name}}</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <section class="msite-content">
      <section class="swipe-container">
        <Swipe class="my-swipe">
          <SwipeItem>
            <StoreItem v-for="item in foodlist.slice(0, 8)" :key="item.id" :item="item"></StoreItem>
          </SwipeItem>
          <SwipeItem>
            <StoreItem v-for="item in foodlist.slice(8)" :key="item.id" :item="item"></StoreItem>
          </SwipeItem>
        </Swipe>
      </section>
      <div class="list-container">
        <header><i class="iconfont icon-shangjia"></i><span>附近商家</span></header>
        <section>
          <ListItem v-for="listItem in shoplist" :key="listItem.id" :list="listItem"></ListItem>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import StoreItem from '@/components/storeItem/storeItem.vue'
import ListItem from '@/components/listItem/index.vue'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainMsite',
  components: { Swipe, SwipeItem, StoreItem, ListItem, Header },
  setup () {
    const state = reactive({
      foodlist: [],
      shoplist: [],
      location: {}, // 当前的位置信息
      geohash: '' // 当前经纬度信息
    })
    const store = useStore()
    const [latitude, longitude] = store.getters.getGeoHash.split(',')
    // 组件挂载完毕，请求后台数据
    onMounted(async () => {
      const response = await httpRequest(`/api/v2/pois/${store.getters.getGeoHash}`, 'get')
      const food = await httpRequest('/api/v2/index_entry', 'get', { geohash: store.getters.getGeoHash })
      const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
      if (response.status === 200 && food.status === 200 && shop.status === 200) {
        state.location = response.data
        state.foodlist = food.data
        state.shoplist = shop.data
      }
    })

    return { ...toRefs(state) }
  }
})
</script>

<style lang="less" scoped>
.msite{
  height: 100%;
  display: flex;
  flex-direction: column;
  .searchIcon{
    font-size: .23rem;
    font-weight: bolder;
  }
  .city-name{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .msite-content{
    overflow-y: auto;
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
      section{
        // background-color: #fff;
        // height: calc(100% - 2.34rem);
        min-height: 4rem;
      }
    }
  }

}
</style>

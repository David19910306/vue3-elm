<template>
  <div class="main">
    <section class="content">
      <!-- 路由的跳转展示页面 -->
      <!-- <router-view></router-view> -->
      <router-view v-slot="{Component}">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </section>
    <section class="tabbar">
      <Tabbar v-model="active" route>
        <TabbarItem :to="{path: '/main/msite', query: {geohash}}">
          <span>外卖</span>
          <template v-slot:icon><Icon class="iconfont icon-elemo1"></Icon></template>
        </TabbarItem>
        <TabbarItem to="/main/search">
          <span>搜索</span>
          <template v-slot:icon><Icon class="iconfont icon-tubiaozhizuomobanyihuifu-"></Icon></template>
        </TabbarItem>
        <TabbarItem to="/main/list">
          <span>订单</span>
          <template v-slot:icon><Icon class="iconfont icon-dingdan"></Icon></template>
        </TabbarItem>
        <TabbarItem to="/main/mine">
          <span>我的</span>
          <template v-slot:icon><Icon class="iconfont icon-31wode"></Icon></template>
        </TabbarItem>
      </Tabbar>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tabbar, TabbarItem, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Main',
  components: { Header, Tabbar, TabbarItem, Icon },
  setup () {
    const active = ref(0)
    const geohash = ref('')
    const { getters } = useStore()
    geohash.value = getters.getGeoHash
    return { active, geohash }
  }
})
</script>

<style lang="less" scoped>
.main{
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
  .content{
    flex: 1;
    background-color: #e4e4e4;
    overflow-y: auto;
  }
  .tabbar {
    height: .49rem;
  }
}
</style>

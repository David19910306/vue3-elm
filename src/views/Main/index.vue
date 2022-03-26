<template>
  <div class="main">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-sousuo searchIcon"></i></span></template>
      <template v-slot:center><span class="city-name">{{location.name}}</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <section class="content">
      <!-- 路由的跳转展示页面 -->
      <router-view></router-view>
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
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Tabbar, TabbarItem, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'
import httpRequest from '@/api'

export default defineComponent({
  name: 'Main',
  components: { Header, Tabbar, TabbarItem, Icon },
  setup () {
    const active = ref(0)
    const data = reactive({
      location: {}, // 当前的位置信息
      geohash: '' // 当前经纬度信息
    })
    const { getters } = useStore()
    data.geohash = getters.getGeoHash
    // 组件挂载请求后台
    onMounted(async () => {
      const response = await httpRequest(`/api/v2/pois/${getters.getGeoHash}`, 'get')
      data.location = response.data
    })
    return { active, ...toRefs(data) }
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

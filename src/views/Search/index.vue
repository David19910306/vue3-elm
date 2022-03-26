<template>
  <div class="search">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft"></i></span></template>
      <template v-slot:center><span class="city-name">{{city.name}}</span></template>
      <template v-slot:right><span>切换城市</span></template>
    </Header>
    <div class="body-content">
      <section class="search-body">
        <Form @submit="onSubmit(keyword)">
          <CellGroup>
            <Field v-model="keyword" placeholder="输入学校、商务楼、地址" />
          </CellGroup>
          <div style="margin: 16px;">
            <Button block type="primary" native-type="submit">
              提交
            </Button>
          </div>
        </Form>
      </section>
      <section class="location-list" v-show="list.length !== 0">
        <ul>
          <li v-for="(location, index) in list" :key="index" @click="jumpToMain(location)">
            <label>{{location.name}}</label>
            <span>{{location.address}}</span>
          </li>
        </ul>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { Field, CellGroup, Form, Button } from 'vant'
import Header from '@/components/header/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { ILocation } from '@/interface'
import request from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Search',
  components: { Header, Form, Field, CellGroup, Button },
  setup () {
    const data = reactive({
      keyword: '',
      list: [],
      city: {}
    })
    const { params } = useRoute() // params.id
    const router = useRouter()
    const store = useStore()

    onMounted(async () => {
      // 请求得到当前城市地址
      const result = await request(`/api/v1/cities/${params.id}`, 'get')
      data.city = result.data
    })

    // 提交按钮
    const onSubmit = async (keyword: string):Promise<void> => {
      // console.log(keyWord)
      const response = await request('/api/v1/pois', 'get', { type: 'search', city_id: params.id, keyword })
      if (response.status === 200) {
        data.list = response.data
      }
      // console.log({ ...data })
    }

    // 路由跳转按钮
    const jumpToMain = (location: ILocation) => {
      store.dispatch('recordGeoHash', location.geohash)
      // console.log(location)
      router.push({
        path: '/main/msite',
        query: {
          geohash: location.geohash
        }
      })
    }

    return { onSubmit, ...toRefs(data), jumpToMain }
  }
})
</script>

<style lang="less" scoped>
.search{
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .arrowLeft{
    font-size: .25rem;
  }
  .city-name{
    font-size: .2rem;
    font-weight: 700;
  }
  .body-content{
    overflow: auto;
      .search-body{
        height: 1.15rem;
        background: #fff;
        margin-top: .1rem;
      }
      .location-list{
        margin-top: .1rem;
        background-color: #fff;
        ul li{
          height: .6rem;
          display: flex;
          flex-direction: column;
          border-bottom: .01rem solid #e4e4e4;
          padding-left: .15rem;
          label{
            font-size: .15rem;
            color: #333;
            flex: 1;
            line-height: .3rem;
          }
          span{
            font-size: .12rem;
            color: #999;
            flex: 1;
            line-height: .3rem;
          }
        }
      }
  }
}
</style>

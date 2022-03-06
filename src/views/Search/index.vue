<template>
  <div class="search">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft"></i></span></template>
      <template v-slot:center><span class="city-name">{{selectCity}}</span></template>
      <template v-slot:right><span>切换城市</span></template>
    </Header>
    <div class="body-content">
      <section class="search-body">
        <Form @submit="onSubmit(data.keyword)">
          <CellGroup>
            <Field v-model="data.keyword" placeholder="输入学校、商务楼、地址" />
          </CellGroup>
          <div style="margin: 16px;">
            <Button block type="primary" native-type="submit">
              提交
            </Button>
          </div>
        </Form>
      </section>
      <section class="location-list" v-show="data.list.length !== 0">
        <ul>
          <li v-for="(location, index) in data.list" :key="index" @click="jumpToMain(location)">
            <label>{{location.name}}</label>
            <span>{{location.address}}</span>
          </li>
        </ul>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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
      list: []
    })
    const { params, query } = useRoute() // params.id
    const selectCity = query.name
    const router = useRouter()
    const store = useStore()

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
          name: location.name, geohash: location.geohash
        }
      })
    }

    return { onSubmit, data, selectCity, jumpToMain }
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

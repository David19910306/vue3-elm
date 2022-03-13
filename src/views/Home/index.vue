<template>
  <div class="home">
    <Header>
      <template v-slot:left><span>ele.me</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <div class="body-container">
      <section class="location">
      <ul>
        <li><span>当前定位城市：</span><span>定位不准时，请在城市列表中选择</span></li>
        <li><span @click="clickHandler(city.location)">{{city.location.name}}</span><span><i class="iconfont icon-fangxiang-you"></i></span></li>
      </ul>
      </section>
      <section class="cities">
        <h4 class="title">热门城市</h4>
        <div class="city hot">
          <span @click="clickHandler(city)" v-for="city in city.hot" :key="city.id">{{city.name}}</span>
        </div>
      </section>
      <section class="cities" v-for="(group, index) in city.group" :key="group">
        <h4 class="title">{{`${Object.getOwnPropertyNames(group)} ${index === 0? '(按字母排序)': ''}`}}</h4>
        <div class="city">
          <span @click="clickHandler(city)" v-for="city in group[Object.getOwnPropertyNames(group)]" :key="city.id">{{city.name}}</span>
        </div>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import httpRequest from '@/api'
import Header from '@/components/header/index.vue'
import { Router, useRouter } from 'vue-router'
import { ICity } from '@/interface'

export default defineComponent({
  name: 'Home',
  components: { Header },
  setup () {
    const city = reactive({
      location: {},
      hot: [],
      group: [{ }]
    })
    const router:Router = useRouter()

    // 路由跳转
    const clickHandler = (selectCity:ICity):void => {
      // console.log(selectCity, router)
      router.push({
        path: `/search/${selectCity.id}`,
        query: {
          name: selectCity.name
        }
      })
    }

    // 组件挂载之后即可请求后台数据
    onMounted(async () => {
      const location = await httpRequest('https://elm.cangdu.org/v1/cities', 'get', { type: 'guess' })
      const hot = await httpRequest('/api/v1/cities', 'get', { type: 'hot' })
      const group = await httpRequest('/api/v1/cities', 'get', { type: 'group' })
      // console.log(location, hot, group)
      if (location.status === 200 && hot.status === 200 && group.status === 200) {
        city.location = location.data
        city.hot = hot.data
        city.group = Object.getOwnPropertyNames(group.data).sort().map(cityGroup => ({ [cityGroup]: group.data[cityGroup] }))
      }
    })

    return { city, clickHandler }
  }
})
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  .body-container{
    overflow: auto;
    background-color: #f5f5f5;
    section:last-child{
      margin-bottom: 0;
    }
    .location{
      height: .918rem;
      background-color: #fff;
      margin-bottom: .15rem;
      ul{
        height: 100%;
        li{
          height: 50%;
          display: flex;
          justify-content: space-between;
          font-size: .12rem;
          line-height: .459rem;
          padding: 0 .1rem;
          span:first-child{
            color: #666;
          }
          span:last-child{
            color: #9f9f9f;
            font-weight: 900;
          }
        }
        li:last-child{
          border-top: .01rem solid #e4e4e4;
          border-bottom: .02rem solid #e4e4e4;
          span:first-child{
            color: #3190e8;
            font: .2rem/.459rem Microsoft YaHei;
          }
          span:last-child{
            i{font-size: .2rem;}
          }
        }
      }
    }
    .cities{
      // height: 1.23rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      margin-bottom: .15rem;
      .title{
        color: #666;
        font-size: .13rem;
        height: .3698rem;
        line-height: .3698rem;
        padding-left: .15rem;
        border-top: .02rem solid #e4e4e4;
        border-bottom: .01rem solid #e4e4e4;
      }
      .city{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        span{
          border-bottom: .001rem solid #e4e4e4;
          border-right: .001rem solid #e4e4e4;
          text-align: center;
          color: #666;
          font-size: .14rem;
          height: .41rem;
          width: 24.85%;
          line-height: .41rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .hot span{
        color: #3190e8;
      }
    }
  }

}
</style>

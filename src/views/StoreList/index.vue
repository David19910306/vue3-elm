<template>
  <div class="store-list-container">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo leftIcon"></i></span></template>
      <template v-slot:center><span class="title">{{title}}</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <ConfigProvider :theme-vars="themeVar">
      <DropdownMenu>
        <DropdownItem :title="`${title}`">
          <section class="type">
            <section class="foodType">
              <ul>
                <li v-for="specs in state.category" :key="specs.id" @click="clickItem(specs)" :class="{activeCurrent: state.clickItemId === specs.id}">
                  <span class="specs">
                    <img :src="`${specs.image_url === ''? 'https://elm.cangdu.org/img/default.jpg': `https://fuss10.elemecdn.com/${specs.image_url.substring(0,1)}/${specs.image_url.substring(1,3)}/${specs.image_url.substring(3)}.${specs.image_url.includes('png')? 'png': 'jpeg'}`}`" alt="icon"/>
                    <label>{{specs.name}}</label>
                  </span>
                  <span class="count">
                    <Tag rond color="#ccc" round>{{specs.count}}</Tag>
                    <span class="iconfont icon-fangxiang-you" :style="{'vertical-align': 'middle', 'margin-left': '.05rem'}"></span>
                  </span>
                </li>
              </ul>
            </section>
            <section class="foodName">
              <ul>
                <li v-for="sub_specs in state.sub_categories" :key="sub_specs.id" @click="clickSubSpecs(sub_specs.id)" :class="{active: state.subItemId === sub_specs.id}">
                  <template v-if="sub_specs.count > 0">
                    <span>{{sub_specs.name}}</span>
                    <span>{{sub_specs.count}}</span>
                  </template>
                </li>
              </ul>
            </section>
          </section>
        </DropdownItem>
        <DropdownItem title="排序">
          <section class="sort">
            <ul>
              <li>
                <span class="iconfont icon-paixu" style="font-size: .18rem;color: #3B87C8"></span>
                <p><span>智能排序</span></p>
              </li>
              <li>
                <span class="iconfont icon-position-o" style="font-size: .18rem;color: #2A9BD3"></span>
                <p><span>距离最近</span></p>
              </li>
              <li>
                <span class="iconfont icon-redu" style="font-size: .18rem;color: #F09B9B"></span>
                <p><span>销量最高</span></p>
              </li>
              <li>
                <span class="iconfont icon-jiage" style="font-size: .18rem;color: #E6B61A"></span>
                <p><span>起送价最低</span></p>
              </li>
              <li>
                <span class="iconfont icon-shijian-xianxing" style="font-size: .18rem;color: #37C7B7"></span>
                <p><span>配送速度最快</span></p>
              </li>
              <li>
                <span class="iconfont icon-pingfen1" style="font-size: .18rem;color: #EBA53B"></span>
                <p><span>评分最高</span></p>
              </li>
            </ul>
          </section>
        </DropdownItem>
        <DropdownItem title="筛选">
          <section class="filter">
            <section class="send">
              <header>配送方式</header>
              <ClickSpan unique="single" label="蜂鸟转送" iconfontClass="icon-fengniaopaotui" color="#0089CF" @getGroupSelect="getGroupSelect"></ClickSpan>
            </section>
            <section class="options">
              <header>商家属性（可以多选）</header>
              <section class="body">
                <ClickSpan unique="brand" label="品牌商家" iconfontClass="icon-pin2" color="#3FBDE6" @getGroupSelect="getGroupSelect"></ClickSpan>
                <ClickSpan unique="food" label="外卖保" iconfontClass="icon-servicebaoshuicang" color="#999" @getGroupSelect="getGroupSelect"></ClickSpan>
                <ClickSpan unique="ontime" label="准时达" iconfontClass="icon-zhunshida" color="#57A9FF" @getGroupSelect="getGroupSelect"></ClickSpan>
                <ClickSpan unique="new" label="新店" iconfontClass="icon-xin" color="#E8842D" @getGroupSelect="getGroupSelect"></ClickSpan>
                <ClickSpan unique="online" label="在线支付" iconfontClass="icon-zhifuzhongxin" color="#FF4E00" @getGroupSelect="getGroupSelect"></ClickSpan>
                <ClickSpan unique="check" label="开发票" iconfontClass="icon-tianmaohuopiaotongxing" color="#999" @getGroupSelect="getGroupSelect"></ClickSpan>
              </section>
            </section>
            <section class="footer">
              <Button color="#333" plain type="primary" style="width: 45%; border: none;font-size:.18rem;border-radius:.05rem;">清空</Button>
              <Button color="#56d176" type="primary" style="width: 45%;font-size:.18rem;border-radius:.05rem;">
                {{finalSelectChecked.length > 0? `确定 (${finalSelectChecked.length})`: `确定`}}
              </Button>
            </section>
          </section>
        </DropdownItem>
      </DropdownMenu>
    </ConfigProvider>
    <section class="storelist">
      <ListItem v-for="listItem in state.shop" :key="listItem.id" :list="listItem"></ListItem>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { DropdownMenu, DropdownItem, ConfigProvider, Tag, Button } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import ClickSpan from '@/components/clickSpan/index.vue'
import { useRoute } from 'vue-router'
import ListItem from '@/components/listItem/index.vue'

export default defineComponent({
  components: { ClickSpan, Header, DropdownMenu, DropdownItem, ConfigProvider, Tag, Button, ListItem },
  setup () {
    // 配置下拉框的样式
    const themeVar = {
      dropdownMenuHeight: '.4rem',
      dropdownMenuTitleFontSize: '.12rem',
      dropdownMenuTitleActiveTextColor: '#3190e8',
      CheckboxLabelMargin: '0'
    }
    const state = reactive({
      category: [],
      sub_categories: [],
      clickItemId: 0,
      subItemId: 0,
      shop: []
    })
    const myFinal: string [] = []
    const finalSelectChecked = ref(myFinal) // 最终选择的选项
    const store = useStore()
    const route = useRoute() // 接收路由传过来的参数
    // eslint-disable-next-line camelcase
    const { geohash, restaurant_category_id, title } = route.query
    const [latitude, longitude] = store.getters.getGeoHash.split(',')
    onMounted(async () => {
      const category = await httpRequest('/api/shopping/v2/restaurant/category', 'get', { latitude, longitude })
      const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
      if (category.status === 200 && shop.status === 200) {
        state.category = category.data
        state.shop = shop.data
      }
    })
    // category点击事件
    // eslint-disable-next-line camelcase
    const clickItem = (specs: {id: number, sub_categories: [] }) => {
      state.clickItemId = specs.id
      state.sub_categories = specs.sub_categories
    }
    const clickSubSpecs = (id: number) => {
      state.subItemId = id
    }
    // 从子组件传过来的事件
    const getGroupSelect = (unique:string) => {
      !unique.includes('delete') ? finalSelectChecked.value.push(unique) : finalSelectChecked.value = finalSelectChecked.value.filter(select => select !== unique.split(',')[0])
    }

    return { themeVar, state, clickItem, clickSubSpecs, getGroupSelect, finalSelectChecked, geohash, restaurant_category_id, title }
  }
})
</script>

<style lang="less" scoped>
.store-list-container{
  height: 100%;
  .leftIcon{
    font-size: .23rem;
    font-weight: bolder;
  }
  .title{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .type{
    height: 3.6rem;
    width: 100%;
    display: flex;
    .foodType{
      width: 50%;
      background-color: #f1f1f1;
      overflow-y: auto;
      ul li{
        padding: 0 .12rem;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .specs{
          color: #333;
          font-size: .12rem;
          line-height: .4rem;
          img{
            width: .18rem;
            height: .18rem;
            margin-right: .1rem;
            vertical-align: middle;
          }
        }
        .count{
          font-size: .12rem;
        }
        &.activeCurrent{
          background-color: #fff;
        }
      }
    }
    .foodName{
      flex: 1;
      overflow-y: auto;
      background-color: #fff;
      ul li{
        padding: 0 .12rem;
        display: flex;
        justify-content:space-between;
        border-bottom: .005rem solid #e4e4e4;
        color:#666;
        font-size: .13rem;
        line-height: .4rem;
        &.active{
          color: #3190e8;
        }
      }
    }
  }
  .sort{
    background-color: #fff;
    ul li{
      display: flex;
      height: .55rem;
      span{
        width: .5rem;
        text-align: center;
        line-height: .55rem;
      }
      p {
        flex: 1;
        line-height: .55rem;
        text-align: left;
        border-bottom: 0.005rem solid #e4e4e4;
        font-size: .13rem;
        color: #555;
      }
    }
  }
  .filter{
    display: flex;
    flex-direction: column;
    min-height: 2.55rem;
    .send{
      margin-left: .12rem;
      margin-bottom: .07rem;
      header {
        font-size: .12rem;
        color: #333;
        line-height: .35rem;
        height: .35rem;
        text-align: left;
        background-color: #fff;
      }
      span{
        border: .0005rem solid #eee;
        border-radius: .05rem;
        padding: .05rem .1rem;
        width: .8rem;
        display: flex;
        align-items: center;
        i{
          font-size: .2rem;
          margin-right: .05rem;
        }
        label {
          font-size: .12rem;
          vertical-align: middle;
          flex: 1;
        }
      }
    }
    .options{
      margin-left: .12rem;
      min-height: 1.25rem;
      display: flex;
      flex-direction: column;
      header {
        font-size: .12rem;
        color: #333;
        line-height: .35rem;
        height: .35rem;
        text-align: left;
        background-color: #fff;
      }
      .body{
        display: flex;
        justify-content:space-around;
        flex-wrap: wrap;
        flex: 1;
        align-content: space-evenly;
        span{
          border: .0005rem solid #eee;
          border-radius: .05rem;
          padding: .05rem .1rem;
          width: .8rem;
          display: flex;
          align-items: center;
          i{
            font-size: .2rem;
            margin-right: .05rem;
          }
          label {
            font-size: .12rem;
            vertical-align: middle;
            flex: 1;
          }
        }
      }
    }
    .footer{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content:space-around;
      background-color: #f1f1f1;
    }
  }
  .activeLabel{
    color: #3E90E8;
  }
  .storelist{
    height: 100%;
    overflow-y: auto;
  }
}
</style>

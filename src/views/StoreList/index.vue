<template>
  <div class="store-list-container">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo leftIcon"></i></span></template>
      <template v-slot:center><span class="title">{{title}}</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <ConfigProvider :theme-vars="themeVar">
      <DropdownMenu>
        <DropdownItem :title="`${title}`" ref="dropDownItemType">
          <section class="type">
            <section class="foodType">
              <ul>
                <li v-for="specs in category" :key="specs.id" @click="clickItem(specs)" :class="{activeCurrent: clickItemId === specs.id}">
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
                <li v-for="sub_specs in sub_categories" :key="sub_specs.id" @click="clickSubSpecs(sub_specs.id)" :class="{active: subItemId === sub_specs.id}">
                  <template v-if="sub_specs.count > 0">
                    <span>{{sub_specs.name}}</span>
                    <span>{{sub_specs.count}}</span>
                  </template>
                </li>
              </ul>
            </section>
          </section>
        </DropdownItem>
        <DropdownItem title="排序" ref="dropDownItemSort">
          <section class="sort">
            <ul>
              <li v-for="(option, index) in optionsSort" :key="index" @click="clickItemHangler(option.order)">
                <span :class="`iconfont ${option.value}`" :style="{fontSize: '.18rem',color: option.color}"></span>
                <p>
                  <span>{{option.text}}</span>
                  <Icon name="success" color="#1989fa" size="20" :style="{position: 'absolute', right: '.2rem', lineHeight: '.55rem', display: currentOrder === option.order? '': 'none'}"/>
                </p>
              </li>
            </ul>
          </section>
        </DropdownItem>
        <DropdownItem title="筛选" ref="dropDownItemFilter">
          <section class="filter">
            <section class="send">
              <header>配送方式</header>
              <ClickSpan :selectArray="finalSelectChecked" unique="single" label="蜂鸟转送" iconfontClass="icon-fengniaopaotui" color="#0089CF" @getGroupSelect="getGroupSelect"></ClickSpan>
            </section>
            <section class="options">
              <header>商家属性（可以多选）</header>
              <section class="body">
                <ClickSpan :selectArray="finalSelectChecked" v-for="(span, index) in clickSpans" :key="index" :iconfontClass="span.iconfontClass" :unique="span.unique" :label="span.label" :color="span.color" @getGroupSelect="getGroupSelect"/>
              </section>
            </section>
            <section class="footer">
              <Button color="#333" plain type="primary" style="width: 45%; border: none;font-size:.18rem;border-radius:.05rem;" @click="cancelClickHandler">清空</Button>
              <Button color="#56d176" type="primary" style="width: 45%;font-size:.18rem;border-radius:.05rem;" @click="okClickHandler">
                {{finalSelectChecked.length > 0? `确定 (${finalSelectChecked.length})`: `确定`}}
              </Button>
            </section>
          </section>
        </DropdownItem>
      </DropdownMenu>
    </ConfigProvider>
    <section class="storelist">
      <ListItem v-for="listItem in shop" :key="listItem.id" :list="listItem"></ListItem>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, Ref } from 'vue'
import { DropdownMenu, DropdownItem, ConfigProvider, Tag, Button, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import ClickSpan from '@/components/clickSpan/index.vue'
import { useRoute } from 'vue-router'
import ListItem from '@/components/listItem/index.vue'
import useRequest from '@/hook/storelist'
// import { IResult } from '@/interface'

export default defineComponent({
  components: { ClickSpan, Header, DropdownMenu, DropdownItem, ConfigProvider, Tag, Button, ListItem, Icon },
  setup () {
    const dropDownItemType = ref<any>(null)
    const dropDownItemSort = ref<any>(null)
    const dropDownItemFilter = ref<any>(null)
    const optionsSort = [
      { value: 'icon-paixu', text: '智能排序', color: '#3B87C8', order: 0 },
      { value: 'icon-position-o', text: '距离最近', color: '#2A9BD3', order: 5 },
      { value: 'icon-redu', text: '销量最高', color: '#F09B9B', order: 6 },
      { value: 'icon-jiage', text: '起送价最低', color: '#E6B61A', order: 1 },
      { value: 'icon-shijian-xianxing', text: '配送速度最快', color: '#37C7B7', order: 2 },
      { value: 'icon-pingfen1', text: '评分最高', color: '#EBA53B', order: 3 }
    ]
    const clickSpans = [
      { unique: 'brand', label: '品牌商家', iconfontClass: 'icon-pin2', color: '#3FBDE6' },
      { unique: 'food', label: '外卖保', iconfontClass: 'icon-servicebaoshuicang', color: '#999' },
      { unique: 'ontime', label: '准时达', iconfontClass: 'icon-zhunshida', color: '#57A9FF' },
      { unique: 'new', label: '新店', iconfontClass: 'icon-xin', color: '#E8842D' },
      { unique: 'online', label: '在线支付', iconfontClass: 'icon-zhifuzhongxin', color: '#FF4E00' },
      { unique: 'check', label: '开发票', iconfontClass: 'icon-tianmaohuopiaotongxing', color: '#999' }
    ]
    // 配置下拉框的样式
    const themeVar = {
      dropdownMenuHeight: '.4rem',
      dropdownMenuTitleFontSize: '.12rem',
      dropdownMenuTitleActiveTextColor: '#3190e8',
      CheckboxLabelMargin: '0'
    }
    const state = reactive({
      category: [],
      sub_categories: [] as any[],
      clickItemId: 0,
      subItemId: 0,
      shop: [],
      title: '', // 显示的标题
      currentOrder: 0 // 排序界面当前的order
    })

    const myFinal: string [] = []
    const finalSelectChecked = ref(myFinal) // 最终选择的选项
    const store = useStore()
    const route = useRoute() // 接收路由传过来的参数
    // eslint-disable-next-line camelcase
    const { geohash, restaurant_category_id, title } = route.query
    state.title = title as string
    const [latitude, longitude] = store.getters.getGeoHash.split(',')
    onMounted(async () => {
      const { requestResult } = await useRequest(latitude, longitude).onMountedRequest()
      // const category = await httpRequest('/api/shopping/v2/restaurant/category', 'get', { latitude, longitude })
      // const shop = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0 })
      // if (category.status === 200 && shop.status === 200) {
      state.category = requestResult.category
      state.shop = requestResult.shop
      // }
    })
    // category点击事件
    // eslint-disable-next-line camelcase
    const clickItem = (specs: {id: number, sub_categories: [] }) => {
      state.clickItemId = specs.id
      state.sub_categories = specs.sub_categories
    }
    const clickSubSpecs = async (id: number) => {
      state.subItemId = id
      // 请求后台数据
      try {
        // const result = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0, limit: 20, restaurant_category_ids: [id] })
        const { requestResult } = await useRequest(latitude, longitude).filterBySpecs(id)
        state.shop = requestResult.shop
      } catch (e) {
        console.log(e)
      }

      state.title = state.sub_categories.find(sub => sub.id === id).name
      dropDownItemType.value && dropDownItemType.value.toggle()
    }
    // 从子组件传过来的事件
    const getGroupSelect = (unique:string) => {
      !unique.includes('delete') ? finalSelectChecked.value.push(unique) : finalSelectChecked.value = finalSelectChecked.value.filter(select => select !== unique.split(',')[0])
    }

    // 排序界面点击事件
    const clickItemHangler = async (order: number) => {
      state.currentOrder = order

      // const result = await httpRequest('/api/shopping/restaurants', 'get', { latitude, longitude, offset: 0, limit: 20, order_by: order })
      // state.shop = result.data
      const { requestResult } = await useRequest(latitude, longitude).filterBySorts(order)
      state.shop = requestResult.shop
      dropDownItemSort.value && dropDownItemSort.value.toggle()
    }

    // 确定按钮点击事件
    const okClickHandler = async () => {
      // console.log('ok')
      console.log(finalSelectChecked.value)
      // eslint-disable-next-line camelcase
      const delivery_mode = finalSelectChecked.value.find(check => check === 'single') ? [1] : []
      // eslint-disable-next-line camelcase
      const support_ids = finalSelectChecked.value.reduce((acc:any, curr) => {
        return curr === 'brand' ? [8, ...acc] : curr === 'food' ? [7, ...acc] : curr === 'ontime' ? [9, ...acc]
          : curr === 'new' ? [5, ...acc] : curr === 'online' ? [3, ...acc] : curr === 'check' ? [4, ...acc] : [...acc]
      }, [])
      // console.log(support_ids)
      // eslint-disable-next-line camelcase
      const { requestResult } = await useRequest(latitude, longitude).filterByCondition(delivery_mode as [], support_ids)
      state.shop = requestResult.shop
      dropDownItemFilter.value && dropDownItemFilter.value.toggle()
    }

    // 取消按钮事件
    const cancelClickHandler = () => {
      finalSelectChecked.value = []
      dropDownItemFilter.value && dropDownItemFilter.value.toggle()
    }

    return {
      themeVar,
      ...toRefs(state),
      // shop,
      // category,
      clickItem,
      clickSubSpecs,
      getGroupSelect,
      finalSelectChecked,
      geohash,
      restaurant_category_id,
      dropDownItemType,
      dropDownItemSort,
      optionsSort,
      clickSpans,
      clickItemHangler,
      dropDownItemFilter,
      okClickHandler,
      cancelClickHandler
    }
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

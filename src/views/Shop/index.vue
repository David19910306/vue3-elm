<template>
  <section class="food-list-container">
    <nav @click="goBack"><span class="iconfont icon-fangxiang-zuo"></span></nav>
    <header class="shop-header-detail">
      <div class="header-cover-img-con">
        <img :src="`https://elm.cangdu.org/img/${restaurantInfo.image_path}`" alt="coverImage" class="header-cover-img">
      </div>
      <section class="description-header">
        <router-link class="description-top" to="/">
          <section class="description-left">
            <img :src="`https://elm.cangdu.org/img/${restaurantInfo.image_path}`">
          </section>
          <section class="description-right">
            <h4 class="description-title ellipsis">{{restaurantInfo.name}}</h4>
            <p class="description-text">商家配送／分钟送达／{{restaurantInfo.piecewise_agent_fee.tips}}</p>
            <p class="description-promotion ellipsis">公告：{{restaurantInfo.promotion_info}}</p>
          </section>
          <span class="iconfont icon-fangxiang-you goForward"></span>
        </router-link>
        <footer class="description-footer" v-if="restaurantInfo.activities.length > 0">
          <p class="ellipsis">
            <Tag type="danger">减</Tag>
            <span>满30减5，满60减8（APP专享）</span>
          </p>
          <p>1个活动</p>
          <span class="iconfont icon-fangxiang-you goForActivity"></span>
        </footer>
      </section>
    </header>
    <section class="shop-detail-message">
      <ConfigProvider :theme-vars="themeVars" style="height: 100%;">
        <Tabs v-model:active="currentTab" border type="line" style="height: 100%;">
          <Tab title="商品" style="height: 100%;">
            <!-- <section class="good-tag-lists"> -->
              <section class="good-list-content">
                <Sidebar v-model="currentBar">
                  <sidebar-item v-for="menu in menus" :key="menu.id" :title="menu.name"></sidebar-item>
                </Sidebar>
                <section class="good-lists">
                  <ul>
                    <li v-for="item in menus" :key="item.id">
                      <header class="menu-detail-header">
                        <section class="menu-title">
                          <strong>{{item.name}}</strong>
                          <span>{{item.description}}</span>
                        </section>
                        <Icon name="ellipsis" size="15" color="#969696"/>
                      </header>
                      <menu-detail-list v-for="list in item.foods" :key="list.item_id" :food="list"></menu-detail-list>
                    </li>
                  </ul>
                </section>
              </section>
            <!-- </section> -->
            <footer class="cart-content">
              <section class="cart-icon">
                <section class="cart-container">
                  <i class="iconfont icon-gouwuche"></i>
                </section>
                <section class="show-money">
                  <span>￥ 0.00</span>
                  <span>配送费￥5</span>
                </section>
              </section>
              <section class="goto-pay">
                <span>还差20元起送</span>
                <!-- <span>去结算</span> -->
              </section>
            </footer>
          </Tab>
          <Tab title="评价">评价</Tab>
        </Tabs>
      </ConfigProvider>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Tag, Tab, Tabs, ConfigProvider, Sidebar, SidebarItem, Icon } from 'vant'
import MenuDetailList from '@/components/menuDetailList/index.vue'
import useFetchRequest from '@/hook/shop/useFetch'
import { useRoute, useRouter } from 'vue-router'
import { IFetchResult } from '@/interface'

export default defineComponent({
  components: { Tag, Tab, Tabs, ConfigProvider, Sidebar, SidebarItem, Icon, MenuDetailList },
  setup () {
    // 样式设置
    const themeVars = {
      tabTextColor: '#666',
      tabActiveTextColor: '#3190e8',
      tabsBottomBarColor: '#3190e8',
      sidebarSelectedBorderColor: '#3190e8',
      sidebarSelectedBorderHeight: '100%',
      sidebarSelectedTextColor: '#666',
      sidebarSelectedFontWeight: '700',
      sidebarBackgroundColor: '#f5f5f5'
    }
    const currentTab = ref(0)
    const currentBar = ref(0)

    const route = useRoute() // 当前路由对象
    const router = useRouter() // 路由跳转对象
    const { id } = route.params

    const state:IFetchResult = reactive({
      restaurantInfo: {
        activities: [],
        piecewise_agent_fee: {}
      },
      menus: []
    })

    // 回退到上一步
    const goBack = () => {
      router.go(-1)
    }

    // 获取餐馆详情
    onMounted(async () => {
      const { restaurantInfo, menus } = await useFetchRequest({ shopId: id, restaurant_id: id })
      // console.log(restaurantInfo, menus)
      //   const { restaurantInfo } = await useFetchRequest().fetchRestaurantInfo(id)
      //   const { menus } = await useFetchRequest().getMenus(restaurantInfo.value.id)
      //   console.log(menus)
      state.restaurantInfo = restaurantInfo.value
      state.menus = menus.value
    })
    return { currentTab, themeVars, currentBar, goBack, ...toRefs(state) }
  }
})
</script>

<style lang="less">
.food-list-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  nav {
    position: fixed;
    width: 100%;
    z-index: 11;
    height: .3rem;
    span{
      font-size: .25rem;
      color: #fff;
    }
  }
  .shop-header-detail{
    position: relative;
    .header-cover-img-con{
      height: 100%;
      overflow: hidden;
      position: absolute;
      width: 100%;
      .header-cover-img{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        filter: blur(10px);
      }
    }
    .description-header{
      position: relative;
      z-index: 10;
      background-color: rgba(119,103,137,.43);
      padding: 0.1rem 0 0.1rem 0.1rem;
      width: 100%;
      overflow: hidden;
      .description-top{
        display: flex;
        .description-left{
          margin-right: .05rem;
          img{
            width: .67rem;
            height: .67rem;
            display: block;
            border-radius: .05rem;
          }
        }
        .description-right{
          flex: 1;
          .description-title{
            font-size: .18rem;
            color: #fff;
            font-weight: 600;
            width: 100%;
            margin-bottom: .1rem;
          }
          .description-text{
            font-size: .12rem;
            color:#fff;
            margin-bottom: .1rem;
          }
          .description-promotion{
            font-size: .12rem;
            color: #fff;
            width: 2.7rem;
          }
          .ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .goForward{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0.1rem;
          z-index: 11;
          color: #fff;
          font-size: .25rem;
        }
      }
      .description-footer{
        display: flex;
        justify-content: space-between;
        margin-top: .1rem;
        padding-right: .15rem;
        align-items: center;
        p{
          font-size: .12rem;
          color: #fff;
          span:first-child{
            margin-right: .1rem;
          }
        }
        .ellipsis{
          width: 80%;
        }
        .goForActivity{
          color: #fff;
        }
      }
    }
  }
  .shop-detail-message{
    overflow-y: auto;
    flex: 1;
    .van-tabs__content{
      height: calc(100% - 0.44rem);
    }
    // .good-tag-lists{
      // display: flex;
      // flex-direction: column;
      .good-list-content{
        display: flex;
        flex: 1;
        height: calc(100% - 0.49rem);
        background-color: #f5f5f5;
        .good-lists{
          background-color: #f5f5f5;
          overflow-y: auto;
          flex: 1;
          .menu-detail-header{
            display: flex;
            justify-content: space-between;
            padding: .09rem;
            align-items: center;
            .menu-title{
              width: 11rem;
              white-space: nowrap;
              overflow: hidden;
              strong{
                font-size: .16rem;
                color: #666;
                font-weight: 700;
                margin-right: .08rem;
              }
              span{
                font-size: .12rem;
                color: #999;
                width: 30%;
                overflow: hidden;
              }
            }
          }
        }
      }
    // }
    .cart-content{
      height: .49rem;
      position: absolute;
      background-color: #3d3d3f;
      bottom: 0;
      left: 0;
      z-index: 13;
      display: flex;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .cart-icon{
        // margin-left: .2rem;
        .cart-container{
          display: flex;
          background-color: #3d3d3d;
          position: absolute;
          padding: .1rem;
          border: .05rem solid #444;
          border-radius: 50%;
          left: .2rem;
          top: -0.25rem;
          i{
            color: #fff;
            font-size: .3rem;
          }
        }
        .show-money{
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          left: .8rem;
          color: #fff;
          height: 100%;
          margin-left: .02rem;
          span:first-child{
            font-size: .18rem;
            font-weight: 700;
          }
          span:last-child{
            font-size: .12rem;
          }
        }
      }
      .goto-pay{
        background-color: #535356;//#4cd964;
        height: 100%;
        width: 1.17rem;
        text-align: center;
        text-align: center;
        span{
          font-size: .15rem;
          color: #fff;
          font-weight: 700;
          line-height: .49rem;
        }
      }
    }
  }
}
</style>

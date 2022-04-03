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
                  <sidebar-item v-for="menu in menus" :key="menu.id" :title="menu.name"
                    :badge="badge[menu.id] && badge[menu.id].reduce((previous, current) => previous + current.foodCount, 0)"></sidebar-item>
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
                <section class="cart-container" @click="cartFoodShow = !cartFoodShow" :style="{'background-color':
                  `${store.state.cartFoods.some(food => food.restaurant_id === parseInt(restaurantId))? '#3190e8': '#3d3d3d'}`}">
                  <span class="cart-list-length" :style="{'display': `${cartFoodsNumber === 0? 'none': ''}`}">{{cartFoodsNumber}}</span>
                  <i class="iconfont icon-gouwuche"></i>
                </section>
                <section class="show-money">
                  <span>￥ {{totalPrice}}</span>
                  <span>配送费￥5</span>
                </section>
              </section>
              <section class="goto-pay" :style="`background-color:
                ${store.state.cartFoods.some(food => food.restaurant_id === parseInt(restaurantId)) && (totalPrice - 20 >= 0)? '#4cd964': '#535356'}`">
                <span v-if="20 - totalPrice > 0">还差{{20 - totalPrice}}元起送</span>
                <span v-else>去结算</span>
              </section>
            </footer>
          </Tab>
          <Tab title="评价">评价</Tab>
        </Tabs>
      </ConfigProvider>
    </section>
  </section>
  <section class="cart-food-list" :style="{'display': `${cartFoodShow && store.state.cartFoods.some(food => food.restaurant_id === parseInt(restaurantId)) ? '': 'none'}`}">
    <header>
      <h4>购物车</h4>
      <div @click="clearCart">
        <Icon name="delete-o" size="15" />
        <span class="clear-cart">清空</span>
      </div>
    </header>
    <section class="cart-food-detail">
      <ul>
        <li class="cart-li" v-for="food in currentResturantCart" :key="food.food_id">
          <div class="cart-list-num">
            <p class="ellipsis">{{food.name}}</p>
            <p class="ellipsis">{{food.specs_name}}</p>
          </div>
          <div class="cart-list-price">
            <span>¥</span>
            <span>{{food.price}}</span>
          </div>
          <section class="cart-list-control">
            <span class="iconfont icon-jianshao" style="color: #3190e8" @click="decreseFood(food.food_id)"></span>
            <span class="cart-num">{{food.foodCount}}</span>
            <span class="iconfont icon-jia" style="color: #3190e8" @click="increseFood(food.food_id)"></span>
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Tag, Tab, Tabs, ConfigProvider, Sidebar, SidebarItem, Icon } from 'vant'
import MenuDetailList from '@/components/menuDetailList/index.vue'
import useFetchRequest from '@/hook/shop/useFetch'
import { addFoodsAtCart, minusFoodAtCart, clearCartById } from '@/hook/cart'
import { useRoute, useRouter } from 'vue-router'
import { IFetchResult } from '@/interface'
import { useStore } from 'vuex'

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
    const restaurantId = ref('0') // 餐馆的id
    const cartFoodShow = ref(false) // 点击显示购物车列表

    const route = useRoute() // 当前路由对象
    const router = useRouter() // 路由跳转对象
    const { id } = route.params
    restaurantId.value = id as string

    const store = useStore()
    // const cartFoods = store.getters.getCartFoods
    const badge = computed(() => {
      return store.state.cartFoods.reduce((acc:Record<string, any>, currentFood:Record<string, any>) => {
        const key = currentFood.category_id
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(currentFood)
        return acc
      }, {})
    })

    const totalPrice = computed(() => {
      const array = store.state.cartFoods.reduce((previous:Record<string, any>[], current:Record<string, any>) => current.restaurant_id === parseInt(restaurantId.value) ? [current, ...previous] : previous, [])
      return array.reduce((previous: number, current: Record<string, any>) => previous + current.price * current.foodCount, 0)
    })

    const cartFoodsNumber = computed(() => {
      return store.state.cartFoods.reduce((previous: number, food:Record<string, any>) => food.restaurant_id === parseInt(restaurantId.value) ? previous + food.foodCount : previous, 0)
    })

    const currentResturantCart = computed(() => {
      return store.state.cartFoods.filter((food:Record<string, any>) => food.restaurant_id === parseInt(restaurantId.value))
    })

    // 购物车中增加按钮
    const increseFood = (foodId: number) => {
      addFoodsAtCart(store, foodId) // 在购物车中直接添加商品
    }

    // 购物车中减少按钮
    const decreseFood = (foodId: number) => {
      minusFoodAtCart(store, foodId) // 在购物车中直接删除商品
    }

    // 清空购物车按钮, 根据餐馆的id
    const clearCart = () => {
      // console.log(restaurantId)
      clearCartById(store, restaurantId.value)
    }

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
    return {
      currentTab,
      themeVars,
      currentBar,
      goBack,
      ...toRefs(state),
      store,
      badge,
      totalPrice,
      restaurantId,
      cartFoodsNumber,
      cartFoodShow,
      currentResturantCart,
      decreseFood,
      increseFood,
      clearCart
    }
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
          // background-color: #3d3d3d;
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
          .cart-list-length{
            position: absolute;
            top: -0.0575rem;
            right: -0.0575rem;
            background-color: #ff461d;
            line-height: .16rem;
            text-align: center;
            border-radius: 50%;
            border: 0.006rem solid #ff461d;
            min-width: 0.16rem;
            height: 0.16rem;
            font-size: .115rem;
            color: #fff;
            font-family: Helvetica Neue,Tahoma,Arial;
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
        // background-color: #535356;//#4cd964;
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

.cart-food-list{
  position: absolute;
  width: 100%;
  padding-bottom: .49rem;
  z-index: 12;
  bottom: 0;
  left: 0;
  background-color: #fff;
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.07rem 0.14rem;
    background-color: #eceff1;
    h4{
      font-size: .164rem;
      color: #666;
    }
    .clear-cart{
      font-size: .14rem;
      color: #666;
    }
  }
  .cart-food-detail{
    background-color: #fff;
    max-height: 4.6rem;
    overflow-y: auto;
    .cart-li{
      display: flex;
      justify-content: space-between;
      padding: 0.14rem 0.117rem;
      align-items: center;
      .cart-list-num{
        width: 55%;
        p:first-child{
          font-size: .16rem;
          color: #666;
          font-weight: 700;
        }
        p:last-child{
          font-size: .12rem;
          color: #666;
        }
      }
      .cart-list-price{
        font-size: 0;
        span:first-child{
          font-size: .14rem;
          color: #f60;
          font-family: Helvetica Neue,Tahoma;
        }
        span:last-child{
          font-size: .16rem;
          color: #f60;
          font-family: Helvetica Neue,Tahoma;
          font-weight: 700;
        }
      }
      .cart-list-control{
        display: flex;
        align-items: center;
        .cart-num{
          font-size: .15rem;
          color: #666;
          min-width: .23rem;
          text-align: center;
          font-family: Helvetica Neue,Tahoma;
        }
      }
    }
  }
}
</style>

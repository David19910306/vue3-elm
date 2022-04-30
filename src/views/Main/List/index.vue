<template>
  <div class="list">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">订单列表</span></template>
    </Header>
    <section class="list-container" v-if="store.state.userId !== 0 && orders.length">
      <ul class="list-ul">
        <li v-for="order in orders" :key="order.id">
          <div class="shop-avatar">
            <img :src="`https://elm.cangdu.org/img/${order.restaurant_image_url}`" />
          </div>
          <div class="list-detail">
            <header class="shop-name">
              <section class="order-name">
                <h4>{{order.restaurant_name}}<i class="iconfont icon-fangxiang-you"></i></h4>
                <p class="order-time">{{order.formatted_created_at}}</p>
              </section>
              <section class="delay" :style="{color: `#${Object.keys(order).length !== 0 && order.status_bar.color}`}">{{Object.keys(order).length !== 0 && order.status_bar.title}}</section>
            </header>
            <section class="order-list-detail">
              <p>{{`${order.basket && order.basket.group[0][0].name} 等${order.basket && order.basket.group.reduce((prev, curr) => prev + curr.length,0)}件商品`}}</p>
              <span class="total-price">
                ￥{{order.basket && order.basket.group.reduce((prev, curr) => prev + curr.reduce((acc, item) => acc + item.price * item.quantity,0),0) + order.basket.deliver_fee.price * order.basket.deliver_fee.quantity + order.basket.packing_fee.price * order.basket.packing_fee.quantity}}
              </span>
            </section>
            <footer class="order-again">
              <Button plain size="mini" color="#3190e8" @click="another(order.restaurant_id)"
                :style="{'--van-button-border-radius': '3px'}" v-if="!countDownFinish" :key="order.id">再来一单</Button>
              <Button plain size="mini" color="#FFA500" :style="{'--van-button-border-radius': '3px'}" v-else :key="order.id">
                <ConfigProvider :theme-vars="themeVars">
                  <CountDown :time="countDown" @finish="countDownFinish = !countDownFinish">
                    <template #default="timeData">
                      <span>去支付(还剩{{ timeData.minutes }}</span>
                      <span>分钟{{ timeData.seconds }}秒)</span>
                    </template>
                  </CountDown>
                </ConfigProvider>
              </Button>
            </footer>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, ref } from 'vue'
import { Button, CountDown, ConfigProvider } from 'vant'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'
import httpRequest from '@/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainList',
  components: { Header, Button, CountDown, ConfigProvider },
  setup () {
    const themeVars = {
      countDownTextColor: '#FFA500'
    }

    const store = useStore()
    const router = useRouter()
    const orders = ref([])

    const countDown = ref(1 * 14 * 60 * 1000)
    const countDownFinish = ref(false) // 对话框默认不打开

    onActivated(async () => {
      // 获取订单列表
      const result = await httpRequest(`/api/bos/v2/users/${store.getters.getUserId}/orders`, 'get', { limit: 10, offset: 0 })
      // console.log(store.getters.getUserId)
      orders.value = result.data
    })

    // 再来一单
    const another = (restaurantId: number) => {
      router.push({ path: `/shop/${restaurantId}` })
      // console.log(restaurantId)
    }

    return { orders, another, store, countDown, countDownFinish, themeVars }
  }
})
</script>

<style lang="less" scoped>
.list{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .list-container{
    overflow-y: auto;
    .list-ul{
      li:last-child{
        margin-bottom: 0;
      }
      li{
        display: flex;
        background-color: #fff;
        padding: .1rem;
        margin-bottom: .1rem;
        .shop-avatar{
          width: .47rem;
          height: .47rem;
          margin-right: .05rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .list-detail{
          flex: 1;
          .shop-name{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding-bottom: .05rem;
            border-bottom: .006rem solid #f5f5f5;
            .order-name{
              h4{
                font-size: .17rem;
                color: #333;
                line-height: .23rem;
                width: 2.1rem;
              }
              .order-time{
                font-size: .13rem;
                color: #999;
                line-height: .18rem;
              }
            }
            .delay{
              font-size: .14rem;
            }
          }
          .order-list-detail{
            display: flex;
            justify-content: space-between;
            line-height: .35rem;
            align-items: center;
            border-bottom: .006rem solid #f5f5f5;
            p{
              font-size: .14rem;
              color: #666;
              width: 2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .total-price{
              font-size: .14rem;
              color: #f60;
              font-weight: 700;
              font-family: Helvetica Neue,Tahoma,Arial;
            }
          }
          .order-again{
            height: .4rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>

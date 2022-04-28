<template>
  <template v-if="route.fullPath.endsWith('chooseAddress') || route.fullPath.endsWith('addAddress') || route.fullPath.includes('remark')">
    <router-view></router-view>
  </template>
  <div class="confirmOrder" v-else>
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">确认订单</span></template>
      <template v-slot:right><span><i class="iconfont icon-31wode user-icon"></i></span></template>
    </Header>
    <section class="order-section">
      <router-link to="/confirmOrder/chooseAddress">
        <div class="add-address-container">
          <div class="address-left">
            <Icon name="location-o" size="0.2rem" color="#3190e8" />
            <p class="add-address" v-if="addresses.length === 0">请添加一个收货地址</p>
            <div class="address-detail-con" v-else>
              <header>
                <span class="name">{{store.state.selectAddress.name || addresses[0].name}}</span>
                <span class="contact">{{`${store.state.selectAddress.sex === 1? '男': '女'} ${store.state.selectAddress.phone}` || `${addresses[0].sex === 1? '男': '女'} ${addresses[0].phone}`}}</span>
              </header>
              <div class="address-detail">
                <Tag :color="`${store.state.selectAddress.tag === '学校'? '#3190e8': store.state.selectAddress.tag === '公司'?
                  '#4cd964': '#ff5722'}`">
                  {{store.state.selectAddress.tag || addresses[0].tag}}</Tag>
                <span class="detail">{{store.state.selectAddress.address_detail  || addresses[0].address_detail}}</span>
              </div>
            </div>
          </div>
          <Icon name="arrow" size="0.15rem" color="#999"/>
        </div>
      </router-link>
      <section class="deliver-model container-style">
        <p class="deliver-label">送达时间</p>
        <section class="deliver-time">
          <p>尽快送达 | 预计 {{checkout.delivery_reach_time}}</p>
          <Tag type="primary">蜂鸟转送</Tag>
        </section>
      </section>
      <section class="pay-way container-style">
        <header class="header-style" @click="show = !show">
          <p>支付方式</p>
          <div class="more-way">
            <span>在线支付</span>
            <Icon name="arrow" size="0.15rem" color="#999"/>
          </div>
        </header>
        <section class="red-packet">
          <p>红包</p>
          <p>暂时只在饿了么APP中支持</p>
        </section>
      </section>
      <section class="order-detail container-style">
        <header class="order-header">
          <img :src="`https://elm.cangdu.org/img/${image_path}`">
          <span>{{restaurantName}}</span>
        </header>
        <ul class="order-ul">
          <li class="food-item-style" v-for="cart in carts.filter(c => c.restaurant_id === parseInt(shopId))" :key="cart.food_id">
            <p class="food-name ellipsis">{{cart.name}}</p>
            <div class="num-price">
              <span>{{`x ${cart.foodCount}`}}</span>
              <span>{{`￥${cart.price}`}}</span>
            </div>
          </li>
        </ul>
        <ul class="order-extra">
          <li class="food-item-style">
            <p class="food-name ellipsis">餐盒</p>
            <span>{{`￥ ${carts.filter(c => c.restaurant_id === parseInt(shopId)).reduce((prev, cart) => prev + cart.packing_fee, 0)}`}}</span>
          </li>
          <li class="food-item-style">
            <p class="food-name ellipsis">配送费</p>
            <span>¥ 5</span>
          </li>
        </ul>
        <div class="food-item-style total-price">
          <p class="food-name ellipsis">订单 {{`￥${totalPrice}`}}</p>
          <div class="num-price">
            <span data-v-4e0d5034="">待支付 {{`￥${totalPrice}`}}</span>
          </div>
        </div>
      </section>
      <section class="pay-way-container container-style">
        <ul class="pay-way-options">
          <router-link :to="`/confirmOrder/remark/${checkout.id}`">
            <li>
              <span>订单备注</span>
              <div class="more-type">
                <span class="ellipsis">口味、偏好等</span>
                <Icon name="arrow" size="0.15rem" color="#999"/>
              </div>
            </li>
          </router-link>
          <li>
            <span>发票抬头</span>
            <div class="more-type">
              <span class="ellipsis">{{checkout.invoice && checkout.invoice.status_text}}</span>
              <Icon name="arrow" size="0.15rem" color="#999"/>
            </div>
          </li>
        </ul>
        </section>
    </section>
    <footer class="order-footer">
      <p>待支付 {{`￥${totalPrice}`}}</p>
      <p>确认下单</p>
    </footer>
  </div>
  <ActionSheet v-model:show="show">
    <header class="actions-header">支付方式</header>
    <section class="action-body">
      <ul class="pay-way-ul">
        <li v-for="payment in checkout.payments" :key="payment.id">
          <span :class="{on: !payment.is_online_payment}">{{payment.is_online_payment? payment.name: `${payment.name}${payment.description}`}}</span>
          <Icon name="checked" :color="`${payment.is_online_payment? '#4cd964': '#eee'}`" size="0.2rem"/>
        </li>
      </ul>
    </section>
  </ActionSheet>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Icon, Tag, ActionSheet, Dialog } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ConfirmOrder',
  components: { Header, Icon, Tag, ActionSheet },
  setup () {
    const store = useStore() // 获取vuex
    const route = useRoute()
    const show = ref(false)
    const state = reactive({
      checkout: {},
      carts: [],
      restaurantName: '',
      image_path: '',
      addresses: []
    })

    const { geohash, shopId } = route.query
    // console.log(route)
    state.restaurantName = store.state.restaurantInfo.name
    state.image_path = store.state.restaurantInfo.image_path
    state.carts = store.state.cartFoods

    const entities = store.state.cartFoods.map((food: Record<string, any>) =>
      ({
        id: food.food_id,
        attrs: [],
        extra: {},
        name: food.name,
        packing_fee: food.packing_fee,
        price: food.price,
        quantity: food.foodCount,
        sku_id: food.sku_id,
        specs: food.specs.length === 0 ? [''] : food.specs.map((spec:Record<string, any>) => spec.value),
        stock: food.stock
      }))

    // console.log(entities)
    onMounted(async () => {
      // 加入购物车,
      const result = await httpRequest('/api/v1/carts/checkout', 'post', undefined,
        { restaurant_id: shopId, geohash, entities: [entities] })

      // 获取地址
      const addresses = await httpRequest(`/api/v1/users/${store.state.userId}/addresses`, 'get')
      state.addresses = addresses.data || []
      const { data } = result
      data.status ? Dialog.alert({ message: data.message }) : state.checkout = data
    })

    const totalPrice = computed(() => {
      return state.carts.filter((c: Record<string, any>) => c.restaurant_id === parseInt(shopId as string)).reduce((prev, curr: Record<string, any>) => prev + curr.price * curr.foodCount, 0) +
        state.carts.filter((c: Record<string, any>) => c.restaurant_id === parseInt(shopId as string)).reduce((prev, cart: Record<string, any>) => prev + cart.packing_fee, 0) + 5
    })

    return { show, ...toRefs(state), totalPrice, route, shopId, store }
  }
})
</script>

<style lang="less" scoped>
.confirmOrder{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .arrowLeft{
    font-size: .25rem;
  }
  .user-icon{
    font-size: .25rem;
    font-weight: bolder;
  }
  .detail-center{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .order-section{
    flex: 1;
    overflow-y: auto;
    .add-address-container{
      min-height: .84rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.14rem;
      background: url('../../assets/image/border.png') 0 100% repeat-x;
      background-color: #fff;
      background-size: auto 0.028rem;
      .address-left{
        display: flex;
        align-items: center;
        .add-address{
          font-size: .164rem;
          color: #333;
          margin-left: .05rem;
        }
        .address-detail-con{
          header{
            font-size: .1523rem;
            color: #333;
            .name{
              color: #333;
              font-size: .1875rem;
              font-weight: 700;
              margin: 0 .05rem;
            }
          }
          .address-detail{
            display: flex;
            margin-left: .05rem;
            margin-top: .05rem;
            .detail{
              font-size: .1289rem;
              color: #777;
              margin-left: .05rem;
            }
          }
        }
      }
    }
    .deliver-model{
      border-left: 0.046rem solid #3190e8;
      min-height: .96rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      .deliver-label{
        font-size: .18rem;
        padding-left: .07rem;
        font-weight: 700;
        color: #333;
      }
      .deliver-time{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p{
          font-size: .16rem;
          color: #3190e8;
          margin-bottom: .11rem;
        }
      }
    }
    .pay-way{
      background-color: #fff;
      .header-style{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: .46rem;
        p{
          font-size: .164rem;
          color: #777;
        }
        .more-way{
          span{
            font-size: .14rem;
            color: #aaa;
          }
        }
      }
      .red-packet{
        display: flex;
        line-height: .46rem;
        justify-content: space-between;
        border-top: 0.008rem solid #f1f1f1;
        p{
          font-size: .14rem;
          color: #aaa;
        }
      }
    }
    .order-detail{
      background-color: #fff;
      .order-header{
        padding: 0.16rem 0;
        border-bottom: 0.008rem solid #f5f5f5;
        img{
          width: .28rem;
          height: .28rem;
        }
        span{
          font-size: .18rem;
          color: #333;
        }
      }
      .order-ul{
        padding-top: .1rem;
        .food-item-style{
          display: flex;
          justify-content: space-between;
          line-height: .4rem;
          padding: 0 0.164rem;
          .food-name{
            width: 2.5rem;
          }
          p{
            font-size: .1523rem;
            color: #666;
          }
          .ellipsis{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .num-price{
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span:first-child{
              color: #f60;
              font-size: .1523rem;
            }
            span:last-child{
              color: #666;
              font-size: .1523rem;
            }
          }
        }
      }
      .order-extra{
        .food-item-style{
          display: flex;
          justify-content: space-between;
          line-height: .4rem;
          padding: 0 0.164rem;
          .food-name{
            width: 2.5rem;
          }
          p{
            font-size: .1523rem;
            color: #666;
          }
          .ellipsis{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          span{
            color: #666;
            font-size: .1523rem;
          }
        }
      }
      .food-item-style{
        display: flex;
        justify-content: space-between;
        line-height: .4rem;
        padding: 0 0.164rem;
        .food-name{
          width: 2.15rem;
        }
        p{
          font-size: .1523rem;
          color: #666;
        }
        .ellipsis{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .num-price{
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            color: #f60;
            font-size: .1523rem;
          }
        }
      }
      .total-price{
        border-top: 0.008rem solid #f5f5f5;
      }
    }
    .pay-way-container{
      background-color: #fff;
      margin-bottom: .25rem;
      .pay-way-options {
        li:last-child{
          border-top: 0.008rem solid #f5f5f5;
        }
        li{
          display: flex;
          justify-content: space-between;
          line-height: .42rem;
          align-items: center;
          span:first-child{
            font-size: .16rem;
            color: #666;
          }
          .more-type {
            display: flex;
            align-items: center;
            span{
              font-size: .14rem;
              color: #aaa;
            }
          }
        }
      }
    }
    .container-style{
      padding: 0 .16rem;
      margin-top: .1rem;
    }
  }
  .order-footer{
    height: .49rem;
    background-color: #3c3c3c;
    display: flex;
    p{
      line-height: .49rem;
      font-size: .18rem;
      color: #fff;
    }
    p:first-child{
      background-color: #3c3c3c;
      flex: 5;
      padding-left: 0.16rem;
    }
    p:last-child{
      flex: 2;
      background-color: #56d176;
      text-align: center;
    }
  }
}
.actions-header{
  background-color: #fafafa;
  font-size: .164rem;
  color: #333;
  text-align: center;
  line-height: .46rem;
}
.action-body{
  height: 1.875rem;
  background-color: #fff;
  .pay-way-ul li{
    padding: 0 .15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: .5rem;
    span{
      color: #333;
      font-size: .1640rem;
    }
    .on{
      font-size: .1640rem;
      color: #ccc;
    }
  }
}
</style>

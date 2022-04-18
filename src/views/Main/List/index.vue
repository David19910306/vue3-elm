<template>
  <div class="list">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">订单列表</span></template>
    </Header>
    <section class="list-container">
      <ul class="list-ul">
        <li>
          <div class="shop-avatar">
            <img src="https://elm.cangdu.org/img/17c4ff59a35100186.png" />
          </div>
          <div class="list-detail">
            <header class="shop-name">
              <section class="order-name">
                <h4>古天杀杀杀1111111111<i class="iconfont icon-fangxiang-you"></i></h4>
                <p class="order-time">2022-04-02 20:03</p>
              </section>
              <section class="delay">支付超时</section>
            </header>
            <section class="order-list-detail">
              <p>水电费 等2件商品</p>
              <span class="total-price">¥3079.00</span>
            </section>
            <footer class="order-again">
              <Button plain size="mini" color="#3190e8"
                :style="{'--van-button-border-radius': '3px'}">再来一单</Button>
            </footer>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'MainList',
  components: { Header, Button },
  setup () {
    console.log('@')
  }
})
</script>

<style lang="less" scoped>
.list{
  height: 100%;
  display: flex;
  flex-direction: column;
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
              color: #333;
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

<template>
  <div class="payment">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">在线支付</span></template>
    </Header>
    <ConfigProvider :theme-vars="themeVars">
      <section class="show-time-amount">
        <header class="pay-time-last">支付剩余时间</header>
        <p class="amount">
          <CountDown :time="countDown" @finish="showDialog = !showDialog; dialogFlag = 'finish'">
            <template #default="timeData">
              <span>{{ timeData.hours }}</span>
              <span> : </span>
              <span>{{ timeData.minutes }}</span>
              <span> : </span>
              <span>{{ timeData.seconds }}</span>
            </template>
          </CountDown>
        </p>
      </section>
      <header class="choose-payment">选择支付方式</header>
      <ul class="payment-ul" @click="choosePayment">
        <li>
          <span class="payway">
            <span class="iconfont icon-zhifubao alipay"></span>
            <p>支付宝</p>
          </span>
          <Icon name="checked" :color="`${currentClickText === '支付宝'? '#4cd964': '#ccc'}`"/>
        </li>
        <li>
          <span class="payway">
            <span class="iconfont icon-wechat-pay wechat"></span>
            <p>微信</p>
          </span>
          <Icon name="checked" :color="`${currentClickText === '微信'? '#4cd964': '#ccc'}`"/>
        </li>
      </ul>
      <Button
        block
        color="#4cd964"
        @click="showDialog = !showDialog; dialogFlag = 'button'"
        style="width: 95%; margin: 0.15rem auto 0; border-radius: 5px; font-size: 0.16rem; font-weight: 700;"
      >
        确认支付
      </Button>
    </ConfigProvider>
  </div>
  <ConfigProvider :theme-vars="themeVars">
    <van-dialog v-model:show="showDialog" confirm-button-color="#000" @confirm="comfirmToPay">
      <section class="dialog">
        <div class="tip_icon"><span></span><span ></span></div>
        <p>{{`${dialogFlag === 'button'? '当前环境无法支付，请打开官方APP进行付款': dialogFlag === 'mounted'? '暂不开发支付功能': '订单支付超时'}`}}</p>
      </section>
    </van-dialog>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { CountDown, ConfigProvider, Icon, Button, Dialog } from 'vant'
import Header from '@/components/header/index.vue'
import router from '@/router'

export default defineComponent({
  name: 'Payment',
  components: { Header, CountDown, ConfigProvider, [Dialog.Component.name]: Dialog.Component, Icon, Button },
  setup () {
    // 自定义样式
    const themeVars = {
      countDownFontSize: '0.3515rem',
      countDownLineHeight: '0.3515rem',
      countDownTextColor: '#333',
      buttonDefaultBackgroundColor: '#4cd964',
      buttonDefaultFontSize: '0.192rem'
    }
    // 倒计时
    const countDown = ref(1 * 15 * 60 * 1000)
    const currentClickText = ref('') // 当前点击的支付方式
    const showDialog = ref(false) // 对话框默认不打开
    const dialogFlag = ref('') // 对话框打开的标志，是点击支付按钮打开，还是倒计时结束自动触发，还是组件加载时自动触发的

    // 选择支付方式
    const choosePayment = (event: MouseEvent) => {
      const currentDom = event.target as HTMLElement
      // console.log(currentDom.innerText)
      currentClickText.value = currentDom.innerText
    }

    onMounted(() => { showDialog.value = !showDialog.value; dialogFlag.value = 'mounted' })

    // 弹出框的确认按钮
    const comfirmToPay = () => {
      if (dialogFlag.value !== 'mounted') router.push({ path: '/main/list' })
    }

    return { countDown, themeVars, choosePayment, currentClickText, showDialog, comfirmToPay, dialogFlag }
  }
})
</script>

<style lang="less" scoped>
.payment{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .arrowLeft{
    font-size: .25rem;
  }
  .detail-center{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .show-time-amount{
    background-color: #fff;
    padding: .164rem;
    text-align: center;
    .pay-time-last{
      font-size: .14rem;
      color: #666;
      margin: .24rem 0 .15rem;
    }
    .amount{
      margin: .07rem 0 .23rem;
    }
  }
  .choose-payment{
    background-color: #f1f1f1;
    padding: 0 0.16rem;
    font-size: .16rem;
    color: #666;
    line-height: .43rem;
  }
  .payment-ul{
    background-color: #fff;
    li{
      padding: .09rem .16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: .005rem solid #f1f1f1;
      .payway{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .alipay{color: #3190e8;}
        .wechat{color: #4cd964;}
        span{
          font-size: .42rem;
        }
        p{
          font-size: .16rem;
          color: #666;
          margin-left: .1rem;
        }
      }
    }
  }
}
.dialog{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0;
  p{
    font-size: .17rem;
    color: #333;
    text-align: center;
  }
  .tip_icon{
    width: .63rem;
    height: .63rem;
    border: 0.035rem solid #f8cb86;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: .15rem;
    span:first-child{
      width: 0.03rem;
      height: 0.35rem;
      background-color: #f8cb86;
    }
    span:last-child{
      width: 0.046rem;
      height: 0.046rem;
      border: 1px;
      border-radius: 50%;
      margin-top: 0.046rem;
      background-color: #f8cb86;
    }
  }
}
</style>

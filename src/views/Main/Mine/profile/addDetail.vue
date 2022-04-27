<template>
  <div class="addDetail">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">搜索地址</span></template>
    </Header>
    <section class="address-container">
      <input type="text" placeholder="请输入小区/写字楼/学校等" v-model.trim="inputName" />
      <Button @click="query">确认</Button>
    </section>
    <p class="warning">为了满足商家的送餐要求，建议您从列表中选择地址</p>
    <div class="tips" v-if="address.length === 0">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>
    </div>
    <section class="address-section">
      <ul class="address-ul">
        <li v-for="(addr, index) in address" :key="index" @click="selectAddress(index)">
          <p>{{addr.name}}</p><p>{{addr.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { IAddress } from '@/interface'

export default defineComponent({
  name: 'AddDetail',
  components: { Header, Button },
  beforeRouteEnter (to:Record<string, any>, from:Record<string, any>, next:(vm:any) => void) {
    // ...
    next((vm:any) => {
      vm.toComponent = from.name
    })
  },
  setup () {
    const router = useRouter() // 路由跳转
    const inputName = ref('')
    const toComponent = ref('') // 离开路由时跳转到目的地的组件名称
    const address:Ref<IAddress[]> = ref([]) // 存储地址

    // 搜索地址
    const query = async () => {
      const response = await httpRequest('https://elm.cangdu.org/v1/pois', 'get', { type: 'nearby', keyword: inputName.value })
      // console.log(response)
      response.status === 200 ? address.value = response.data : address.value = []
    }

    // 选址地址点击跳转
    const selectAddress = (addressIndex: number) => {
      console.log(toComponent.value)
      const chooseAddr = address.value.find((addr, index) => index === addressIndex && addr)
      if (chooseAddr) {
        toComponent.value === 'Add' ? router.push({ name: 'Add', params: { address: chooseAddr.name, geohash: chooseAddr.geohash } })
          : router.push({ name: 'addAddress', params: { address: chooseAddr.name, geohash: chooseAddr.geohash } })
      }
    }

    return { inputName, query, address, selectAddress, toComponent }
  }
})
</script>

<style lang="less" scoped>
.addDetail{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .address-container{
    background-color: #fff;
    padding: .1rem;
    display: flex;
    justify-content: space-between;
    input{
      display: block;
      width: 2.55rem;
      padding: 0 0.05rem;
      background: #f2f2f2;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: .144rem;
    }
    button{
      display: block;
      width: .8rem;
      background: #3199e8;
      font-size: .15rem;
      color: #fff;
      border-radius: 5px;
    }
  }
  .warning{
    background: #fff6e4;
    font-size: .145rem;
    color: #ff883f;
    text-align: center;
    padding: 0.04rem 0;
  }
  .tips{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    p{
      width: 100%;
      text-align: center;
      font-size: .15rem;
      color: #969696;
      margin-bottom: 0.09rem;
    }
  }
  .address-section{
    overflow-y: auto;
    .address-ul li{
      border-bottom: 1px solid #ccc;
      padding: 0.09rem;
      p:first-child{
        margin-bottom: 0.046rem;
      }
      p{
        font-size: .15rem;
        color: #969696;
      }
    }
  }
}
</style>

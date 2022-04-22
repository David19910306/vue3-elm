<template>
  <template v-if="!route.path.endsWith('address')">
    <router-view></router-view>
  </template>
  <div class="address" v-else>
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">编辑地址</span></template>
      <template v-slot:right><span @click="display = !display">编辑</span></template>
    </Header>
    <section class="address-container">
      <ul class="address-ul">
        <li v-for="address in addressList" :key="address.id">
          <p>
            <span>{{address.address}}</span>
            <span>{{address.address_detail}}</span>
          </p>
          <span v-show="display" @click="deleteAddress(address.id)">
            <Icon name="cross" color="#999" size="0.15rem"/>
          </span>
        </li>
      </ul>
      <router-link to="/main/mine/profile/address/add">
        <section class="add-address">
          <span>新增地址</span>
          <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
        </section>
      </router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { Icon } from 'vant'
import Header from '@/components/header/index.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import httpRequest from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Address',
  components: { Header, Icon },
  setup () {
    const route = useRoute()
    const store = useStore()
    const addressList:Ref<Record<string, any>[]> = ref([]) // 地址列表
    const display = ref(false) // 默认不显示

    // 组件一挂载就获取新的地址列表
    onMounted(async () => {
      const result = await httpRequest(`/api/v1/users/${store.state.userId}/addresses`, 'get')
      // console.log(result)
      result.status === 200 ? addressList.value = result.data : addressList.value = []
    })

    // 组件内路由导航，新增地址跳转回来之后获取新的地址列表
    onBeforeRouteUpdate(async (to, from) => {
      if (from.name === 'Add') {
        const result = await httpRequest(`/api/v1/users/${store.state.userId}/addresses`, 'get')
        // console.log(result)
        result.status === 200 ? addressList.value = result.data : addressList.value = []
      }
    })

    // 删除地址
    const deleteAddress = async (addressId: number) => {
      // addressList.value = addressList.value.filter(address => address.id !== addressId)
      const { data } = await httpRequest(`/api/v1/users/${store.state.userId}/addresses/${addressId}`, 'delete')
      if (data.status === 1) { // 地址删除成功，再次请求后台获取最新的地址列表
        const result = await httpRequest(`/api/v1/users/${store.state.userId}/addresses`, 'get')
        // console.log(result)
        result.status === 200 ? addressList.value = result.data : addressList.value = []
      }
    }

    return { route, addressList, display, deleteAddress }
  }
})
</script>

<style lang="less" scoped>
.address{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .address-container{
    overflow-y: auto;
    margin-top: .15rem;
    .address-ul li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: .05rem .1rem;
      border-top: 1px solid #d9d9d9;
      p{
        display: flex;
        flex-direction: column;
        line-height: .216rem;
        font-size: .144rem;
        color: #333;
      }
      &:first-child{
        background-color: #fff8c3;
      }
      &:last-child{
        border-bottom: 1px solid #d9d9d9;
      }
    }
    .add-address{
      margin-top: .15rem;
      background-color: #fff;
      display: flex;
      padding: .1rem;
      justify-content: space-between;
      align-items: center;
      font-size: .16rem;
      color: #333;
      line-height: .25rem;
      border-bottom: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
    }
  }
}
</style>

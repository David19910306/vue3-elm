<template>
  <div class="choose-address">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">选择地址</span></template>
      <template v-slot:right><span><i class="iconfont icon-31wode user-icon"></i></span></template>
    </Header>
    <ul class="address-ul">
      <li v-for="address in addresses" :key="address.id" @click="selectAddressHandler(address)">
        <section class="icon-section">
          <Icon name="checked" color="#4CD964" size="0.25rem" v-if="address.id === currentId"/>
        </section>
        <section class="address-detail">
          <span class="name">
            {{address.name}}<span class="phone">{{`${address.sex === 1? '先生': '女士'} ${address.phone}`}}</span>
          </span>
          <span class="address-tag">
            <Tag :color="`${address.tag === '学校'? '#3190e8': address.tag === '公司'?
                  '#4cd964': '#ff5722'}`">{{address.tag}}</Tag>
            <span class="detail">{{address.address_detail}}</span>
          </span>
        </section>
      </li>
    </ul>
    <footer class="addBtn" @click="router.push({path: '/confirmOrder/addAddress'})">
      <Icon name="add-o" color="##3190e8" size="0.2rem"/>
      <span>新增收货地址</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Icon, Tag } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'chooseAddress',
  components: { Header, Icon, Tag },
  setup () {
    const store = useStore()
    const router = useRouter()

    const addresses = ref([]) // 收货地址列表
    const currentId = ref(0) // 当前地址的id

    onMounted(async () => {
      // 组件挂载后请求数据
      const result = await httpRequest(`/api/v1/users/${store.getters.getUserId}/addresses`, 'get')
      // console.log(result)
      addresses.value = result.data || []
    })

    // 选择地址
    const selectAddressHandler = (address: Record<string, any>) => {
      currentId.value = address.id
      store.dispatch('selectAddress', address)
      router.push({ path: '/confirmOrder', query: { geohash: store.state.geohash, shopId: store.state.restaurantInfo.id } })
    }

    return { addresses, router, currentId, selectAddressHandler }
  }
})
</script>

<style lang="less" scoped>
.choose-address{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
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
  .addBtn{
    height: .575rem;
    color: #3190e8;
    text-align: center;
    line-height: .575rem;
    span{
      font-size: .1725rem;
      vertical-align: middle;
    }
  }
  .address-ul{
    flex: 1;
    overflow-y: auto;
    li{
      display: flex;
      align-items: center;
      border-bottom: .0057rem solid #f5f5f5;
      padding: .1rem .15rem;
      line-height: .24rem;
      .icon-section{
        flex: 1;
      }
      .address-detail{
        flex: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name{
          font-size: .184rem;
          color: #333;
          font-weight: 700;
          .phone{
            font-family: Helvetica Neue,Tahoma,Arial;
            font-size: .15rem;
            color: #333;
            font-weight: 400;
          }
        }
        .address-tag .detail{
          margin-left: 0.115rem;
          color: #777;
          font-size: .13rem;
        }
      }
    }
  }
}
</style>

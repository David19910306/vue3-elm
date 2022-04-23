<template>
  <div class="confirmOrder">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">确认订单</span></template>
      <template v-slot:right><span><i class="iconfont icon-31wode user-icon"></i></span></template>
    </Header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'ConfirmOrder',
  components: { Header },
  setup () {
    console.log('order')
  }
})
</script>

<style lang="less" scoped>
.confirmOrder{
  height: 100%;
  display: flex;
  flex-direction: column;
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
}
</style>

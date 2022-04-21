<template>
  <div class="addDetail">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">搜索地址</span></template>
    </Header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'AddDetail',
  components: { Header },
  setup () {
    console.log('@')
  }
})
</script>

<style lang="less" scoped>
.addDetail{
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
}
</style>

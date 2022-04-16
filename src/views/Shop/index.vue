<template>
  <keep-alive>
    <component :is="currentComponentName"></component>
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Shop from './Shop.vue'
import ShopDetail from './shopDetail.vue'
// import useWatchRouter from '@/hook/useWatchRouter'

export default defineComponent({
  components: { Shop, ShopDetail },
  setup () {
    const route = useRoute()
    const currentComponentName = ref('Shop') // 默认显示的就是Shop组件

    // 监听路由的变化
    watch(() => route.path, value => {
      // console.log(value)
      value === '/shop/shopDetail' ? currentComponentName.value = 'ShopDetail' : currentComponentName.value = 'Shop'
    })

    return { currentComponentName }
  }
})
</script>

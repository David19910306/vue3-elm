<template>
  <div class="index">
    <Home/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './Home/index.vue'

export default defineComponent({
  name: 'Index',
  components: { Home }
})
</script>

<style lang="less" scoped>
.index{
  height: 100%;
}
</style>

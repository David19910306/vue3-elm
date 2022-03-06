<template>
  <div class="store-item">
    <img src="https://img2.baidu.com/it/u=1100246879,1702373665&fm=253&fmt=auto&app=138&f=JPEG" alt="美食" />
    <h6>美食</h6>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    console.log('store-item')
  }
})
</script>

<style lang="less" scoped>
.store-item{
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: .5rem;
    height: .5rem;
    margin-bottom: .07rem;
  }
  h6{
    font-size: .13rem;
    color: #666;
  }
}
</style>

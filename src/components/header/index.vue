<template>
  <div class="header">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header'
})
</script>

<style lang="less" scoped>
.header{
  height: .4752rem;
  background-color: #3190e8;
  display: flex;
  font-size: .15rem;
  color: #fff;
  line-height: .4752rem;
  .left{
    width: .6rem;
    text-align: center;
  }
  .right{
    width: .8rem;
    text-align: center;
  }
  .center{
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

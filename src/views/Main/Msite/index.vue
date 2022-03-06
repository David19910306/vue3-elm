<template>
  <div class="msite">
    <section class="swipe-container">
      <Swipe class="my-swipe">
        <SwipeItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
        </SwipeItem>
        <SwipeItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
          <StoreItem></StoreItem>
        </SwipeItem>
      </Swipe>
    </section>
    <div class="list-container">
      <header><i class="iconfont icon-shangjia"></i><span>附近商家</span></header>
      <section>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import StoreItem from './storeItem.vue'
import ListItem from '@/components/listItem/index.vue'

export default defineComponent({
  name: 'Msite',
  components: { Swipe, SwipeItem, StoreItem, ListItem },
  setup () {
    console.log('@')
  }
})
</script>

<style lang="less" scoped>
.msite{
  height: 100%;
  display: flex;
  flex-direction: column;
  .swipe-container{
    background-color: #fff;
    .my-swipe .van-swipe-item {
      height: 1.75rem;
      color: #333;
      font-size: 20px;
      display: flex;
      flex-wrap: wrap;
      padding-bottom: .12rem;
    }
  }
  .list-container{
    margin-top: .1rem;
    background-color: #fff;
    flex: 1;
    header{
      height: .3rem;
      font-size: .13rem;
      color: #999;
      padding: 0 .13rem;
      i{
        margin-right: .05rem;
        line-height: .3rem;
      }
      span{
        line-height: .3rem;
      }
    }
  }
}
</style>

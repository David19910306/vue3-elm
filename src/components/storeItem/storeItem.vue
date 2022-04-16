<template>
  <div class="store-item" @click="jumpToStoreList">
    <Skeleton title :loading="item.image_url === undefined" title-width="60" :style="{'--van-skeleton-row-height': '40px', 'margin-bottom': '5px'}">
      <img :src="`https://fuss10.elemecdn.com/${item.image_url}`" alt="美食" />
    </Skeleton>
    <Skeleton title :loading="item.title === undefined" title-width="60">
      <h6>{{item.title}}</h6>
    </Skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Skeleton } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  props: ['item'],
  components: { Skeleton },
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const jumpToStoreList = () => {
      router.push({
        path: '/storelist',
        query: {
          geohash: store.getters.getGeoHash,
          title: props.item.title,
          restaurant_category_id: props.item.id
        }
      })
    }

    return { jumpToStoreList }
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
    text-align: center;
  }
}
</style>

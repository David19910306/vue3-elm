<template>
  <div class="list-item" @click="jumpToFoodList">
    <section class="left">
      <Skeleton :loading="list.image_path === undefined" title title-width="50" :style="{'--van-skeleton-row-height': '50px'}">
        <img :src="`https://elm.cangdu.org/img/${list.image_path}`" />
      </Skeleton>
    </section>
    <section class="center">
      <section class="top">
        <Tag color="#FADB4A" text-color="#333">品牌</Tag>
        <span>{{list.name}}</span>
      </section>
      <section class="middle">
        <Rate :size="12" color="#ffd21e" void-icon="star" void-coloe="#eee" gutter="0px" v-model="shiningCount" readonly></Rate>
        &nbsp;<span>{{list.rating}}</span>
        &nbsp;<label>月售{{list.recent_order_num}}单</label>
      </section>
      <section class="bottom">
        <span>￥{{list.float_minimum_order_amount}}元起送 / 配送费￥{{list.float_delivery_fee}}</span>
      </section>
    </section>
    <section class="right">
      <section class="tags-top">
        <Tag v-for="tag in list.supports" :key="tag.id" plain :text-color="`#${tag.icon_color}`">{{tag.icon_name}}</Tag>
      </section>
      <section class="tags-middle">
        <Tag v-if="list.delivery_mode && list.delivery_mode.is_solid" :color="`#${list.delivery_mode.color}`">蜂鸟专送</Tag>
        <Tag type="primary" plain :color="`#${list.delivery_mode? list.delivery_mode.color:'57a9ff'}`">准时达</Tag>
      </section>
      <section class="distanceTime">
        <span class="distance">{{list.distance}}</span>
        <span class="time">{{list.order_lead_time}}</span>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Rate, Skeleton } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ListItem',
  components: { Tag, Rate, Skeleton },
  props: ['list'],
  setup (props) {
    const shiningCount = ref(props.list.rating)
    const id = ref(props.list.id)
    const router = useRouter()
    const jumpToFoodList = () => {
      router.push({
        path: `/shop/${id.value}`
      })
    }
    return { shiningCount, jumpToFoodList }
  }
})
</script>

<style lang="less" scoped>
.list-item{
  height: .8rem;
  display: flex;
  padding: .05rem .1rem;
  align-items: center;
  border-bottom: .01rem solid #f6f6f6;
  .left{
    width: .7rem;
    height: .7rem;
    margin-right: .05rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    flex: 1;
    height: .7rem;
    display: flex;
    flex-direction: column;
    .tags-top{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      span{
        transform: scale(.8);
      }
    }
    .tags-middle{
      display: flex;
      justify-content: flex-end;
      span{
        vertical-align: middle;
      }
    }
    .distanceTime{
      flex: 1;
      font-size: 0.12rem;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      flex-direction: column;
      .distance{
        color: #8E8E8E;
      }
      .time{
        color:#5498E6;
      }
    }
  }
  .center{
    height: .7rem;
    width: 1.8rem;
    display: flex;
    flex-direction: column;
    .top{
      display: flex;
      height: .17rem;
      span:last-child{
        margin-left: .05rem;
        font-size: .15rem;
        line-height: .17rem;
        color: #333;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .middle{
      flex: 1;
      display: flex;
      align-items: center;
      span{
        color: #ED7531;
        font-size: .13rem;
      }
      label{
        color: #8E8E8E;
        font-size: .12rem;
      }
    }
    .bottom{
      flex: 1;
      display: flex;
      align-items: center;
      span{
        font-size: .12rem;
        color: #8E8E8E;
      }
    }
  }
}
</style>

<template>
  <div class="list-item">
    <section class="left">
      <img  src="https://img0.baidu.com/it/u=452249793,2581016670&fm=253&fmt=auto&app=138&f=JPEG" />
    </section>
    <section class="center">
      <section class="top">
        <Tag color="#FADB4A" text-color="#333">品牌</Tag>
        <span>bigbang韩国炸鸡（天天有优惠）</span>
      </section>
      <section class="middle">
        <Rate :size="12" color="#ffd21e" void-icon="star" void-coloe="#eee" gutter="0px" v-model="shiningCount"></Rate>
        &nbsp;<span>4.2</span>
        &nbsp;<label>月售9199单</label>
      </section>
      <section class="bottom">
        <span>￥20元起送 / 配送费￥5</span>
      </section>
    </section>
    <section class="right">
      <section class="tags-top">
        <Tag color="#e4e4e4" plain text-color="#c8c8c8">票</Tag>
        <Tag color="#e4e4e4" plain text-color="#c8c8c8">保</Tag>
        <Tag color="#e4e4e4" plain text-color="#c8c8c8">准</Tag>
      </section>
      <section class="tags-middle">
        <Tag type="primary">蜂鸟专送</Tag>
        <Tag type="primary" plain>准时达</Tag>
      </section>
      <section class="distanceTime">
        <span class="distance">1.87km /</span>
        <span class="time"> 59分钟</span>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Rate } from 'vant'

export default defineComponent({
  components: { Tag, Rate },
  setup () {
    const shiningCount = ref(4)
    return { shiningCount }
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
      flex: 1;
      justify-content: center;
      span{
        margin: 0 .02rem;
      }
    }
    .tags-middle{
      flex: 1;
    }
    .distanceTime{
      flex: 1;
      font-size: .12rem;
      display: flex;
      align-items: center;
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

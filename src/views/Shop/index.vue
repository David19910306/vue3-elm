<template>
  <section class="food-list-container">
    <nav><span class="iconfont icon-fangxiang-zuo"></span></nav>
    <header class="shop-header-detail">
      <div class="header-cover-img-con">
        <img src="https://elm.cangdu.org/img/17fba6e16ee104399.png" alt="coverImage" class="header-cover-img">
      </div>
      <section class="description-header">
        <router-link class="description-top" to="/">
          <section class="description-left">
            <img src="https://elm.cangdu.org/img/17fba6e16ee104399.png">
          </section>
          <section class="description-right">
            <h4 class="description-title ellipsis">快快快111122233</h4>
            <p class="description-text">商家配送／分钟送达／配送费¥5</p>
            <p class="description-promotion ellipsis">公告：欢迎光临，用餐高峰请提前下单，谢谢</p>
          </section>
          <span class="iconfont icon-fangxiang-you goForward"></span>
        </router-link>
        <footer class="description-footer">
          <p class="ellipsis">
            <Tag type="danger">减</Tag>
            <span>满30减5，满60减8（APP专享）</span>
          </p>
          <p>1个活动</p>
          <span class="iconfont icon-fangxiang-you goForActivity"></span>
        </footer>
      </section>
    </header>
    <section class="shop-detail-message">
      <ConfigProvider :theme-vars="themeVars">
        <Tabs v-model:active="currentTab" border>
          <Tab title="商品">商品</Tab>
          <Tab title="评价">评价</Tab>
        </Tabs>
      </ConfigProvider>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Tab, Tabs, ConfigProvider } from 'vant'

export default defineComponent({
  components: { Tag, Tab, Tabs, ConfigProvider },
  setup () {
    // 样式设置
    const themeVars = {
      tabTextColor: '#666',
      tabActiveTextColor: '#3190e8',
      tabsBottomBarColor: '#3190e8'
    }
    const currentTab = ref(0)

    return { currentTab, themeVars }
  }
})
</script>

<style lang="less" scoped>
.food-list-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  nav {
    position: fixed;
    width: 100%;
    z-index: 11;
    height: .3rem;
    span{
      font-size: .25rem;
      color: #fff;
    }
  }
  .shop-header-detail{
    position: relative;
    .header-cover-img-con{
      height: 100%;
      overflow: hidden;
      position: absolute;
      width: 100%;
      .header-cover-img{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        filter: blur(10px);
      }
    }
    .description-header{
      position: relative;
      z-index: 10;
      background-color: rgba(119,103,137,.43);
      padding: 0.1rem 0 0.1rem 0.1rem;
      width: 100%;
      overflow: hidden;
      .description-top{
        display: flex;
        .description-left{
          margin-right: .05rem;
          img{
            width: .67rem;
            height: .67rem;
            display: block;
            border-radius: .05rem;
          }
        }
        .description-right{
          flex: 1;
          .description-title{
            font-size: .18rem;
            color: #fff;
            font-weight: 600;
            width: 100%;
            margin-bottom: .1rem;
          }
          .description-text{
            font-size: .12rem;
            color:#fff;
            margin-bottom: .1rem;
          }
          .description-promotion{
            font-size: .12rem;
            color: #fff;
            width: 2.7rem;
          }
          .ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .goForward{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0.1rem;
          z-index: 11;
          color: #fff;
          font-size: .25rem;
        }
      }
      .description-footer{
        display: flex;
        justify-content: space-between;
        margin-top: .1rem;
        padding-right: .15rem;
        align-items: center;
        p{
          font-size: .12rem;
          color: #fff;
          span:first-child{
            margin-right: .1rem;
          }
        }
        .ellipsis{
          width: 80%;
        }
        .goForActivity{
          color: #fff;
        }
      }
    }
  }
}
</style>

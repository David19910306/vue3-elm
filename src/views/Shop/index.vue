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
        <Tabs v-model:active="currentTab" border type="line">
          <Tab title="商品">
            <section class="good-tag-lists">
              <section class="good-list-content">
                <Sidebar v-model="currentBar">
                  <sidebar-item title="标签1"></sidebar-item>
                  <sidebar-item title="标签2"></sidebar-item>
                  <sidebar-item title="标签3"></sidebar-item>
                  <sidebar-item title="标签4"></sidebar-item>
                  <sidebar-item title="标签5"></sidebar-item>
                  <sidebar-item title="标签6"></sidebar-item>
                  <sidebar-item title="标签7"></sidebar-item>
                  <sidebar-item title="标签8"></sidebar-item>
                  <sidebar-item title="标签9"></sidebar-item>
                </Sidebar>
                <section class="good-lists">
                  <ul>
                    <li>
                      <header class="menu-detail-header">
                        <section class="menu-title">
                          <strong>无内鬼</strong>
                          <span>与枚举</span>
                        </section>
                        <Icon name="ellipsis" size="15" color="#969696"/>
                      </header>
                      <menu-detail-list></menu-detail-list>
                      <menu-detail-list></menu-detail-list>
                      <menu-detail-list></menu-detail-list>
                      <menu-detail-list></menu-detail-list>
                      <menu-detail-list></menu-detail-list>
                    </li>
                  </ul>
                </section>
              </section>
              <footer class="cart-content"></footer>
            </section>
          </Tab>
          <Tab title="评价">评价</Tab>
        </Tabs>
      </ConfigProvider>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Tab, Tabs, ConfigProvider, Sidebar, SidebarItem, Icon } from 'vant'
import MenuDetailList from '@/components/menuDetailList/index.vue'

export default defineComponent({
  components: { Tag, Tab, Tabs, ConfigProvider, Sidebar, SidebarItem, Icon, MenuDetailList },
  setup () {
    // 样式设置
    const themeVars = {
      tabTextColor: '#666',
      tabActiveTextColor: '#3190e8',
      tabsBottomBarColor: '#3190e8',
      sidebarSelectedBorderColor: '#3190e8',
      sidebarSelectedBorderHeight: '100%',
      sidebarSelectedTextColor: '#666',
      sidebarSelectedFontWeight: '700',
      sidebarBackgroundColor: '#f5f5f5'
    }
    const currentTab = ref(0)
    const currentBar = ref(0)

    return { currentTab, themeVars, currentBar }
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
  .shop-detail-message{
    overflow-y: auto;
    .good-tag-lists{
      display: flex;
      flex-direction: column;
      .good-list-content{
        display: flex;
        flex: 1;
        .good-lists{
          background-color: #f5f5f5;
          overflow-y: auto;
          flex: 1;
          .menu-detail-header{
            display: flex;
            justify-content: space-between;
            padding: .09rem;
            align-items: center;
            .menu-title{
              width: 11rem;
              white-space: nowrap;
              overflow: hidden;
              strong{
                font-size: .16rem;
                color: #666;
                font-weight: 700;
                margin-right: .08rem;
              }
              span{
                font-size: .12rem;
                color: #999;
                width: 30%;
                overflow: hidden;
              }
            }
          }
        }
      }
      .cart-content{
        height: .49rem;
        position: absolute;
        background-color: #3d3d3f;
        bottom: 0;
        left: 0;
        z-index: 13;
        display: flex;
        width: 100%;
      }
    }
  }
}
</style>

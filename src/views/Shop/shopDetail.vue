<template>
  <div class="shop-detail">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">商家详情</span></template>
    </Header>
    <section class="shop-detail-content">
      <section class="activities-container">
        <header>活动与属性</header>
        <ul class="actibities_ul">
          <template v-if="restaurantInfo.activities.length > 0">
            <li v-for="activity in restaurantInfo.activities" :key="activity._id">
              <Tag :color="`#${activity.icon_color}`">{{activity.icon_name}}</Tag>
              <span class="activity-props">{{activity.description}}</span>
            </li>
          </template>
        </ul>
        <ul class="actibities_ul">
          <template v-if="restaurantInfo.supports.length > 0">
            <li v-for="support in restaurantInfo.supports" :key="support._id">
              <Tag :color="`#${support.icon_color}`">{{support.icon_name}}</Tag>
              <span class="activity-props">{{support.description}}</span>
            </li>
          </template>
        </ul>
      </section>
      <section class="shop-status-container">
        <header>
          <span class="status-name">食品监督安全公示</span>
          <div>
            <span>企业认证详情</span>
            <i class="iconfont icon-fangxiang-you"></i>
          </div>
        </header>
        <section class="shop-statu-detail">
          <div><Icon name="smile" color="#7ed321" size="46.88"/></div>
          <div class="check-date">
            <p>
              <span>监督检查结果：</span>
              <span class="shop-status-well">良好</span>
            </p>
            <p>
              <span>检查日期：</span>
              <span></span>
            </p>
          </div>
        </section>
      </section>
      <section class="shop-status-info">
        <header>活动与属性</header>
        <p>{{restaurantInfo.name}}</p>
        <p>地址：{{restaurantInfo.address}}</p>
        <p>营业时间：{{restaurantInfo.opening_hours.reduce((prev, curr) => prev + curr + ' ', '')}}</p>
        <p class="shop-certificate">
          <span>营业执照</span>
          <i class="iconfont icon-fangxiang-you"></i>
        </p>
        <p class="shop-certificate">
          <span>餐饮服务许可证</span>
          <i class="iconfont icon-fangxiang-you"></i>
        </p>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'shopDetail',
  components: { Header, Tag, Icon },
  setup () {
    const restaurantInfo = ref(null)
    const store = useStore()
    restaurantInfo.value = store.state.restaurantInfo

    return { restaurantInfo }
  }
})
</script>

<style lang="less" scoped>
.shop-detail{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .shop-detail-content{
    overflow-y: auto;
    .activities-container{
      background-color: #fff;
      margin: 0.09rem 0;
      padding-bottom: 0.14rem;
      header{
        font-size: .175rem;
        color: #333;
        line-height: .42rem;
        padding-left: 0.14rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 0.07rem;
      }
      .actibities_ul{
        padding: 0 .14rem;
        li{
          margin-bottom: .04rem;
          .activity-props{
            font-size: .13rem;
            color: #666;
            margin-left: .1rem;
          }
        }
      }
    }
    .shop-status-container{
      background-color: #fff;
      margin-bottom: 0.093rem;
      header{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        .status-name{
          font-size: .175rem;
          color: #333;
          line-height: .42rem;
          padding-left: 0.14rem;
        }
        div span{
          font-size: .164rem;
          color: #bbb;
          line-height: .42rem;
        }
        div i{
          font-size: .25rem;
          color: #bbb;
          vertical-align: middle;
        }
      }
      .shop-statu-detail{
        padding: .14rem;
        display: flex;
        .check-date{
          margin-left: .1rem;
          span{
            font-size: .1289rem;
            color: #666;
          }
          .shop-status-well{
            color: #7ed321;
          }
        }
      }
    }
    .shop-status-info{
      background-color: #fff;
      margin-bottom: 0.093rem;
      header{
        font-size: .175rem;
        color: #333;
        line-height: .42rem;
        padding-left: 0.14rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 0.07rem;
      }
      p{
        font-size: .14rem;
        color: #666;
        padding: 0.164rem 0.14rem 0.164rem 0;
        margin-left: 0.14rem;
        border-bottom: 0.005rem solid #f5f5f5;
      }
      .shop-certificate{
        display: flex;
        justify-content: space-between;
        i{
          font-size: .16rem;
          color: #bbb;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

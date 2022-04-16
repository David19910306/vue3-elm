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
          <li>
            <Tag color="#edc123">特</Tag>
            <span class="activity-props">111（APP专享）</span>
          </li>
          <li>
            <Tag color="#edc123">新</Tag>
            <span class="activity-props">111（APP专享）</span>
          </li>
          <li>
            <Tag color="#edc123">领</Tag>
            <span class="activity-props">222</span>
          </li>
          <li>
            <Tag color="#edc123">特</Tag>
            <span class="activity-props">333（APP专享）</span>
          </li>
          <li>
            <Tag color="#edc123">准</Tag>
            <span class="activity-props">111（APP专享）</span>
          </li>
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
        <p>朝阳大饭店</p>
        <p>地址：北京市朝阳区管庄泰福苑3区南1</p>
        <p>营业时间：[8:30/20:30]</p>
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
import { defineComponent } from 'vue'
import { Tag, Icon } from 'vant'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'ShopDetail',
  components: { Header, Tag, Icon },
  setup () {
    console.log('shop-detail')
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

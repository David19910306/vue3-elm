<template>
  <section class="menu-detail-list">
    <div class="menu-detail-link">
      <section class="food-detail-img">
        <img src="https://elm.cangdu.org/img/16f4162bb0262234.jpg" alt="food-image" />
      </section>
      <section class="food-detail-description">
        <h3 class="food-description-head">
          <strong class="description-food-name">长沙喜茶</strong>
          <ul class="attribute-ul">
            <li class="attribute-new">
              <p style="color:#fff">新品</p>
            </li>
            <li><Tag plain type="danger">招牌</Tag></li>
          </ul>
        </h3>
        <p class="food-description-content">味道好寂寥</p>
        <p class="food-sail-rating">
          <span>月售739份</span>
          <span>好评率83%</span>
        </p>
        <p class="food-activity">
          <Tag plain type="danger">没有货的</Tag>
        </p>
      </section>
    </div>
    <footer class="menu-detail-footer">
      <section class="food-price">
        <span>￥</span>
        <span>200</span>
      </section>
      <section class="cart-module">
        <!-- <section class="cart-button">
          <span class="iconfont icon-jianshao"></span>
          <span class="cart-num">1</span>
          <span class="iconfont icon-jia"></span>
        </section> -->
        <section class="choose-specification">
          <span class="iconfont icon-jianshao"></span>
          <span class="cart-num">1</span>
          <Tag type="primary" size="medium">选规格</Tag>
        </section>
      </section>
    </footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Tag } from 'vant'

export default defineComponent({
  components: { Tag },
  setup () {
    console.log('oo')
  }
})
</script>

<style lang="less" scoped>
.menu-detail-list{
  height: 100%;
  background-color: #fff;
  padding: .14rem .09rem;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f8f8f8;
  .menu-detail-link{
    display: flex;
    .food-detail-img{
      margin-right: .09rem;
      img{
        width: .46rem;
        height: .46rem;
        display: block;
      }
    }
    .food-detail-description{
      width: 100%;
      .food-description-head{
        display: flex;
        justify-content: space-between;
        margin-bottom: .04rem;
        .description-food-name{
          color: #333;
          font-size: .16rem;
          font-weight: 600;
        }
        .attribute-ul{
          display: flex;
          .attribute-new{
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            background-color: #4cd964;
            width: .46rem;
            height: .46rem;
            align-items: flex-end;
            transform: rotate(-45deg) translate(-0.023rem, -.345rem);
            border: none;
            border-radius: 0;
            p{
              font-size: .12rem;
              text-align: center;
              flex: 1;
              transform: scale(.8);
              color: #fff;
            }
          }
          li{
            font-size: .12rem;
            height: 0.14rem;
            line-height: .08rem;
            padding: 0.023rem;
            // border: 1px solid #666;
            border-radius: 0.07rem;
            margin-right: 0.023rem;
            transform: scale(.8);
          }
        }
      }
      .food-description-content{
        font-size: .12rem;
        color: #999;
        line-height: .138rem;
      }
      .food-sail-rating{
        line-height: .18rem;
        span:first-child{
          margin-right: .07rem;
        }
        span{
          color: #333;
          font-size: .12rem;
        }
      }
      .food-activity{
        line-height: .09rem;
      }
    }
  }
  .menu-detail-footer{
    margin-left: .56rem;
    // margin-top: .07rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .food-price{
      span:first-child{
        font-size: .12rem;
        color: #f60;
        margin-right: .01rem;
      }
      span:last-child{
        font-size: .16rem;
        color: #f60;
        font-weight: 700;
        margin-right: .07rem;
      }
    }
    .cart-module{
      .cart-button{
        display: flex;
        align-items: center;
        span{
          color: #3190e8;
          font-size: .16rem;
        }
        .cart-num{
          font-size: .16rem;
          color: #666;
          min-width: .2rem;
          text-align: center;
          font-family: "Helvetica Neue,Tahoma";
        }
      }
      .choose-specification{
        display: flex;
        align-items: center;
        span:first-child {
          color: #3190e8;
          font-size: .16rem;
        }
        .cart-num{
          font-size: .16rem;
          color: #666;
          min-width: .2rem;
          text-align: center;
          font-family: "Helvetica Neue,Tahoma";
        }
      }
    }
  }
}
</style>

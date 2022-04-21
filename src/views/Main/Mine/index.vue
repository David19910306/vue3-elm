<template>
  <template v-if="route.path.includes('profile')">
    <router-view></router-view>
  </template>
  <div class="mine" v-else>
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">我的</span></template>
    </Header>
    <section class="profile-container">
      <router-link :to="`${userInfo.avatar? '/main/mine/profile': '/login'}`">
        <div class="register-login">
          <img class="login-image" :src="`${userInfo.avatar? `https://elm.cangdu.org/img/${userInfo.avatar}`: 'https://img1.baidu.com/it/u=1303378338,2744756438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=417'}`" />
            <div class="login">
              <p>{{userInfo.username || `登录/注册`}}</p>
              <p>
                <i class="iconfont icon-phone-iphone"></i>
                <span>暂无绑定手机号</span>
              </p>
            </div>
          <i class="iconfont icon-fangxiang-you arrowRight"></i>
        </div>
      </router-link>
      <section class="info-data">
        <div class="login-activity">
          <span class="money-number"><b>{{userInfo.balance || '0.00'}}</b>元</span>
          <span class="my-money">我的余额</span>
        </div>
        <div class="login-activity">
          <span class="benefit-number"><b>{{userInfo.gift_amount || '0'}}</b>个</span>
          <span class="my-money">我的优惠</span>
        </div>
        <div class="login-activity">
          <span class="score-number"><b>{{userInfo.point || '0'}}</b>分</span>
          <span class="my-money">我的积分</span>
        </div>
      </section>
      <section class="profile-1reTe">
        <ul class="profile-ul">
          <router-link to="">
            <li>
              <i class="iconfont icon-dingdan1 icon-list" style="color: #aaa;"></i>
              <span class="text-span">
                <span>我的订单</span>
                <i class="iconfont icon-fangxiang-you"></i>
              </span>
            </li>
          </router-link>
          <router-link to="">
            <li>
              <i class="iconfont icon-shangcheng icon-list" style="color: #FC7B53;"></i>
              <span class="text-span">
                <span>积分商城</span>
                <i class="iconfont icon-fangxiang-you"></i>
              </span>
            </li>
          </router-link>
          <router-link to="">
            <li>
              <i class="iconfont icon-wodehuiyuan0101 icon-list" style="color: #FFC69A;"></i>
              <span class="text-span">
                <span>饿了么会员卡</span>
                <i class="iconfont icon-fangxiang-you"></i>
              </span>
            </li>
          </router-link>
        </ul>
      </section>
      <section class="profile-1reTe">
        <ul class="profile-ul">
          <router-link to="">
            <li>
              <i class="iconfont icon-fuwuzhongxin icon-list" style="color: #3190e8;"></i>
              <span class="text-span">
                <span>服务中心</span>
                <i class="iconfont icon-fangxiang-you"></i>
              </span>
            </li>
          </router-link>
          <router-link to="">
            <li>
              <i class="iconfont icon-elemo1 icon-list"></i>
              <span class="text-span">
                <span>下载饿了么APP</span>
                <i class="iconfont icon-fangxiang-you"></i>
              </span>
            </li>
          </router-link>
        </ul>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, reactive, toRefs } from 'vue'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'
import { getUserInfo } from '@/hook/mine'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export default defineComponent({
  name: 'MainMine',
  components: { Header },
  setup () {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      userInfo: {}
    })

    onActivated(async () => {
      console.log(store.state.userId)
      if (store.getters.getUserId === 0) return
      const userInfo = await getUserInfo(store.getters.getUserId)
      state.userInfo = userInfo
    })

    // 组件内部路由导航守卫，退出登录之后清空用户信息
    onBeforeRouteUpdate(to => {
      if (to.params.logout === 'logout') state.userInfo = {}
    })

    return { ...toRefs(state), route }
  }
})
</script>

<style lang="less" scoped>
.mine{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .profile-container{
    flex: 1;
    .register-login{
      height: .9rem;
      background-color: #3190e8;
      display: flex;
      padding: .06rem .1rem;
      justify-content: space-between;
      align-items: center;
      .arrowRight{
        color: #fff;
        font-size: .2rem;
      }
      .login-image{
        width: .58rem;
        height: .58rem;
        border-radius: 50%;
        margin-right: .1rem;
      }
      .login{
        flex: 1;
        p{
          font-size: .1875rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: .05rem;
          i{
            font-size: .15rem;
            color: #fff;
            font-weight: 400;
          }
          span{
            font-size: .15rem;
            color: #fff;
            font-weight: 400;
          }
        }
      }

    }
    .info-data{
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      display: flex;
      .login-activity{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .15rem 0;
        border-right: 1px solid #f1f1f1;
        .money-number{
          font-size: .1289rem;
          color: #333;
          margin: 0.1rem;
          b{
            font-size: .2815rem;
            color: #f90;
            font-weight: 700;
            line-height: .23rem;
          }
        }
        .benefit-number{
          font-size: .1289rem;
          color: #333;
          margin: 0.1rem;
          b{
            font-size: .2815rem;
            color: #ff5f3e;
            font-weight: 700;
            line-height: .23rem;
          }
        }
        .score-number{
          font-size: .1289rem;
          color: #333;
          margin: 0.1rem;
          b{
            font-size: .2815rem;
            color: #6ac20b;
            font-weight: 700;
            line-height: .23rem;
          }
        }
        .my-money{
          color: #666;
          font-weight: 400;
          font-size: .1343rem;
        }
      }
    }
    .profile-1reTe{
      margin-top: .1rem;
      background-color: #fff;
      .profile-ul li{
        padding: .13rem 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        .icon-list{
          font-size: .18rem;
          width: .25rem;
          margin-left: .15rem;
        }
        .text-span{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span{
            font-size: .164rem;
            color: #333;
            flex: 1;
          }
          i{
            font-size: .18rem;
            color: #aaa;
            width: .25rem;
          }
        }
      }
    }
  }
}
</style>

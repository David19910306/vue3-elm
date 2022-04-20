<template>
  <div class="profile">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">账户信息</span></template>
    </Header>
    <section class="profile-info">
      <section class="headportrait">
        <h2>头像</h2>
        <div class="headportrait-div">
          <Icon name="friends" size="0.4rem" color="#d0d0d0"/>
          <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
        </div>
      </section>
      <router-link to="">
        <section class="username">
          <h2>用户名</h2>
          <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
        </section>
      </router-link>
      <router-link to="">
        <section class="username">
          <h2>收货地址</h2>
          <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
        </section>
      </router-link>
      <p class="bind-account">账号绑定</p>
      <section class="phone">
        <span class="iconfont icon-phone-iphone"></span>
        <label>手机</label>
        <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
      </section>
      <p class="bind-account">安全设置</p>
      <router-link to="">
        <section class="username" style="border-top: 1px solid #ddd;">
          <h2>登录密码</h2>
          <span class="changePassword">
            <p>修改</p>
            <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
          </span>
        </section>
      </router-link>
      <Button class="logout" color="#d8584a" block>退出登录</Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon, Button } from 'vant'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'Profile',
  components: { Header, Icon, Button },
  setup () {
    console.log('@')
  }
})
</script>

<style lang="less" scoped>
.profile{
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
  .profile-info{
    flex: 1;
    .headportrait{
      margin-top: 0.09rem;
      padding: 0.11rem 0.09rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: #fff;
      h2{
        font-size: .14rem;
        color: #333;
        font-weight: 500;
        align-items: center;
      }
      .headportrait-div{
        display: flex;
        align-items: center;
      }
    }
    .username{
      padding: 0.11rem 0.09rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #ddd;
      h2{
        font-size: .14rem;
        color: #333;
        font-weight: 500;
        align-items: center;
      }
      .changePassword{
        display: flex;
        align-items: center;
        p{
          color: #999;
          font-size: .164rem;
          font-weight: 300;
        }
      }
    }
    .bind-account{
      padding: 0.093rem;
      font-size: .12rem;
      color: #666;
    }
    .phone{
      padding: .1rem .09rem;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      display: flex;
      background-color: #fff;
      align-items: center;
      span{
        color: #3190e8;
        font-size: .2rem;
      }
      label{
        flex: 1;
        font-size: .144rem;
        color: #333;
        font-weight: 500;
        margin-left: .03rem;
      }
    }
    .logout{
      width: 95%;
      margin: 0 auto;
      margin-top: .3rem;
      border-radius: 3px;
    }
  }
}
</style>

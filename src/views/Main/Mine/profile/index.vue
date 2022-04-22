<template>
  <template v-if="!route.path.endsWith('profile')">
    <router-view></router-view>
  </template>
  <div class="profile" v-else>
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
      <router-link to="/main/mine/profile/setusername">
        <section class="username">
          <h2>用户名</h2>
          <span class="changePassword">
            <p>{{store.state.userInfo.username}}</p>
            <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
          </span>
        </section>
      </router-link>
      <router-link to="/main/mine/profile/address">
        <section class="username">
          <h2>收货地址</h2>
          <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
        </section>
      </router-link>
      <p class="bind-account">账号绑定</p>
      <section class="phone" @click="showDialog = !showDialog">
        <span class="iconfont icon-phone-iphone"></span>
        <label>手机</label>
        <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
      </section>
      <p class="bind-account">安全设置</p>
      <router-link to="/forget">
        <section class="username" style="border-top: 1px solid #ddd;">
          <h2>登录密码</h2>
          <span class="changePassword">
            <p>修改</p>
            <Icon name="arrow" size="0.2rem" color="#d0d0d0"/>
          </span>
        </section>
      </router-link>
      <Button class="logout" color="#d8584a" @click="logout" block>退出登录</Button>
    </section>
  </div>
  <ConfigProvider :theme-vars="themeVars">
    <van-dialog v-model:show="showDialog" confirm-button-color="#000">
      <section class="dialog">
        <div class="tip_icon"><span></span><span ></span></div>
        <p>请在手机APP中设置</p>
      </section>
    </van-dialog>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon, Button, Dialog, ConfigProvider } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Profile',
  components: { Header, Icon, Button, [Dialog.Component.name]: Dialog.Component, ConfigProvider },
  setup () {
    // 样式自定义
    const themeVars = {
      buttonDefaultBackgroundColor: '#4cd964',
      buttonDefaultFontSize: '0.192rem'
    }

    const store = useStore()
    const router = useRouter()
    const route = useRoute() // 检测当前的路由
    const showDialog = ref(false) // 是否显示对话框
    // 退出登录
    const logout = () => {
      Dialog.confirm({ message: '确认退出登录', title: '退出登录' }).then(async () => {
        const result = await httpRequest('/api/v2/signout', 'get')
        if (result.data.status === 1) {
          store.dispatch('recordUserId', 0)
          router.push({ name: 'MainMine', params: { logout: 'logout' } })
        }
      }).catch(() => {
        // do nothing
      })
    }

    return { logout, route, store, showDialog, themeVars }
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
.dialog{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0;
  p{
    font-size: .17rem;
    color: #333;
  }
  .tip_icon{
    width: .63rem;
    height: .63rem;
    border: 0.035rem solid #f8cb86;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: .15rem;
    span:first-child{
      width: 0.03rem;
      height: 0.35rem;
      background-color: #f8cb86;
    }
    span:last-child{
      width: 0.046rem;
      height: 0.046rem;
      border: 1px;
      border-radius: 50%;
      margin-top: 0.046rem;
      background-color: #f8cb86;
    }
  }
}

</style>

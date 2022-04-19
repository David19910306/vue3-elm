<template>
  <div class="login-container">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">密码登录</span></template>
    </Header>
    <Form class="login-form">
      <CellGroup>
        <Field
          v-model="form.username"
          name="username"
          placeholder="账号"
          :rules="[{required: true, message: '请输入账号'}]"
        >
        </Field>
        <Field
          v-model="form.password"
          type="password"
          name="password"
          placeholder="密码"
          :rules="[{required: true, message: '请输入密码'}]"
        >
        </Field>
        <Field
          v-model="form.captcha_code"
          name="code"
          placeholder="验证码"
          :rules="[{required: true, message: '请输入验证码'}]"
        >
          <template #extra>
            <section class="code-container">
              <img :src="imageUrl"/>
              <div class="changeCode">
                <span>看不清</span>
                <span @click="changeCode">换一张</span>
              </div>
            </section>
          </template>
        </Field>
      </CellGroup>
    </Form>
    <p class="login-tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login-tips">注册过的用户可凭账号密码登录</p>
    <Button color="#4cd964" style="width: 95%; margin: 0 auto; border-radius: 3px;" @click="clickLogin">登录</Button>
    <router-link to="">
      <span class="reset-password">重置密码</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { Form, Field, CellGroup, Button } from 'vant'
import Header from '@/components/header/index.vue'
import { refreshCode, login } from '@/hook/login'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: { Header, Form, Field, CellGroup, Button },
  setup () {
    const router = useRouter() // 路由跳转
    const store = useStore() // 存储用户ID
    const state = reactive({
      imageUrl: '',
      form: {
        username: '',
        password: '',
        captcha_code: ''
      }
    })

    // 组件挂载开始请求验证码
    onMounted(() => { changeCode() })

    // 刷新验证码
    const changeCode = async () => {
      const imageUrl = await refreshCode()
      state.imageUrl = imageUrl
    }

    // 登录按钮
    const clickLogin = async () => {
      // eslint-disable-next-line camelcase
      const { username, password, captcha_code } = state.form
      const result = await login(username, password, captcha_code)
      console.log(result)
      if (result.user_id) {
        store.dispatch('recordUserId', result.user_id)
        router.push({ path: '/main/mine' })
      }
    }

    return { ...toRefs(state), changeCode, clickLogin }
  }
})
</script>

<style lang="less" scoped>
.login-container{
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
  .login-form{
    margin-top: .1rem;
    .code-container{
      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        width: .82rem;
        height: .35rem;
        margin-right: .05rem;
      }
      .changeCode{
        display: flex;
        flex-direction: column;
        font-size: .13rem;
        color: #666;
        span:last-child{
          color: #3b95e9;
        }
      }
    }
  }
  .login-tips{
    font-family: Helvetica Neue,Tahoma,Arial;
    font-size: .12rem;
    color: #ff0000;
    padding: .09rem .14rem;
    line-height: .12rem;
  }
  .reset-password{
    float: right;
    font-size: .14rem;
    color: #3b95e9;
    margin-right: .1rem;
    margin-top: .23rem;
  }
}
</style>

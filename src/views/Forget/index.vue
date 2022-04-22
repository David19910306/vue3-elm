<template>
  <div class="forget">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">重置密码</span></template>
    </Header>
    <ConfigProvider :theme-vars="themeVars">
      <section class="reset-form">
          <Form>
            <CellGroup>
              <Field
                v-model.trim="form.username"
                name="account"
                placeholder="账号"
                :rules="[{ required: true, message: '请填写账号' }]"
              ></Field>
              <Field
                v-model.trim="form.oldpassWord"
                name="account"
                placeholder="旧密码"
                :type="`${oldPasswordVisible? 'text': 'password'}`"
                :rules="[{ required: true, message: '请填写旧密码' }]"
              >
                <template #right-icon>
                  <Icon name="closed-eye" size="0.23rem" @click="oldPasswordVisible = !oldPasswordVisible" v-if="!oldPasswordVisible"/>
                  <Icon name="eye-o" size="0.23rem" @click="oldPasswordVisible = !oldPasswordVisible" v-else/>
                </template>
              </Field>
              <Field
                v-model.trim="form.newpassword"
                name="account"
                placeholder="新密码"
                :type="`${newPasswordVisible? 'text': 'password'}`"
                :rules="[{ required: true, message: '请填写新密码' }]"
              >
                <template #right-icon>
                  <Icon name="closed-eye" size="0.23rem" @click="newPasswordVisible = !newPasswordVisible" v-if="!newPasswordVisible"/>
                  <Icon name="eye-o" size="0.23rem" @click="newPasswordVisible = !newPasswordVisible" v-else/>
                </template>
              </Field>
              <Field
                v-model.trim="form.confirmpassword"
                name="account"
                placeholder="确认新密码"
                :type="`${confirmPasswordVisible? 'text': 'password'}`"
                :rules="[{ required: true, message: '请在输入一次' }]"
              >
                <template #right-icon>
                  <Icon name="closed-eye" size="0.23rem" @click="confirmPasswordVisible = !confirmPasswordVisible" v-if="!confirmPasswordVisible"/>
                  <Icon name="eye-o" size="0.23rem" @click="confirmPasswordVisible = !confirmPasswordVisible" v-else/>
                </template>
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
      </section>
      <Button
        color="#4cd964"
        style="width: 95%; margin: 0 auto; border-radius: 3px; margin-top: .2rem;"
        block
        @click="resetPassword"
      >确认修改</Button>
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { Form, Field, CellGroup, ConfigProvider, Button, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import { refreshCode } from '@/hook/login'

export default defineComponent({
  name: 'Forget',
  components: { Header, Form, Field, CellGroup, ConfigProvider, Button, Icon },
  setup () {
    // 自定义样式
    const themeVars = {
      fieldPlaceholderTextColor: '#666'
    }

    const state = reactive({
      form: {},
      imageUrl: '',
      oldPasswordVisible: false, // 密码可见性
      newPasswordVisible: false, // 密码可见性
      confirmPasswordVisible: false // 密码可见性
    })

    // 组件挂载开始请求验证码
    onMounted(() => { changeCode() })

    // 刷新验证码
    const changeCode = async () => {
      const imageUrl = await refreshCode()
      state.imageUrl = imageUrl
    }

    // 修改密码
    const resetPassword = () => {
      console.log(state.form)
    }

    return { ...toRefs(state), themeVars, changeCode, resetPassword }
  }
})
</script>

<style lang="less" scoped>
.forget{
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
  .reset-form{
    margin-top: .15rem;
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
}
</style>

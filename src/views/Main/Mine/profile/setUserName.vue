<template>
  <div class="set-username">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">修改用户名</span></template>
    </Header>
    <section class="inputUserName">
      <input placeholder="请输入用户名" type="text" v-model="inputUserName"/>
      <p>用户名只能修改一次（5-14字符之间）</p>
      <Button block color="#3199e8" style="margin-top: .25rem;" @click="setUserName">确认修改</Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from 'vant'
import Header from '@/components/header/index.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'setUserName',
  components: { Header, Button },
  setup () {
    const inputUserName = ref('')
    const store = useStore()
    const router = useRouter()
    // 修改用户名
    const setUserName = () => {
      // inputUserName.value && inputUserName.value.focus()
      console.log(inputUserName.value)
      store.dispatch('setUserName', inputUserName.value)
      router.go(-1)
    }

    return { setUserName, inputUserName }
  }
})
</script>

<style lang="less" scoped>
.set-username{
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
  .inputUserName{
    margin: .1rem;
    input{
      background: none;
      width: 3.5rem;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0.046rem 0.023rem;
      line-height: .28rem;
      font-size: .168rem;
      display: block;
    }
    p{
      font-size: .136rem;
      color: #ea3106;
      padding-top: .1rem;
    }
  }
}
</style>

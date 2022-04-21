<template>
  <div class="add-address">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">新增地址</span></template>
    </Header>
    <section class="add-address-container">
      <form class="add-address-form">
        <input type="text" placeholder="请填写你的姓名" />
        <router-link to="/main/mine/profile/address/addDetail">
          <input type="text" placeholder="小区/写字楼/学校等" />
        </router-link>
        <input type="text" placeholder="请填写详细送餐地址" />
        <input type="text" placeholder="请填写你的联系方式" />
        <input type="text" placeholder="备用电话（选填）" />
      </form>
    </section>
    <Button block style="width: 95%; margin: 0 auto; margin-top: 0.15rem;" color="#4cd964">新增地址</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Button } from 'vant'
import Header from '@/components/header/index.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Add',
  components: { Header, Button },
  setup () {
    const route = useRoute()
    const state = reactive({
      form: {} // 表单的值
    })

    return { ...toRefs(state), route }
  }
})
</script>

<style lang="less" scoped>
.add-address{
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
  .add-address-container{
    margin-top: .15rem;
    background-color: #fff;
    padding: .05rem .1rem;
    input{
      margin: .05rem 0;
      width: 100%;
      background: #f2f2f2;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: .07rem;
      box-sizing: border-box;
      font-size: .144rem;
      color: #333;
    }
  }
}
</style>

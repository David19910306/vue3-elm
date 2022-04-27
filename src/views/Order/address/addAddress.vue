<template>
  <div class="add-address">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">添加地址</span></template>
    </Header>
    <section class="address-detail">
      <Form @submit="submitAddress">
        <CellGroup>
          <Field
            v-model.trim="form.name"
            name="name"
            label="用户名"
            placeholder="你的名字"
            :rules="[{ required: true, message: '请填写你的名字' }]"
          />
          <Field
            name="radio"
            label="性别"
          >
            <template #input>
              <RadioGroup v-model.trim="form.sex" direction="horizontal">
                <Radio name="1" checked-color="#4cd964">男</Radio>
                <Radio name="2" checked-color="#4cd964">女</Radio>
              </RadioGroup>
            </template>
          </Field>
          <Field
            v-model.trim="form.phone"
            name="phone"
            label="联系电话"
            placeholder="你的手机号"
            :rules="[{ required: true, message: '请填写联系电话' }]"
          />
          <router-link to="/main/mine/profile/address/addDetail">
            <Field
              v-model.trim="form.address"
              name="address"
              label="送餐地址"
              placeholder="小区/写字楼/学校/公司等"
              :rules="[{ required: true, message: '请填写送餐地址' }]"
            />
          </router-link>
          <Field
            v-model.trim="form.address_detail"
            name="address_detail"
            label="详细地址"
            placeholder="详细地址（如门牌号等）"
          />
          <Field
            v-model.trim="form.tag"
            name="tag"
            label="标签"
            placeholder="无/家/学校/公司"
          />
        </CellGroup>
        <div style="margin: 16px;">
          <Button block type="primary" native-type="submit" color="#4cd964" style="border-radius: 5px;">
            确定
          </Button>
        </div>
      </Form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Form, CellGroup, Field, RadioGroup, Radio, Button, Dialog } from 'vant'
import Header from '@/components/header/index.vue'
import { useRoute, useRouter } from 'vue-router'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'addAddress',
  components: { Header, Form, CellGroup, Field, RadioGroup, Radio, Button },
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      form: {
        name: '',
        phone: '',
        address: '',
        sex: '',
        address_detail: '',
        tag: '',
        geohash: ''
      }
    })

    state.form.address = route.params.address as string
    state.form.geohash = route.params.geohash as string

    // 提交地址
    const submitAddress = async () => {
      const response = await httpRequest(`/api/v1/users/${store.getters.getUserId}/addresses`, 'post', undefined, {
        address: state.form.address,
        address_detail: state.form.address_detail,
        geohash: state.form.geohash,
        name: state.form.name,
        phone: state.form.phone,
        tag: state.form.tag,
        sex: parseInt(state.form.sex),
        // poi_type: 0,
        phone_bk: '',
        tag_type: state.form.tag === '家' ? 2 : state.form.tag === '学校' ? 3 : state.form.tag === '公司' ? 4 : 1
      })
      const { data: { status } } = response
      status === 1 && router.push({ path: '/confirmOrder/chooseAddress' })
    }

    return { ...toRefs(state), submitAddress }
  }
})
</script>

<style lang="less" scoped>
.add-address{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .arrowLeft{
    font-size: .25rem;
  }
  .detail-center{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
}
</style>

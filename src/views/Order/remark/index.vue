<template>
  <div class="remark">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">订单备注</span></template>
    </Header>
    <section class="quick-remark">
      <header class="header-style">快速备注</header>
      <ul class="remark-arr-list-ul">
        <li class="remark-arr-list-li" v-for="remark in remarks" :key="remark">
          <span
            v-for="(mark, markIndex) in remark" :key="mark"
            @click="selectMark(mark, remark)"
            :class="{
              'remark-item-li': true,
              'first': markIndex === 0,
              'choosed': selectRemarks.indexOf(remark) > -1 &&
                (remark.length === 1? true: remark.length === 2? currentMark2 === mark: remark.length === 3? currentMark3 === mark: false),
              'last': markIndex === remark.length - 1}"
            >
              {{mark}}
          </span>
        </li>
      </ul>
    </section>
    <section class="quick-remark">
      <header class="header-style">其他信息</header>
      <textarea placeholder="请输入备注内容(可不填)" class="input-text" v-model="otherRemark"></textarea>
    </section>
    <Button block style="width: 90%; margin: 0 auto; border-radius: 5px;" color="#4cd964" @click="confirmClick">确定</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { Button } from 'vant'
// import { UUID } from 'uuid-generator-ts'
import Header from '@/components/header/index.vue'
import { useRoute, useRouter } from 'vue-router'
import httpRequest from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Remark',
  components: { Header, Button },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // console.log(route)
    const remarks = ref([]) // 备注信息
    const currentMark2 = ref('')
    const currentMark3 = ref('')
    const choosedMark: Ref<string[]> = ref([])
    const selectRemarks: Ref<string[][]> = ref([])
    const otherRemark = ref('') // 其他备注信息（可不填）
    /* eslint-disable camelcase */
    const { cart_id } = route.params

    onMounted(async () => {
      const result = await httpRequest(`/api/v1/carts/${cart_id}/remarks`, 'get')
      // console.log(result)
      if (result.status === 200) remarks.value = result.data.remarks
      // console.log(remarks.value)
    })

    const selectMark = (mark: string, remarks:string[]) => {
      // 判断remarks的长度是否为1
      if (remarks.length === 1) {
        if (selectRemarks.value.indexOf(remarks) === -1) {
          selectRemarks.value.push(remarks)
        } else {
          const currentIndex: number = selectRemarks.value.indexOf(remarks)
          selectRemarks.value.splice(currentIndex, 1)
        }
      } else if (remarks.length === 2) { // remarks的大于1
        currentMark2.value = mark

        if (selectRemarks.value.indexOf(remarks) === -1 && choosedMark.value.indexOf(mark) === -1) {
          selectRemarks.value.push(remarks)
          choosedMark.value.push(mark)
        } else {
          const currentIndex: number = selectRemarks.value.indexOf(remarks)
          selectRemarks.value.splice(currentIndex, 1)
          const currentMark: number = choosedMark.value.indexOf(mark)
          // console.log(currentMark, 'currentMark')
          choosedMark.value.splice(currentMark, 1)
          // console.log(choosedMark.value, 'choosedMark')
        }
      } else {
        currentMark3.value = mark
        if (selectRemarks.value.indexOf(remarks) === -1 && choosedMark.value.indexOf(mark) === -1) {
          selectRemarks.value.push(remarks)
          choosedMark.value.push(mark)
        } else {
          const currentIndex: number = selectRemarks.value.indexOf(remarks)
          const currentMark: number = choosedMark.value.indexOf(mark)
          selectRemarks.value.splice(currentIndex, 1)
          choosedMark.value.splice(currentMark, 1)
        }
      }
    }

    const confirmClick = () => {
      const finalMark = [...choosedMark.value, ...[...selectRemarks.value.filter(select => select.length === 1)].map(single => single[0])]
      if (otherRemark.value !== '') finalMark.push(otherRemark.value)
      // console.log(finalMark)
      store.dispatch('recordOrderRemarks', finalMark)
      router.go(-1) // 返回支付界面
    }

    return { remarks, selectMark, currentMark2, currentMark3, selectRemarks, confirmClick, choosedMark, otherRemark }
  }
})
</script>

<style lang="less" scoped>
.remark{
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
  .quick-remark{
    margin-top: .1rem;
    padding: 0 .14rem .23rem;
    background-color: #fff;
    .header-style{
      color: #333;
      font-size: .155rem;
      line-height: .46rem;
    }
    .remark-arr-list-ul{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: .14rem;
        margin-bottom: .14rem;
        .first{
          border-left: 0.005rem solid #3190e8;
          border-top-left-radius: 0.05rem;
          border-bottom-left-radius: 0.05rem;
        }
        .last{
          border-top-right-radius: 0.05rem;
          border-bottom-right-radius: 0.05rem;
        }
        .choosed{
          color: #fff;
          background-color: #3190e8;
        }
        span{
          font-size: .14rem;
          color: #333;
          padding: 0.07rem 0.14rem;
          border: 0.005rem solid #3190e8;
          border-left: 0;
        }
      }
    }
    .input-text{
      width: 92.5%;
      background-color: #f9f9f9;
      border: 0.005rem solid #eee;
      resize: none;
      min-height: 1.035rem;
      border-radius: 0.05rem;
      font-size: .14rem;
      color: #666;
      padding: 0.12rem;
    }
  }
}
</style>

<template>
  <div class="remark">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">订单备注</span></template>
    </Header>
    <section class="quick-remark">
      <header class="header-style">快速备注</header>
      <ul class="remark-arr-list-ul">
        <li class="remark-arr-list-li" v-for="(remark, remarkIndex) in remarks" :key="remarkIndex">
          <span
            v-for="(mark, markIndex) in remark" :key="markIndex"
            @click="selectMark(mark, remark)"
            :class="{
              'remark-item-li': true,
              'first': markIndex === 0,
              'choosed': selectRemarks.indexOf(mark) > -1 && (remark.length > 1? currentMark === mark: true),
              'last': markIndex === remark.length - 1}"
            >
              {{mark}}
          </span>
        </li>
      </ul>
    </section>
    <section class="quick-remark">
      <header class="header-style">其他信息</header>
      <textarea placeholder="请输入备注内容(可不填)" class="input-text"></textarea>
    </section>
    <Button block style="width: 90%; margin: 0 auto; border-radius: 5px;" color="#4cd964" @click="confirmClick">确定</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { Button } from 'vant'
import Header from '@/components/header/index.vue'
import { useRoute } from 'vue-router'
import httpRequest from '@/api'

export default defineComponent({
  name: 'Remark',
  components: { Header, Button },
  setup () {
    const route = useRoute()
    // console.log(route)
    const remarks = ref([]) // 备注信息
    const currentMark = ref('')
    // const selectRemarks: Ref<[][]> = ref([])
    const selectRemarks: Ref<string[]> = ref([])
    /* eslint-disable camelcase */
    const { cart_id } = route.params

    onMounted(async () => {
      const result = await httpRequest(`/api/v1/carts/${cart_id}/remarks`, 'get')
      // console.log(result)
      if (result.status === 200) remarks.value = result.data.remarks
      // console.log(remarks.value)
    })

    const selectMark = (mark: string, remarks:string[]) => {
      // selectRemarks.value = remark
      if (selectRemarks.value.indexOf(mark) === -1) {
        // selectRemarks.value.push(remarks)
        if (remarks.length > 1) {
          // console.log(remarks, mark)
          currentMark.value = mark
          console.log(selectRemarks.value)
          selectRemarks.value = [...remarks.filter(remark => remark === mark), ...selectRemarks.value]
        } else {
          selectRemarks.value.push(remarks[0])
        }
      } else {
        if (remarks.length > 1) {
          // console.log(remarks, mark)
          const spliceIndex = selectRemarks.value.indexOf(currentMark.value)
          selectRemarks.value.splice(spliceIndex, 1)
        } else {
          const spliceIndex = selectRemarks.value.indexOf(remarks[0])
          selectRemarks.value.splice(spliceIndex, 1)
        }
        // const spliceIndex = selectRemarks.value.indexOf(mark)
        // selectRemarks.value.splice(spliceIndex, 1)
      }
    }

    const confirmClick = () => {
      console.log(selectRemarks.value)
    }

    return { remarks, selectMark, currentMark, selectRemarks, confirmClick }
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

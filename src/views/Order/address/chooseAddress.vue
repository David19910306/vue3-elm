<template>
  <div class="choose-address">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">选择地址</span></template>
      <template v-slot:right><span><i class="iconfont icon-31wode user-icon"></i></span></template>
    </Header>
    <ul class="address-ul">
      <li>
        <Icon name="checked" color="#4CD964" size="0.25rem"/>
        <section class="address-detail">
          <span class="name">
            戴义<span class="phone">先生 17607162307</span>
          </span>
          <span class="address-tag">
            <Tag color="#ff8f1f">公司</Tag>
            <span class="detail">一期</span>
          </span>
        </section>
      </li>
    </ul>
    <footer class="addBtn">
      <Icon name="add-o" color="##3190e8" size="0.2rem"/>
      <span>新增收货地址</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon, Tag } from 'vant'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'chooseAddress',
  components: { Header, Icon, Tag },
  setup () {
    console.log('@')
  }
})
</script>

<style lang="less" scoped>
.choose-address{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .arrowLeft{
    font-size: .25rem;
  }
  .user-icon{
    font-size: .25rem;
    font-weight: bolder;
  }
  .detail-center{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .addBtn{
    height: .575rem;
    color: #3190e8;
    text-align: center;
    line-height: .575rem;
    span{
      font-size: .1725rem;
      vertical-align: middle;
    }
  }
  .address-ul{
    flex: 1;
    overflow-y: auto;
    li{
      display: flex;
      align-items: center;
      border-bottom: .0057rem solid #f5f5f5;
      padding: .1rem .15rem;
      line-height: .24rem;
      .address-detail{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 0 0.138rem;
        .name{
          font-size: .184rem;
          color: #333;
          font-weight: 700;
          .phone{
            font-family: Helvetica Neue,Tahoma,Arial;
            font-size: .15rem;
            color: #333;
            font-weight: 400;
          }
        }
        .address-tag .detail{
          margin-left: 0.115rem;
          color: #777;
          font-size: .13rem;
        }
      }
    }
  }
}
</style>

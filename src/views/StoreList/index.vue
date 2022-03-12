<template>
  <div class="store-list-container">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo leftIcon"></i></span></template>
      <template v-slot:center><span class="title">美食</span></template>
      <template v-slot:right><span>登录|注册</span></template>
    </Header>
    <ConfigProvider :theme-vars="themeVar">
      <DropdownMenu>
        <DropdownItem title="分类">
          <section class="type">
            <section class="foodType">
              <ul>
                <li>
                  <span class="specs">
                    <img src="https://img2.baidu.com/it/u=1100246879,1702373665&fm=253&fmt=auto&app=138&f=JPEG" alt="icon"/>
                    <label>特色料理</label>
                  </span>
                  <span class="count">
                    <Tag rond color="#f5f5f5">1920</Tag>
                    <span class="iconfont icon-fangxiang-you"></span>
                  </span>
                </li>
              </ul>
            </section>
            <section class="foodName"></section>
          </section>
        </DropdownItem>
        <DropdownItem title="排序">
          <section class="type"></section>
        </DropdownItem>
        <DropdownItem title="筛选">
          <section class="type"></section>
        </DropdownItem>
      </DropdownMenu>
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DropdownMenu, DropdownItem, ConfigProvider, Tag } from 'vant'
import Header from '@/components/header/index.vue'

export default defineComponent({
  components: { Header, DropdownMenu, DropdownItem, ConfigProvider, Tag },
  setup () {
    // 配置下拉框的样式
    const themeVar = {
      dropdownMenuHeight: '.4rem',
      dropdownMenuTitleFontSize: '.12rem',
      dropdownMenuTitleActiveTextColor: '#3190e8'
    }

    return { themeVar }
  }
})
</script>

<style lang="less" scoped>
.store-list-container{
  height: 100%;
  .leftIcon{
    font-size: .23rem;
    font-weight: bolder;
  }
  .title{
    font-size: .1875rem;
    color: #fff;
    font-weight: 600;
  }
  .type{
    height: 3rem;
    width: 100%;
    display: flex;
    .foodType{
      width: 50%;
      ul li{
        padding: 0 .1rem;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .specs{
          color: #333;
          font-size: .12rem;
          line-height: .25rem;
          img{
            width: .25rem;
            height: .25rem;
            margin-right: .1rem;
          }
        }
        .count{
          font-size: .12rem;
        }
      }
    }
    .foodName{
      flex: 1;
    }
  }
}
</style>

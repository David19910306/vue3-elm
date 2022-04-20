<template>
  <div class="header">
    <div class="left" @click="clickHandler"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right" @click="clickHandler"><slot name="right"></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Header',
  props: ['iconName'],
  setup () {
    const router = useRouter()
    // 两侧图标点击
    const clickHandler = (event:any) => {
      const { target } = event
      // console.log(event)
      target.className.includes('searchIcon') ? router.push({ path: '/main/search' }) : target.className.includes('leftIcon') ? router.go(-1)
        : target.innerHTML === '登录|注册' ? router.push({ path: '/login' })
          : target.className.includes('user-icon') ? router.push({ path: '/main/mine' }) : router.push({ path: '' })
    }

    return { clickHandler }
  }
})
</script>

<style lang="less" scoped>
.header{
  height: .4752rem;
  background-color: #3190e8;
  display: flex;
  font-size: .15rem;
  color: #fff;
  line-height: .4752rem;
  .left{
    width: .6rem;
    text-align: center;
  }
  .right{
    width: .8rem;
    text-align: center;
  }
  .center{
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

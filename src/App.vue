<template>
  <router-view v-slot="{Component}">
    <!--include表示支队MainMsite组件进行缓存-->
    <keep-alive include="MainMsite">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
</template>

<style lang="less">
html, body{
  width: 100%;
  height: 100%;
  #app{
    width: 100%;
    height: 100%;
  }
}
</style>

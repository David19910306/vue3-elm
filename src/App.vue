<template>
  <router-view v-slot="{Component}">
    <!--include表示只对Main组件进行缓存-->
    <keep-alive include="Main">
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

<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
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

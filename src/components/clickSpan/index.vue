<template>
  <span @click="selectCheckedGroupHandler(unique)">
    <i class="iconfont icon-duigou" style="color: #3E90E8;font-weight: bolder;"  v-if="selectChecked === unique"></i>
    <i :class="`iconfont ${iconfontClass}`" :style="{color:color}" v-else></i>
    <label :class="{activeLabel: selectChecked === unique}">{{label}}</label>
  </span>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ClickSpan',
  props: ['unique', 'label', 'iconfontClass', 'color'],
  setup (props, context) {
    const selectChecked = ref('')
    const selectCheckedGroupCount = ref(0)
    const selectCheckedGroupHandler = (unique:string) => {
      selectCheckedGroupCount.value++
      if (selectCheckedGroupCount.value % 2 !== 0) {
        selectChecked.value = unique
        context.emit('getGroupSelect', selectChecked.value)
      } else {
        selectChecked.value = `${selectChecked.value},delete`
        context.emit('getGroupSelect', selectChecked.value)
      }
    }

    return { selectCheckedGroupHandler, selectChecked }
  }
})
</script>

<style lang="less" scoped>
span{
  border: .0005rem solid #eee;
  border-radius: .05rem;
  padding: .05rem .1rem;
  width: .8rem;
  display: flex;
  align-items: center;
  i{
    font-size: .2rem;
    margin-right: .05rem;
  }
  label {
    font-size: .12rem;
    vertical-align: middle;
    flex: 1;
  }
  .activeLabel{
    color: #3E90E8;
  }
}
</style>

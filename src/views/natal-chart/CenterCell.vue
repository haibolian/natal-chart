<template>
  <div :class="`natal-chart__center`">
    {{ name }}
    {{ lunarDate }}
    {{ numTime }}
    {{ wuxingGame }}
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
const props = defineProps({
  name: String,
  lunarDate: String,
  numTime: String,
  lunarInfo: Object,
  wuxingGame: Object
})
</script>

<style>
  .natal-chart__center {
    background-color: pink;
    grid-area: center;
  }
</style>
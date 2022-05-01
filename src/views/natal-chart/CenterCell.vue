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
  wuxingGame: String
})
</script>

<style>
  .natal-chart__center {
    background-color: pink;
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
  }
</style>
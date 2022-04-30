<template>
  <div :class="`natal-chart__palace natal-chart__palace__${ code }`">
    {{ tiangan }}
    {{ dizhi }}
    {{ isFate ? '命宫' : '' }}
    {{ isBody ? '身宫' : '' }}
    {{ name }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  code: String,
  dizhi: String,
  tiangan: String,
  isFate: Boolean,
  isBody: Boolean,
  name: String
})
</script>

<style>
  .natal-chart__palace {
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #00000080;
  }
</style>
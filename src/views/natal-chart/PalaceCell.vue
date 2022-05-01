<template>
  <div 
    :class="`natal-chart__palace natal-chart__palace__${ dizhiCode }`"
    :style="{ gridArea: dizhiCode }"
  >
    {{ tiangan }}
    {{ dizhi }}
    {{ isFate ? '命宫' : '' }}
    {{ isBody ? '身宫' : '' }}
    {{ name }}
    <div v-for="(star, index) in mainStars" :key="index">
     {{ star.name }}
    </div>
    <div v-for="(star, index) in smallStars" :key="index">
      {{ star.name }}
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  dizhiCode: String,
  code: String,
  dizhi: String,
  tiangan: String,
  isFate: Boolean,
  isBody: Boolean,
  name: String,
  mainStars: Array,
  smallStars: Array
})
</script>

<style>
  .natal-chart__palace {
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #00000080;
  }
</style>
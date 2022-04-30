<template>
  <div class="life-chart">
    <div class="life-chart__body">

    </div>
  </div>
</template>

<script setup>
import usePalaces from './hooks/usePalaces'

const {
  dizhi
} = usePalaces


</script>

<style>
.life-chart {
  text-align: center;
}

.life-chart__body {
  background-color: pink;
  width: 94vw;
  height: 96vh;
  margin: 3vw;
}

/* 4*24 */
</style>


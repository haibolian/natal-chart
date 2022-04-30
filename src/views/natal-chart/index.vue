<template>
  <div class="natal-chart">
    <div class="natal-chart__body">
      <template v-for="palace in natalChart" key="palace.code">
        <PalaceCell v-bind="palace" />
        <CenterCell v-if="palace.code == 'chen'"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import CenterCell from './CenterCell.vue';
import PalaceCell from './PalaceCell.vue';
import useNatalChart from './hooks/useNatalChart';

const {
  natalChart,
  natalChartMap
} = useNatalChart

</script>

<style>
.natal-chart {
  
}

.natal-chart__body {
  box-sizing: border-box;
  border-radius: 4px;
  width: 96vw;
  height: 96vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 0;
}





</style>


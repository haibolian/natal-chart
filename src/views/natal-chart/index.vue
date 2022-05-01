<template>
  <div class="natal-chart">
    <div class="natal-chart__body">
      <template v-for="palace in natalChart" key="palace.code">
        <PalaceCell v-bind="palace" />
        <CenterCell v-bind="person" v-if="palace.code == 'chen'"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import CenterCell from './CenterCell.vue';
import PalaceCell from './PalaceCell.vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Person from './utils/Person';

const route = useRoute()
const person = new Person(route.query)

const { natalChart, natalChartMap } = person

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


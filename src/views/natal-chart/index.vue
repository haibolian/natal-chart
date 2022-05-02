<template>
  <div class="natal-chart">
    <div class="natal-chart__body" ref="natalChartDom">
      <template v-for="palace in natalChart" key="palace.code">
        <PalaceCell v-bind="palace" />
        <CenterCell v-bind="person" v-if="palace.dizhiCode == 'chen'"/>
      </template>
      <div class="canvas-wapper" v-if="natalChartDom">
        <canvas id="sanfang" :width="natalChartDom?.clientWidth" :height="natalChartDom?.clientHeight"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import CenterCell from './CenterCell.vue';
import PalaceCell from './PalaceCell.vue';
import { reactive, ref, onMounted, provide, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Person from './utils/Person';

const route = useRoute()
const person = new Person(route.query)

const { natalChart, natalChartMap } = person

const pRefs = reactive({})

const natalChartDom = ref(null)

provide('prefs', {
  pRefs,
  addRef(dz, r){
    pRefs[dz] = r
  }
})

const drawSanfangSizheng = ()=>{
  const { fatePalaceIndex } = person
  const startDz = person.getPalace(fatePalaceIndex)?.dizhiCode
  const leftDz = person.getPalace(fatePalaceIndex - 4)?.dizhiCode
  const rightDz = person.getPalace(fatePalaceIndex + 4)?.dizhiCode
  const faceDz = person.getPalace(fatePalaceIndex + 6)?.dizhiCode
  const startPoint = getPoint(startDz)
  const leftPoint = getPoint(leftDz)
  const rightPoint = getPoint(rightDz)
  const facePoint = getPoint(faceDz)
  draw(startPoint, leftPoint, rightPoint, facePoint)
}

const getPoint = (dz) => {
  const { right, bottom, top, left, width, height } = pRefs[dz].getBoundingClientRect()
  const point = { x: 0, y: 0 }
  switch (dz) {
    case 'si':
      point.x = right
      point.y = bottom
      break;
    case 'wu':
      point.x = right - (width / 2)
      point.y = bottom
      break;
    case 'wei':
      point.x = right - (width / 2)
      point.y = bottom
      break;
    case 'shen':
      point.x = left
      point.y = bottom
      break;
    case 'chen':
      point.x = right
      point.y = bottom - (height / 2)
      break;
    case 'mao':
      point.x = right
      point.y = bottom - (height / 2)
      break;
    case 'you':
      point.x = left
      point.y = bottom - (height / 2)
      break;
    case 'xu':
      point.x = left
      point.y = bottom - (height / 2)
      break;
    case 'yin':
      point.x = right
      point.y = top
      break;
    case 'chou':
      point.x = right - (width / 2)
      point.y = top
      break;
    case 'zi':
      point.x = right - (width / 2)
      point.y = top
      break;
    case 'hai':
      point.x = left
      point.y = top
      break;
  
    default:
      break;
  }
  return point
}
const draw = (sp, lp, rp, fp) => {
  const canvas = document.getElementById('sanfang')
  if (!canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'pink'
  ctx.setLineDash([5, 10]);  // [实线长度, 间隙长度]
  ctx.beginPath();
  ctx.moveTo(sp.x, sp.y);
  ctx.lineTo(lp.x, lp.y);
  ctx.lineTo(rp.x, rp.y);
  ctx.closePath();
  ctx.stroke()

  ctx.beginPath();
  ctx.moveTo(sp.x, sp.y)
  ctx.lineTo(fp.x, fp.y)
  ctx.closePath()
  ctx.stroke()
}
watch(natalChartDom, ()=>{
  nextTick(()=>{
    drawSanfangSizheng()
  })
})

</script>

<style>
.natal-chart {
  
}
.canvas-wapper{
  position: absolute;
  width: 100%;
  height: 100%;
}

.natal-chart__body {
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 0;
  grid-template-areas: 'si wu wei shen'
                       'chen center center you'
                       'mao center center xu'
                       'yin chou zi hai';
}
</style>


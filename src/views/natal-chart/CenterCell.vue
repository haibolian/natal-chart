<template>
  <div :class="`natal-chart__center`">
    <van-row justify="space-between">
      <van-col span="12">
        姓名:{{ name }}
      </van-col>
      <van-col class="person-property" span="12">
        {{ wuxingGame.name }}
      </van-col>
      <van-col span="24">
        <div class="flex-between">
          <span> 阳历:{{ solar }} </span>
          <span>{{ shichen + '时'}}</span>
        </div>
      </van-col>
      <van-col span="24">
        <div class="flex-between">
          <span>阴历:{{ lunar }}</span>
          <span>{{ shichen + '时'}}</span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  name: String,
  lunarDate: String,
  numTime: String,
  lunarInfo: Object,
  wuxingGame: Object,
  shichen: String
})

const lunar = computed(()=>{
  const { lYear, IMonthCn, IDayCn } = props.lunarInfo
  return `${lYear}年${IMonthCn}${IDayCn}`
})

const solar = computed(()=>{
  const { cYear, cMonth, cDay } = props.lunarInfo
  return `${cYear}年${cMonth}月${cDay}`
})

</script>

<style>
  .natal-chart__center {
    background-color: #fff;
    grid-area: center;
    padding: 1rem;
  }
  .person-property {
    text-align: right;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .van-col {
    margin-bottom: .2rem;
  }
</style>
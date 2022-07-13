<template>
  <div class="select-birthday">
    <van-cell-group inset>
      <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
      <van-cell 
        title="出生日期" 
        is-link
        :value="birthday" 
        @click="showPicker = true"
      />
    </van-cell-group>
    <van-cell-group class="calc-button" inset>
      <van-cell>
        <van-button type="primary" @click="generateNatalChart()" size="small">阳历计算</van-button>
        <van-button type="primary" @click="generateNatalChart(true)" size="small">农历计算</van-button>
      </van-cell>
    </van-cell-group>
    <van-popup position="bottom" v-model:show="showPicker">
      <van-datetime-picker
        v-model="selectedDate"
        type="datetime"
        title="选择日期时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleDateConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { solar2lunar } from '@/utils/date-transform';
import { formatDate } from '@/utils/index';
import { Dialog } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const selectedDate = ref(new Date(2022,1,1))
const birthday = ref('')
const name = ref('')
const minDate = new Date(1900, 1, 1)
const maxDate = new Date(2100, 1, 1)
const showPicker = ref(false)

const handleDateConfirm = ( value )=>{
  birthday.value = value?.toLocaleString()
  showPicker.value = false
}

const router = useRouter()

const generateNatalChart = (isLunar)=>{
  if(!birthday.value) return Dialog({ message: '请先选择出生日期' });
  const lunar = selectedDate.value
  if(!isLunar){
    const y = lunar.getFullYear()
    const m = lunar.getMonth() + 1
    const d = lunar.getDate()
    const { lYear, lMonth, lDay } = solar2lunar(y, m, d); 
    lunar.setFullYear(lYear)
    lunar.setMonth(lMonth - 1)
    lunar.setDate(lDay)
  }
  const formatedDate = formatDate(lunar, '-', ':')

  router.push({
    path: '/natal-chart',
    query: {
      name: name.value,
      d: formatedDate.date,
      t: formatedDate.time
    }
  })





  


}
</script>

<style>
.calc-button.van-cell-group {
  margin-top: 2rem;
}
.calc-button.van-cell-group .van-cell__value {
  display: flex;
  justify-content: space-around;
}
.calc-button .van-button {
  width: 40%;
}
</style>

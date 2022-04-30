import { ref, reactive } from 'vue';

class Palace {
  constructor(options){
    this.dizhi = options.dizhi
    this.code = options.code
  }
}

const dizhi = [
  { dizhi: '巳', code: 'si' },
  { dizhi: '午', code: 'wu' },
  { dizhi: '未', code: 'wei' },
  { dizhi: '申', code: 'shen' },
  { dizhi: '辰', code: 'chen' },
  { dizhi: '酉', code: 'you' },
  { dizhi: '卯', code: 'mao' },
  { dizhi: '戌', code: 'xu' },
  { dizhi: '寅', code: 'yan' },
  { dizhi: '丑', code: 'chou' },
  { dizhi: '子', code: 'zi' },
  { dizhi: '亥', code: 'hai' }
]

const natalChart = reactive([])
dizhi.forEach(item => {
  natalChart.push( new Palace(item) )
})

const natalChartMap = reactive({})

dizhi.forEach( item => {
  natalChartMap[item.code] = item
})

export default {
  natalChart,
  natalChartMap
}
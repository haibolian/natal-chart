import { reactive } from 'vue';
import { lunar2solar } from '@/utils/date-transform';
import { tiangan, dizhi, dizhiChart, getShichen, palaceNames } from '../utils/map';
import { getYingongStartTiangan } from '../utils/map';
import Palace from './Palace';
class Person {
   #fillOrder = ['yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai', 'zi', 'chou']

  constructor(ops){
    this.name = ops.name
    this.lunarDate = ops.d
    this.numTime = ops.t
    this.init()
  }
  init(){
    this.generateLunarInfo()
    this.setShichen()
    this.initPalaces()
    this.fillTiangan()
    this.setFatePalace()
    this.setBodyPalace()
    this.setOtherPalace()
    this.setWuxingGame()
  }
  // 生成农历信息
  generateLunarInfo(){
    const date = this.lunarDate.split('-')?.map(n => Number(n))
    this.lunarInfo = lunar2solar(...date)
    this.lMonth = this.lunarInfo.lMonth
    this.lDay = this.lunarInfo.lDay
  }
  // 设置时辰
  setShichen(){
    const { shichen, index } = getShichen(this.numTime)
    this.shichen = shichen
    this.shichenIndex = index
  }
  // 生成十二宫
  initPalaces(){
    this.natalChart = reactive([])
    dizhiChart.forEach(item => {
      this.natalChart.push( new Palace(item) )
    })
    this.natalChartMap = reactive({})
    this.natalChart.forEach( item => {
      this.natalChartMap[item.code] = item
    })
  }
// 填充天干
  fillTiangan(){
    const { name, index } = getYingongStartTiangan(this.lunarInfo.lYear)
    const orderedTiangan = [ ...tiangan.slice(index),  ...tiangan.slice(0, index + 2)];
    this.#fillOrder.forEach((dizhi, idx) => {
      this.natalChartMap[dizhi].setTiangan(orderedTiangan[idx])
    })
  }
  // 设置命宫
  setFatePalace() {
    // 寅开始，顺时针从 1 开始到生月，然后逆时针从 1 开始到时辰
    let index = this.lMonth - 1 - this.shichenIndex
    if(index < 0) index = index + 12
    const fate = this.#fillOrder[index]
    this.natalChartMap[fate].setFatePalace()
    this.fatePalaceIndex = index
  }
  // 设置身宫
  setBodyPalace() {
    let index = this.lMonth - 1 + this.shichenIndex
    if(index > 12) index = index - 12
    const body = this.#fillOrder[index]
    this.natalChartMap[body].setBodyPalace()
    this.bodyPalaceIndex = index
  }
  // 设置其他宫位
  setOtherPalace() {
    const fatePalaceIndex = this.fatePalaceIndex
    const otherPalace = [...this.#fillOrder.slice(fatePalaceIndex + 1), ...this.#fillOrder.slice(0, fatePalaceIndex)]
    otherPalace.forEach((palace, index) => {
      this.natalChartMap[palace]?.setPalaceName(palaceNames[index])
    })
  }
  // 设置五行局
  setWuxingGame() {
    const fatePalaceName = this.#fillOrder[this.fatePalaceIndex]
    const { tiangan: t, dizhi: d } = this.natalChartMap[fatePalaceName]
    const tIndex = tiangan.findIndex(name => t === name)
    const dIndex = dizhi.findIndex( name => d === name )
    const tCalcDep = ['金四局', '水一局', '火六局', '土五局', '木三局']
    // 根据天干计算到某一个五行局
    const t2Index = parseInt(tIndex / 2)
    // 找出地支所需的剩下的连续三个五行局
    let dCalcDep = tCalcDep.slice(t2Index, t2Index + 3)
    const dif = 3 - dCalcDep.length
    if(dif > 0) dCalcDep = dCalcDep.concat(tCalcDep.slice(0, dif))
    let d2Index = parseInt(dIndex / 2)

    this.wuxingGame = dCalcDep[d2Index > 2 ? d2Index - 3 : d2Index]
  }
  
}

export default Person

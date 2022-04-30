import { ref, reactive } from 'vue';
import { lunar2solar } from '@/utils/date-transform';
import { tiangan, dizhi, dizhiChart, getShichen, palaceNames } from '../utils/map';
import { getYingongStartTiangan } from '../utils/map';
class Person {
  constructor(ops){
    this.name = ops.name
    this.lunarDate = ops.d
    this.numTime = ops.t
    this.generateLunarInfo()
    this.setShichen()
  }

  generateLunarInfo(){
    const date = this.lunarDate.split('-')?.map(n => Number(n))
    this.lunarInfo = lunar2solar(...date)
    this.lMonth = this.lunarInfo.lMonth
    this.lDay = this.lunarInfo.lDay
  }

  setShichen(){
    const { shichen, index } = getShichen(this.numTime)
    this.shichen = shichen
    this.shichenIndex = index
  }

  setFatePalaceIndex(index){
    this.fatePalaceIndex = index
  }
  setBodyPalaceIndex(index){
    this.bodyPalaceIndex = index
  }
  setWuxingGame(wuxingGame){
    this.wuxingGame = wuxingGame
  }
  
}

class Palace {
  constructor(ops){
    this.dizhi = ops.dizhi
    this.code = ops.code
    this.isFate = false
    this.isBody = false
  }
  setTiangan(tiangan){
    this.tiangan = tiangan
  }
  setFatePalace(){
    this.isFate = true
  }
  setBodyPalace(){
    this.isBody = true
  }
  setPalaceName(name){
    this.name = name
  }

}

const natalChart = reactive([])
dizhiChart.forEach(item => {
  natalChart.push( new Palace(item) )
})

const natalChartMap = reactive({})

natalChart.forEach( item => {
  natalChartMap[item.code] = item
})

let person = reactive({})

const initPerson = (ops) => {
  person = new Person(ops)
  fillTiangan()
  return person
}

// 填充天干
const fillOrder = ['yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai', 'zi', 'chou']
const fillTiangan = () => {
  const { name, index } = getYingongStartTiangan(person.lunarInfo.lYear)
  const orderedTiangan = [ ...tiangan.slice(index),  ...tiangan.slice(0, index + 2)]
  fillOrder.forEach((dizhi, idx) => {
    natalChartMap[dizhi].setTiangan(orderedTiangan[idx])
    // debugger
  })
  // 设置命宫和身宫
  setFatePalace()
  setBodyPalace()
  setOtherPalace()
  setWuxingGame()
}

const setFatePalace = () => {
  // 寅开始，顺时针从 1 开始到生月，然后逆时针从 1 开始到时辰
  let index = person.lMonth - 1 - person.shichenIndex
  if(index < 0) index = index + 12
  const fate = fillOrder[index]
  natalChartMap[fate].setFatePalace()
  person.setFatePalaceIndex(index)
}
const setBodyPalace = () => {
  let index = person.lMonth - 1 + person.shichenIndex
  if(index > 12) index = index - 12
  const body = fillOrder[index]
  natalChartMap[body].setBodyPalace()
  person.setBodyPalaceIndex(index)
}

const setOtherPalace = () => {
  const fatePalaceIndex = person.fatePalaceIndex
  const otherPalace = [...fillOrder.slice(fatePalaceIndex + 1), ...fillOrder.slice(0, fatePalaceIndex)]
  otherPalace.forEach((palace, index) => {
    natalChartMap[palace]?.setPalaceName(palaceNames[index])
  })
}

const setWuxingGame = () => {
  const fatePalaceName = fillOrder[person.fatePalaceIndex]
  const { tiangan: t, dizhi: d } = natalChartMap[fatePalaceName]
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

  person.setWuxingGame(dCalcDep[d2Index > 2 ? d2Index - 3 : d2Index])
  

  
}


export default {
  natalChart,
  natalChartMap,
  initPerson
}

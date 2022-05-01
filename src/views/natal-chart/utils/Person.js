import { reactive } from 'vue';
import { lunar2solar } from '@/utils/date-transform';
import { tiangan,
  dizhi,
  dizhiChart,
  getShichen,
  palaceNames,
  wuxingGame,
  mainStarsWithZiwei,
  mainStarsWithTianfu
} from '../utils/map';
import { getYingongStartTiangan } from '../utils/map';
import Palace from './Palace';
class Person {
  #fillOrder = ['yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai', 'zi', 'chou']
  #getFillOrder = function(index){
    if(index < 0) {
      return this.#fillOrder[index + 12]
    }else if(index < 12) {
      return this.#fillOrder[index]
    }else{
      return this.#fillOrder[index - 12]
    }
  }
  constructor(ops){
    this.name = ops.name
    this.lunarDate = ops.d
    this.numTime = ops.t
    this.stars2Palace = {}
    this.palaces = {}
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
    const zIndex = this.setZiweiStars()
    this.setTianfuStars(zIndex)
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
      this.natalChartMap[item.dizhiCode] = item
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
    this.natalChartMap[fate].setFatePalace(index)
    this.palaces['ming'] = this.natalChartMap[fate]
    this.fatePalaceIndex = index
  }
  // 设置身宫
  setBodyPalace() {
    let index = this.lMonth - 1 + this.shichenIndex
    if(index > 12) index = index - 12
    const body = this.#fillOrder[index]
    this.natalChartMap[body].setBodyPalace(index)
    this.palaces['shen'] = this.natalChartMap[body]
    this.bodyPalaceIndex = index
  }
  // 设置其他宫位
  setOtherPalace() {
    const fatePalaceIndex = this.fatePalaceIndex
    const otherPalace = [...this.#fillOrder.slice(fatePalaceIndex + 1), ...this.#fillOrder.slice(0, fatePalaceIndex)]
    otherPalace.forEach((dizhi, index) => {
      const palace = palaceNames[index]
      const palaceIndex = fatePalaceIndex + index + 1
      this.natalChartMap[dizhi]?.setPalaceName(palace, palaceIndex > 11 ? palaceIndex - 12 : palaceIndex)
      this.palaces[palace.code] = this.natalChartMap[dizhi]
    })
  }
  // 设置五行局
  setWuxingGame() {
    const fatePalaceName = this.#fillOrder[this.fatePalaceIndex]
    const { tiangan: t, dizhi: d } = this.natalChartMap[fatePalaceName]
    const tIndex = tiangan.findIndex(name => t === name)
    const dIndex = dizhi.findIndex( name => d === name )
    // 根据天干计算到某一个五行局
    const t2Index = parseInt(tIndex / 2)
    // 找出地支所需的剩下的连续三个五行局
    let dCalcDep = wuxingGame.slice(t2Index, t2Index + 3)
    const dif = 3 - dCalcDep.length
    if(dif > 0) dCalcDep = dCalcDep.concat(wuxingGame.slice(0, dif))
    let d2Index = parseInt(dIndex / 2)

    this.wuxingGame = dCalcDep[d2Index > 2 ? d2Index - 3 : d2Index]
  }

  setStars2Palace(name, palace){
    this.stars2Palace[name] = palace
  }

  getZiweiIndex(){
    const { lDay, wuxingGame:{ num } } = this
    let jumpNum = lDay / num
    const isInt = num => Number.isInteger(num)
    const isEvenNum = num => num % 2 === 0
    if(!isInt(jumpNum)){
      let r = 1
      let s = jumpNum
      while (!isInt(s)) {
        r * num < lDay ? r++ : s = r * num
      }
      const lend = s - lDay
      jumpNum = isEvenNum(lend) ? r + lend : r - lend
    }
    const index = jumpNum - 1
    const dizhi = this.#fillOrder[index < 0 ? index + 12 : index]
    return { index, dizhi }
  }

  setZiweiStars(){
    const { index: zIndex } = this.getZiweiIndex()
    // 逆着排
    mainStarsWithZiwei.forEach((star, index) => {
      if(!star) return
      const dizhi = this.#getFillOrder( zIndex - index )
      const palace = this.natalChartMap[dizhi]
      palace.addMainStar(star)
      this.setStars2Palace(star.code, palace)
    })
    return zIndex
  }

  setTianfuStars(zIndex){
    const tIndex = 12 - zIndex
    mainStarsWithTianfu.forEach((star, index) => {
      if(!star) return
      const dizhi = this.#getFillOrder(tIndex + index)
      const palace = this.natalChartMap[dizhi]
      palace.addMainStar(star)
      this.setStars2Palace(star.code, palace)
    })

  }
}

export default Person

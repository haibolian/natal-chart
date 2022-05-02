import { reactive } from 'vue';
import { lunar2solar } from '@/utils/date-transform';
import {
  tiangan,
  dizhi,
  dizhiChart,
  getShichen,
  palaceNames,
  wuxingGame,
  getMainStarsWithZiwei,
  getMainStarsWithTianfu,
  getTianganCode,
  getDizhiCode
} from '../utils/map';
import {
  getSmallStarsConfig
} from './rules';
import { getYingongStartTiangan } from '../utils/map';
import Palace from './Palace';
class Person {
  #fillOrder = ['yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai', 'zi', 'chou']
  #getPalace = function(index){
    if(index < 0) {
      return this.natalChart[index + 12]
    }else if(index < 12) {
      return this.natalChart[index]
    }else{
      return this.natalChart[index - 12]
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
    // 小星
    this.setOtherRegularSmallStars()
  }
  // 生成农历信息
  generateLunarInfo(){
    const date = this.lunarDate.split('-')?.map(n => Number(n))
    this.lunarInfo = lunar2solar(...date)
    this.lMonth = this.lunarInfo.lMonth
    this.lDay = this.lunarInfo.lDay
    const [t, d] = this.lunarInfo.gzYear.split('')
    this.tYear = getTianganCode(t)
    this.dYear = getDizhiCode(d)
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
    this.natalChart.forEach( (item, index) => {
      this.natalChartMap[item.dizhiCode] = item
      item.next = this.natalChart[index + 1 > 11 ? 0 : index + 1]
      item.prev = this.natalChart[index - 1 < 0 ? 11 : index - 1]
    })
  }
// 填充天干, next, prev
  fillTiangan(){
    const { name, index } = getYingongStartTiangan(this.lunarInfo.lYear)
    const orderedTiangan = [ ...tiangan.slice(index),  ...tiangan.slice(0, index + 2)];
    this.#fillOrder.forEach((dizhi, idx) => {
      const palace = this.natalChartMap[dizhi]
      palace.setTiangan(orderedTiangan[idx])
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
    const tIndex = tiangan.findIndex(tg => t === tg.name)
    const dIndex = dizhi.findIndex( dz => d === dz )
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
    const stars = getMainStarsWithZiwei(this)
    // 逆着排
    stars?.forEach((star, index) => {
      if(!star) return
      const palace  = this.#getPalace( zIndex - index )
      palace.addMainStar(star)
      this.setStars2Palace(star.code, palace)
    })
    return zIndex
  }

  setTianfuStars(zIndex){
    const tIndex = 12 - zIndex
    const stars = getMainStarsWithTianfu(this)
    stars?.forEach((star, index) => {
      if(!star) return
      const palace = this.#getPalace(tIndex + index)
      palace.addMainStar(star)
      this.setStars2Palace(star.code, palace)
    })
  }
  /**
   * 
   * @param { String } startPalaceCode 哪个地支开始 (汉字拼音)
   * @param { String } shichen 从什么开始 (汉字)
   * @param { Boolean } direction 顺 / 逆 时针。 true： 顺， false：逆
   * @param { String } targetShichen 到什么 (汉字)
   * @returns { Palace } 返回目标宫位
   * @example 亥起子时，逆时针到生时
   */
  getMovePalace(startPalaceCode, startDizhi, direction, endDizhi){
    // 获取起始宫
    const startPalace = this.natalChartMap[startPalaceCode]
    // 获取从那个地支开始的数组
    const shichenIndex = dizhi.findIndex(dz => dz === startDizhi)
    const newArr = [ ...dizhi.slice(shichenIndex), ...dizhi.slice(0, shichenIndex) ]
    // 到达目标地支的索引
    const scIndex = newArr.findIndex(dz => dz === endDizhi)
    // 根据起始宫的位置顺逆到达目标宫
    const endPalace = this.#getPalace(direction ? startPalace.index + scIndex : startPalace.index - scIndex)
    return endPalace
  }
  setOtherRegularSmallStars(){
    const smallStarsConfig = getSmallStarsConfig(this)
    smallStarsConfig.forEach(config => {
      if(!config) return
      const palace = 
        typeof config.rule === 'string' 
        ? this.natalChartMap[config.rule]
        : this.getMovePalace(...config.rule);

      config.isSub 
        ? palace.addSubStar(config.star) 
        : palace.addSmallStar(config.star);

      config.cb && config.cb(palace)
    })
  }
}

export default Person

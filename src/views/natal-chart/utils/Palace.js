class Palace {
  constructor(ops){
    this.code = undefined
    this.index = undefined
    this.dizhi = ops.dizhi
    this.dizhiCode = ops.code
    this.isFate = false
    this.isBody = false
    this.mainStars = []
    this.subStars = []
    this.smallStars = []
  }
  setTiangan({ name, code }){
    this.tiangan = name
    this.tianganCode = code
  }
  setFatePalace(index){
    this.isFate = true
    this.index = index
    this.name = '命宫'
    this.code = 'ming'
  }
  setBodyPalace(index){
    this.isBody = true
    this.index = index
  }
  setPalaceName({ name, code }, index){
    this.name = name
    this.code = code
    this.index = index
  }
  addMainStar(star){
    this.mainStars.unshift(star)
  }
  addSubStar(star){
    this.subStars.unshift(star)
  }
  addSmallStar(star){
    this.smallStars.unshift(star)
  }
}

export default Palace
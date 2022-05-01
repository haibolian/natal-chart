class Palace {
  constructor(ops){
    this.code = undefined
    this.index = undefined
    this.dizhi = ops.dizhi
    this.dizhiCode = ops.code
    this.isFate = false
    this.isBody = false
    this.mainStars = []
    this.smallStars = []
  }
  setTiangan(tiangan){
    this.tiangan = tiangan
  }
  setFatePalace(index){
    this.isFate = true
    this.index = index
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
}

export default Palace
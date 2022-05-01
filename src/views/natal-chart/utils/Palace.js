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

export default Palace
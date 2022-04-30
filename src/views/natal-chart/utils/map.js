export const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export const dizhiChart = [
  { dizhi: '巳', code: 'si' },
  { dizhi: '午', code: 'wu' },
  { dizhi: '未', code: 'wei' },
  { dizhi: '申', code: 'shen' },
  { dizhi: '辰', code: 'chen' },
  { dizhi: '酉', code: 'you' },
  { dizhi: '卯', code: 'mao' },
  { dizhi: '戌', code: 'xu' },
  { dizhi: '寅', code: 'yin' },
  { dizhi: '丑', code: 'chou' },
  { dizhi: '子', code: 'zi' },
  { dizhi: '亥', code: 'hai' }
]

export const palaceNames = ['父母宫', '福德', '田宅', '官禄', '朋友宫', '迁移', '疾厄', '财帛', '子女', '夫妻', '兄弟']

export const wuxingGame = []

export function getYingongStartTiangan(year) {
  const endNum = year.toString().charAt(3)
  let name = null
  let index = null
  if( endNum == '4' || endNum == '9' ) index = tiangan.findIndex(i => i === '丙')
  if( endNum == '0' || endNum == '5' ) index = tiangan.findIndex(i => i === '戊')
  if( endNum == '6' || endNum == '1' ) index = tiangan.findIndex(i => i === '庚')
  if( endNum == '7' || endNum == '2' ) index = tiangan.findIndex(i => i === '壬')
  if( endNum == '8' || endNum == '3' ) index = tiangan.findIndex(i => i === '甲')
  name = tiangan[index]
  return {
    name,
    index
  }
}

export function getShichen(time) {
  const hour = Number(time.split(':')[0])
  let index = Math.round(hour / 2)
  if(index > 11) index = 0

  return {
    shichen: dizhi[index] + '时',
    index
  }
}


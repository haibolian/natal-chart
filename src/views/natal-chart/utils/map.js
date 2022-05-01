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

export const palaceNames = [
  { name: '父母', code: 'fumu' },
  { name: '福德', code: 'fude' },
  { name: '田宅', code: 'tianzhai' },
  { name: '官禄', code: 'guanlu' },
  { name: '朋友', code: 'pengyou' },
  { name: '迁移', code: 'qianyi' },
  { name: '疾厄', code: 'jie' },
  { name: '财帛', code: 'caibo' },
  { name: '子女', code: 'zinv' },
  { name: '夫妻', code: 'fuqi' },
  { name: '兄弟', code: 'xiongdi' }
]

export const wuxingGame = [
  { name: '金四局', num: 4 },
  { name: '水一局', num: 1 },
  { name: '火六局', num: 6 },
  { name: '土五局', num: 5 },
  { name: '木三局', num: 3 }
]

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


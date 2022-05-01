export const tiangan = [
  { name: '甲', code: 'jia' },
  { name: '乙', code: 'yi' },
  { name: '丙', code: 'bing' },
  { name: '丁', code: 'ding' },
  { name: '戊', code: 'wu' },
  { name: '己', code: 'ji' },
  { name: '庚', code: 'geng' },
  { name: '辛', code: 'xin' },
  { name: '壬', code: 'ren' },
  { name: '癸', code: 'gui' }
]

export const getTianganCode = name => tiangan.find(tg => tg.name === name)?.code

export const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export const dizhiChart = [
  { dizhi: '寅', code: 'yin' },
  { dizhi: '卯', code: 'mao' },
  { dizhi: '辰', code: 'chen' },
  { dizhi: '巳', code: 'si' },
  { dizhi: '午', code: 'wu' },
  { dizhi: '未', code: 'wei' },
  { dizhi: '申', code: 'shen' },
  { dizhi: '酉', code: 'you' },
  { dizhi: '戌', code: 'xu' },
  { dizhi: '亥', code: 'hai' },
  { dizhi: '子', code: 'zi' },
  { dizhi: '丑', code: 'chou' },
]

export const getDizhiCode = name => dizhiChart.find(dz => dz.dizhi === name)?.code



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
  { name: '水二局', num: 2 },
  { name: '火六局', num: 6 },
  { name: '土五局', num: 5 },
  { name: '木三局', num: 3 }
]

export const mainStarsWithZiwei = [
  { name: '紫薇', code: 'ziwei' },
  { name: '天机', code: 'tianji' },
  null,
  { name: '太阳', code: 'taiyang' },
  { name: '武曲', code: 'wuqu' },
  { name: '天同', code: 'tiantong' },
  null,
  null,
  { name: '廉贞', code: 'lianzhen' }
]

export const mainStarsWithTianfu = [
  { name: '天府', code: 'lianzhen' },
  { name: '太阴', code: 'lianzhen' },
  { name: '贪狼', code: 'lianzhen' },
  { name: '巨门', code: 'lianzhen' },
  { name: '天相', code: 'lianzhen' },
  { name: '天梁', code: 'lianzhen' },
  { name: '七杀', code: 'lianzhen' },
  null, null, null,
  { name: '破军', code: 'lianzhen' },
]

export function getYingongStartTiangan(year) {
  const endNum = year.toString().charAt(3)
  let name = null
  let index = null
  if( endNum == '4' || endNum == '9' ) index = tiangan.findIndex(i => i.name === '丙')
  if( endNum == '0' || endNum == '5' ) index = tiangan.findIndex(i => i.name === '戊')
  if( endNum == '6' || endNum == '1' ) index = tiangan.findIndex(i => i.name === '庚')
  if( endNum == '7' || endNum == '2' ) index = tiangan.findIndex(i => i.name === '壬')
  if( endNum == '8' || endNum == '3' ) index = tiangan.findIndex(i => i.name === '甲')
  name = tiangan[index].name
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




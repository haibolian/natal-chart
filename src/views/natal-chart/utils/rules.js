import { dizhi, sihuaMap } from './map';

export const lucunRule = {
  jia: 'yin',
  yi: 'mao',
  bing: 'si',
  wu: 'si',
  ding: 'wu',
  ji: 'wu',
  geng: 'shen',
  xin: 'you',
  ren: 'hai',
  gui: 'zi'
}

export const tianma = {
  shen: 'yin',
  zi: 'yin',
  chen: 'yin',
  yin: 'shen',
  wu: 'shen',
  xu: 'shen',
  hai: 'si',
  mao: 'si',
  wei: 'si',
  si: 'hai',
  you: 'hai',
  chou: 'hai'
}

export const huoxing = {
  yin: 'chou',
  wu: 'chou',
  xu: 'chou',
  shen: 'yin',
  zi: 'yin',
  chen: 'yin',
  si: 'mao',
  you: 'mao',
  chou: 'mao',
  hai: 'you',
  mao: 'you',
  wei: 'you'
}

export const lingxing = {
  yin: 'mao',
  wu: 'mao',
  xu: 'mao',
  shen: 'xu',
  zi: 'xu',
  chen: 'xu',
  si: 'xu',
  you: 'xu',
  chou: 'xu',
  hai: 'xu',
  mao: 'xu',
  wei: 'xu'
}
export const xianchi = {
  yin: 'mao',
  wu: 'mao',
  xu: 'mao',
  shen: 'you',
  zi: 'you',
  chen: 'you',
  si: 'wu',
  you: 'wu',
  chou: 'wu',
  hai: 'zi',
  mao: 'zi',
  wei: 'zi'
}

// t == true ? 天魁 ： 天钺
export function getTiankuiTianyue(t) {
  const r1 = t ? 'chou' : 'wei'
  const r2 = t ? 'zi' : 'shen'
  const r3 = t ? 'hai' : 'you'
  const r4 = t ? 'yin' : 'wu'
  const r5 = t ? 'mao' : 'si'
  return {
    jia: r1, wu: r1, geng: r1,
    yi: r2, ji: r2,
    bing: r3, ding: r3,
    xin: r4,
    ren: r5, gui: r5
  }
}

export function getSmallStarsConfig(person){
  return [
    {
      isSub: 1,
      rule: lucunRule[person.tYear],
      star: { name: '禄存', code: 'lucun' },
      cb(palace){
        palace.next.addSmallStar({ name: '擎羊', code: 'qingyang' })
        palace.prev.addSmallStar({ name: '陀罗', code: 'tuoluo' })
      }  
    },
    {
      rule: tianma[person.dYear],
      star: { name: '天马', code: 'tianma' },
    },
    {
      rule: [huoxing[person.dYear], '子', true, person.shichen],
      star: { name: '火星', code: 'huoxing' },
    },
    {
      rule: ['hai', '子', false, person.shichen],
      star: { name: '地空', code: 'dikong' }
    },
    {
      rule: ['hai', '子', true, person.shichen],
      star: { name: '地劫', code: 'dijie' }
    },
    {
      rule: [lingxing[person.dYear], '子', true, person.shichen],
      star: { name: '铃星', code: 'lingxing' }
    },
    {
      rule: ['mao', '子', false, person.dYear],
      star: { name: '红鸾', code: 'hongluan' }
    },
    {
      rule: ['you', '子', false, person.dYear],
      star: { name: '天喜', code: 'tianxi' }
    },
    {
      rule: ['chou', '子', true,  dizhi[person.lMonth - 1]],
      star: { name: '天姚', code: 'tianyao' }
    },
    {
      rule: xianchi[person.dYear],
      star: { name: '咸池', code: 'xianchi' }
    },
    {
      rule: ['you', '子', true, dizhi[person.lMonth - 1]],
      star: { name: '天刑', code: 'tianxing' }
    },
    {
      isSub: 1,
      rule: ['chen', '子', true, dizhi[person.lMonth - 1]],
      star: { name: '左辅', code: 'zuofu', sihua: sihuaMap[person.tYear]['zuofu'] }
    },
    {
      isSub: 1,
      rule: ['xu', '子', false, dizhi[person.lMonth - 1]],
      star: { name: '右弼', code: 'youbi', sihua: sihuaMap[person.tYear]['youbi'] }
    },
    {
      isSub: 1,
      rule: ['chen', '子', true, person.shichen],
      star: { name: '文曲', code: 'wenqu', sihua: sihuaMap[person.tYear]['wenqu'] }
    },
    {
      isSub: 1,
      rule: ['xu', '子', false, person.shichen],
      star: { name: '文昌', code: 'wenchang', sihua: sihuaMap[person.tYear]['wenchang'] }
    },
    {
      isSub: 1,
      rule: getTiankuiTianyue(true)[person.tYear],
      star: { name: '天魁', code: 'tiankui' }
    },
    {
      isSub: 1,
      rule: getTiankuiTianyue()[person.tYear],
      star: { name: '天钺', code: 'tianyue' }
    }
  ]
} 

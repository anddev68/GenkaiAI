import { PlayableCardType } from './cards'

export type Player = {
  // コイン数
  coin: number
  // 獲得数
  getNum: number
  // 人口
  population: number
  // 所持枚数
  hasCounts: {
    [K in PlayableCardType]: number
  }
}

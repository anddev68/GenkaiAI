import { PlayableCardType } from './cards'

export type Board = {
  // 残り枚数
  remainingCounts: {
    [K in PlayableCardType]: number
  }
}

import { PlayableCardType } from '../game/cards'

/**
 * AIが回答した結果
 * - purchase: 購入すべきカードID　(複数可)
 * - eval: 評価値
 */
export type ResolvedResult = {
  purchase: {
    type: PlayableCardType
    jpName: string
  }[]
  eval: number
}[]

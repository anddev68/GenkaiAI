import { Board } from '../game/board'
import { PlayableCard, PlayableCards, PlayableCardType } from '../game/cards'
import { Player } from '../game/players'
import { ResolvedResult } from './types'

type Game = {
  board: Board
  player: Player
}

export const resolve = (game: Game): ResolvedResult => {
  const playableCards = PlayableCards
  return playableCards
    .filter((card) => prune(game, card))
    .map((card) => {
      return {
        purchase: [
          {
            type: card.type,
            jpName: card.jpName
          }
        ],
        eval: evaluate(game, card)
      }
    })
    .sort((a, b) => b.eval - a.eval)
}

/**
 * 枝刈り
 */
const prune = (game: Game, card: PlayableCard) => {
  // 売り切れの場合は、除去
  if (game.board.remainingCounts[card.type] === 0) {
    return false
  }

  // お金が足りない場合、獲得数が足りない場合は除去
  if (game.player.coin < card.cost) {
    return false
  }

  // 金を除去
  // const blockList: PlayableCardType[] = ['Subsidy', 'IndivisualTax', 'CorporateTax']
  // if (blockList.includes(card.type)) return false

  // 人口が減っていなければ、人口増やすカードを除去
  /*
      const blockListForPopulation: PlayableCardType[] = ["ShoppingCenter", "HealthGuidance", "PopulationCreating"]
      if(game.player.population >= 5 && blockListForPopulation.includes(card.type)) return false;
      */

  return true
}

/**
 * 評価
 */
const evaluate = (game: Game, card: PlayableCard) => {
  let score = 0

  switch (card.type) {
    case 'Income':
    case 'Health':
      break
    case 'LifeMotivation':
      //  8あるときは買えばよさそう
      score = 100
      break
    case 'Subsidy':
    case 'IndivisualTax':
    case 'CorporateTax':
      score += card.cost // コインも許可
      break
    default:
      // コストをそのまま評価値にする
      score += card.cost
      // 購入する政策の評価（政策数→カード数→コイン数→人口の順）
      score += card.addActions * 2
      score += card.drawCards * 2
      score += card.addCoins * 1
      // score += card.increasePopulation * 1;
      score += card.happiness * 0.5
      // 人口の優先度は自分の状況に応じて強化
      score += card.increasePopulation * (5 - game.player.population) * 4

      // +アクション系とドロー系のバランスを大事に
      const sumOfDraws =
        game.player.hasCounts.CityRoad +
        game.player.hasCounts.ShoppingCenter +
        game.player.hasCounts.HealthGuidance +
        game.player.hasCounts.ChildrenRestaurant
      const sumOfActions = game.player.hasCounts.Nursery + game.player.hasCounts.CareerEducation
      if (sumOfDraws - sumOfActions) {
        score += card.addActions * 2
      } else {
        score += card.drawCards * 2
      }
      break
  }
  return score
}

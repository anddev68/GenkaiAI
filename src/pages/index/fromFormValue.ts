import { Board } from '@/features/game/board'
import { PlayableCards } from '@/features/game/cards'
import { Player } from '@/features/game/players'
import { FormValues } from '../index.page'

export const fromFormValue = (formValues: FormValues) => {
  const hasCounts = PlayableCards.map((card) => {
    return [card.type, formValues[card.type].hasCount]
  })
  const player: Player = {
    coin: formValues.coin,
    getNum: 1, // TODO
    population: formValues.population,
    hasCounts: Object.fromEntries(hasCounts)
  }

  const remainingCounts = PlayableCards.map((card) => {
    return [card.type, formValues[card.type].remainingCount]
  })
  const board: Board = {
    remainingCounts: Object.fromEntries(remainingCounts)
  }

  return {
    player,
    board
  }
}

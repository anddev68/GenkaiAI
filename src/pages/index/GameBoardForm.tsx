import { PlayableCards, PlayableCardType } from '@/features/game/cards'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type CardProps = {
  type: string
  jpName: string
  register: any
}

function Card({ type, register, jpName }: CardProps) {
  return (
    <div style={{ background: '#ccc', fontSize: '0.75rem', border: 'solid #000 1px' }}>
      <div>{jpName}</div>
      <div>
        所持枚数: <input type="number" {...register(`${type}.hasCount`, { valueAsNumber: true })}></input>
        残り枚数: <input type="number" {...register(`${type}.remainingCount`, { valueAsNumber: true })}></input>
      </div>
    </div>
  )
}

export type GameBoardFormValues = {
  [K in PlayableCardType]: {
    hasCount: number
    remainingCount: number
  }
}

export function GameBoardForm() {
  const { register, setValue } = useFormContext<GameBoardFormValues>()

  useEffect(() => {
    PlayableCards.forEach((card) => {
      setValue(`${card.type}.hasCount`, 0)
      setValue(`${card.type}.remainingCount`, 3)
    })
  }, [setValue])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
      {PlayableCards.map((card) => (
        <Card key={card.type} type={card.type} jpName={card.jpName} register={register} />
      ))}
    </div>
  )
}

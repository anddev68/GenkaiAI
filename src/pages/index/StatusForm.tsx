import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export type StatusFormValues = {
  getNum: number
  coin: number
  population: number
  red: number
  yellow: number
  green: number
  blue: number
}

export function StatusForm() {
  const { register, setValue } = useFormContext<StatusFormValues>()

  useEffect(() => {
    setValue('getNum', 0)
    setValue('coin', 0)
    setValue('population', 5)
    setValue('red', 0)
    setValue('yellow', 0)
    setValue('green', 0)
    setValue('blue', 0)
  }, [setValue])

  return (
    <div>
      残り獲得数: <input type="number" {...register('getNum')} disabled></input> ※獲得数の変更は未実装です <br />
      財源: <input type="number" {...register('coin')}></input>
      <br />
      人口: <input type="number" {...register('population')}></input>
      <br />
      社会問題: <br />赤<input type="number" {...register('red')} disabled></input>青
      <input type="number" {...register('blue')} disabled></input>黄
      <input type="number" {...register('yellow')} disabled></input>緑
      <input type="number" {...register('green')} disabled></input> ※蓄積社会問題数の変更は未実装です <br />
    </div>
  )
}

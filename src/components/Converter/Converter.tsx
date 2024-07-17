import { ChangeEvent, useCallback } from 'react'
import styles from './Converter.module.scss'
import { create } from 'zustand'

type store = {
  USD: number
  EUR: number
  calculateCourse: (value: number, currencyType: CurrencyType) => void
}

type CurrencyType = 'USD' | 'EUR'

const useStore = create<store>((set) => ({
  USD: 1.07,
  EUR: 1,
  calculateCourse: (value: number, currencyType: CurrencyType) => {
    if (currencyType === 'EUR') {
      set(() => ({
        USD: Number((value * 1.07).toFixed(2)),
        EUR: value,
      }))
    } else {
      set(() => ({
        EUR: Number((value / 1.07).toFixed(2)),
        USD: value,
      }))
    }
  },
}))

const Converter = () => {
  const USD = useStore((state) => state.USD)
  const EUR = useStore((state) => state.EUR)
  const calculateCourse = useStore((state) => state.calculateCourse)

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      calculateCourse(Number(evt.target.value), evt.target.name as CurrencyType)
    },
    [calculateCourse]
  )
  return (
    <div className={styles.converter}>
      <label className={styles['converter__label']}>
        <div className={styles['converter__label--currency']}>USD</div>
        <input
          className={styles['converter__label--input']}
          type="number"
          name="USD"
          id="USD"
          placeholder="Enter USD count"
          value={USD}
          onChange={handleInputChange}
        />
      </label>

      <label className={styles['converter__label']}>
        <div className={styles['converter__label--currency']}>EUR</div>
        <input
          className={styles['converter__label--input']}
          type="number"
          name="EUR"
          id="EUR"
          placeholder="Enter EUR count"
          value={EUR}
          onChange={handleInputChange}
        />
      </label>
    </div>
  )
}

export default Converter

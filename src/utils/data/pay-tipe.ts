import { StatusItem, StatusObject } from '../types/common'

export const PAY_TIPE: StatusItem[] = [
  {
    value: 'daily',
    name: 'Harian',
  },
  {
    value: 'monthly',
    name: 'Bulanan',
  },
]

export const PAY_TIPE_OBJ = PAY_TIPE.reduce<StatusObject>((acc, item) => {
  acc[item.value] = item.name
  return acc
}, {})

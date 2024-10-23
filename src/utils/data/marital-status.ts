import { StatusItem, StatusObject } from '../types/common'

export const MARITAL_STATUS: StatusItem[] = [
  {
    name: 'Belum menikah',
    value: 'single',
  },
  {
    name: 'Menikah',
    value: 'married',
  },
  {
    name: 'Cerai',
    value: 'divorced',
  },
]

export const MARITAL_STATUS_OBJ = MARITAL_STATUS.reduce<StatusObject>(
  (acc, item) => {
    acc[item.value] = item.name
    return acc
  },
  {}
)

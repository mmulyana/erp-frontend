import { StatusItem, StatusObject } from '../types/common'

export const EMPLOYEMENT_TYPE: StatusItem[] = [
  {
    name: 'Tetap',
    value: 'permanent',
  },
  {
    name: 'Kontrak',
    value: 'contract',
  },
  {
    name: 'Partime',
    value: 'partime',
  },
]

export const EMPLOYEMENT_TYPE_OBJ = EMPLOYEMENT_TYPE.reduce<StatusObject>(
  (acc, item) => {
    acc[item.value] = item.name
    return acc
  },
  {}
)

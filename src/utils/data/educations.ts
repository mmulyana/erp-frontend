import { StatusItem, StatusObject } from '../types/common'

export const EDUCATIONS: StatusItem[] = [
  {
    name: 'SD',
    value: 'sd',
  },
  {
    name: 'SMP',
    value: 'smp',
  },
  {
    name: 'SMA/SMK',
    value: 'sma/smk',
  },
  {
    name: 'Diploma 1',
    value: 'd1',
  },
  {
    name: 'Diploma 2',
    value: 'd2',
  },
  {
    name: 'Diploma 3',
    value: 'd3',
  },
  {
    name: 'Diploma 4',
    value: 'd4',
  },
  {
    name: 'Strata 1',
    value: 's1',
  },
  {
    name: 'Strata 2',
    value: 's2',
  },
  {
    name: 'Strata 3',
    value: 's3',
  },
]

export const EDUCATIONS_OBJ = EDUCATIONS.reduce<StatusObject>((acc, item) => {
  acc[item.value] = item.name
  return acc
}, {})

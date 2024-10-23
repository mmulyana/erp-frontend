import { StatusItem, StatusObject } from '../types/common'

export const months: StatusItem[] = [
  {
    value: 1,
    name: 'Januari',
  },
  {
    value: 2,
    name: 'Februari',
  },
  {
    value: 3,
    name: 'Maret',
  },
  {
    value: 4,
    name: 'April',
  },
  {
    value: 5,
    name: 'Mei',
  },
  {
    value: 6,
    name: 'Juni',
  },
  {
    value: 7,
    name: 'Juli',
  },
  {
    value: 8,
    name: 'Agustus',
  },
  {
    value: 9,
    name: 'September',
  },
  {
    value: 10,
    name: 'Oktober',
  },
  {
    value: 11,
    name: 'November',
  },
  {
    value: 12,
    name: 'Desember',
  },
]

export const MONTHS_OBJ = months.reduce<StatusObject>((acc, item) => {
  acc[item.value] = item.name
  return acc
}, {})

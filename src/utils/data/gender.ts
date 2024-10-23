import { StatusItem, StatusObject } from "../types/common";

export const GENDER: StatusItem[] = [
  {
    value: 'male',
    name: 'Laki-laki',
  },
  {
    value: 'female',
    name: 'Perempuan',
  },
]

export const GENDER_OBJ = GENDER.reduce<StatusObject>(
  (acc, item) => {
    acc[item.value] = item.name
    return acc
  },
  {}
)
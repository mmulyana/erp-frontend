export type Pagination = {
  page?: string
  limit?: string
}

export type StatusItem = {
  name: string
  value: string | number
}

export type StatusObject = {
  [key: string | number]: string
}

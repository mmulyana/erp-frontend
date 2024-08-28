import { Employee } from "./employee"

export type Position = {
  id: number
  name: string
  description?: string
  employees?: Employee[]
}

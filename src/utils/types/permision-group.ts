export type PermissionGroup = {
  id: number
  name: string
  description?: string
  permissions: {
    id: number
    name: string
  }[]
}

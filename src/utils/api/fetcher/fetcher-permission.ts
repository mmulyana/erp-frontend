import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { PermissionGroup } from '@/utils/types/permision-group'

export type createPGPayload = Pick<PermissionGroup, 'name' | 'description'> & {
  permissionNames: string[]
}

export type updatePGPayload = createPGPayload & {
  id: number
  newPermissionNames?: string[]
}

export const fetcherPermissionsGroup = async () => {
  return await http(URLS.PERMISSION_GROUP)
}

export const fetcherPermissionGroup = async (id?: number) => {
  return await http(`${URLS.PERMISSION_GROUP}/${id}`)
}

export const fetcherCheckPermission = async (id?: number) => {
  return await http(`${URLS.PERMISSION_CHECK}/${id}`)
}

export const fetcherCreatePermissionGroup = async (
  payload: createPGPayload
) => {
  return await http.post(URLS.PERMISSION_GROUP, payload)
}

export const fetcherUpdatePermissionGroup = async (
  payload: updatePGPayload
) => {
  return await http.patch(`${URLS.PERMISSION_GROUP}/${payload.id}`, payload)
}

export const fetcherDeletePermission = async (id?: number) => {
  if (!id) throw new Error('id group is required')

  return await http.delete(`${URLS.PERMISSION}/${id}`)
}
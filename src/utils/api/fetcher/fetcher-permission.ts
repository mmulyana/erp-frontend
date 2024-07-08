import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { PermissionGroup } from '@/utils/types/permision-group'

export type createPGPayload = Pick<PermissionGroup, 'name' | 'description'> & {
  permissionNames: string[]
}

export const fetcherPermissionsGroup = async () => {
  return await http(URLS.PERMISSION_GROUP)
}

export const fetcherPermissionGroup = async (id: number) => {
  return await http(`${URLS.PERMISSION_GROUP}/${id}`)
}

export const fetcherCreatePermissionGroup = async (
  payload: createPGPayload
) => {
  return await http.post(URLS.PERMISSION_GROUP, payload)
}

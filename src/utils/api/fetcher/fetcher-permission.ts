import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const fetcherPermissionsGroup = async () => {
  return await http(URLS.PERMISSION_GROUP)
}

export const fetcherPermissionGroup = async (id: number) => {
  return await http(`${URLS.PERMISSION_GROUP}/${id}`)
}

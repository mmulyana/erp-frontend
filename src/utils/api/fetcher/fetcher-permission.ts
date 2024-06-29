import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const fetcherPermissionGroup = async () => {
  return await http(URLS.PERMISSION_GROUP)
}

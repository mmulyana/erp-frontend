import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const fetcherPosition = async () => {
  return await http(URLS.HRIS_POSITION)
}

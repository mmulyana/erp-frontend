import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const fetcherPosition = async () => {
  return await http(URLS.HRIS_POSITION)
}

type Payload = {
  name: string
  description?: string
}
export const fetcherCreatePosition = async (payload: Payload) => {
  return await http.post(URLS.HRIS_POSITION, payload)
}

import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const fetcherPosition = async () => {
  return await http(URLS.HRIS_POSITION)
}
export const fetcherDetailPosition = async (payload: { id?: number }) => {
  return await http(`${URLS.HRIS_POSITION}/${payload.id}`)
}

type Payload = {
  name: string
  description?: string
}

export const fetcherCreatePosition = async (payload: Payload) => {
  return await http.post(URLS.HRIS_POSITION, payload)
}

export const fetcherUpdatePosition = async (
  payload: Payload & { id: number }
) => {
  return await http.patch(`${URLS.HRIS_POSITION}/${payload.id}`, payload)
}

export const fetcherDeletePosition = async (payload: { id: number }) => {
  return await http.delete(`${URLS.HRIS_POSITION}/${payload.id}`)
}

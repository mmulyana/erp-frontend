import http from '@/utils/http'
import { URLS } from '@/utils/constant/_urls'
import { Roles } from '@/utils/types/roles'

type createPayload = {
  name: string,
  permissionIds: number[]
}

type updatePayload = createPayload & {
  id: number
}

export const fetcherRole = async (id?: number) => {
  return await http(`${URLS.ROLES}/${id}`)
}

export const fetcherRoles = async () => {
  return await http(URLS.ROLES)
}

export const fetcherUpdateRoles = async (payload: updatePayload) => {
  return await http.patch(`${URLS.ROLES}/${payload.id}`, payload)
}

export const fetcherDeleteRoles = async ({ id }: Pick<Roles, 'id'>) => {
  return await http.delete(`${URLS.ROLES}/${id}`)
}

export const fetcherCreateRoles = async (payload: createPayload) => {
  return await http.post(`${URLS.ROLES}/`, payload)
}

import http from '@/utils/http'
import { URLS } from '@/utils/constant/_urls'
import { Roles } from '@/utils/types/roles'

export const fetcherRole = async (id?: number) => {
  return await http(`${URLS.ROLES}/${id}`)
}

export const fetcherRoles = async () => {
  return await http(URLS.ROLES)
}

export const fetcherUpdateRoles = async ({ name, id }: Roles) => {
  return await http.patch(`${URLS.ROLES}/${id}`, { name })
}

export const fetcherDeleteRoles = async ({ id }: Pick<Roles, 'id'>) => {
  return await http.delete(`${URLS.ROLES}/${id}`)
}

export const fetcherCreateRoles = async ({ name }: Pick<Roles, 'name'>) => {
  return await http.post(`${URLS.ROLES}/`, { name })
}

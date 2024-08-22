import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Roles } from '@/utils/types/roles'
import http from '@/utils/http'

export const useRoles = () => {
  return useQuery({ queryKey: [KEYS.ROLES], queryFn: fetcherRoles })
}

export const useRole = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.ROLES, id],
    queryFn: () => fetcherRole(id),
    enabled: !!id,
  })
}

export const useUpdateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherUpdateRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

export const useDeleteRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherDeleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

export const useCreateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreateRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

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

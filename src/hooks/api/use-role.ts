import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { IApi, Role } from '@/utils/types/api'
import { CreateRole } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useRoles = () => {
  return useQuery({
    queryKey: [KEYS.ROLES],
    queryFn: async (): Promise<AxiosResponse<IApi<Role[]>>> => {
      return await http(URLS.ROLES)
    },
  })
}
export const useDetailRole = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.ROLES],
    queryFn: async (): Promise<AxiosResponse<IApi<Role>>> => {
      return await http(`${URLS.ROLES}/${id}`)
    },
    enabled,
  })
}
export const useCreateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateRole) => {
      return await http.post(URLS.ROLES, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
    },
  })
}
export const useUpdateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: CreateRole
    }) => {
      return await http.patch(`${URLS.ROLES}/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
    },
  })
}
export const useDeleteRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.ROLES}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
    },
  })
}

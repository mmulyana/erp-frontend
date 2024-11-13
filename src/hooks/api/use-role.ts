import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { ApiError, IApi, Role } from '@/utils/types/api'
import { CreateRole } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

export const useRoles = (params?: { name?: string }) => {
  return useQuery({
    queryKey: [KEYS.ROLES, params?.name],
    queryFn: async (): Promise<AxiosResponse<IApi<Role[]>>> => {
      return await http(URLS.ROLE, { params })
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
    queryKey: [KEYS.ROLES_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<Role>>> => {
      return await http(`${URLS.ROLE}/${id}`)
    },
    enabled,
  })
}
export const useCreateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateRole) => {
      return await http.post(URLS.ROLE, payload)
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
      return await http.patch(`${URLS.ROLE}/${id}`, payload)
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
      return await http.delete(`${URLS.ROLE}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data.message)
    },
  })
}
export const useAddPermissionRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      roleId,
      permissionId,
    }: {
      roleId: number
      permissionId: number
    }): Promise<AxiosResponse<IApi<{ roleId: number }>>> => {
      return await http.post(
        `${URLS.ROLE}/${roleId}/permission/add/${permissionId}`
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES_DETAIL, data.data.data?.roleId],
      })
    },
  })
}
export const useRemovePermissionRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      roleId,
      permissionId,
    }: {
      roleId: number
      permissionId: number
    }): Promise<AxiosResponse<IApi<{ roleId: number }>>> => {
      return await http.delete(
        `${URLS.ROLE}/${roleId}/permission/remove/${permissionId}`
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES_DETAIL, data.data.data?.roleId],
      })
    },
  })
}

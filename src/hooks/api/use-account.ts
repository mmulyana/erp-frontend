import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError, IApi, IApiPagination, User } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { UpdateAccountSchema, UpdatePasswordDto } from '@/utils/schema/account'
import { objectToFormData } from '@/utils/ObjectToFormData'
import { toast } from 'sonner'
import { createUser } from '@/utils/types/form'

export const useAccount = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT],
    queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
      return await http(`${URLS.ACCOUNT}/${id}`)
    },
    enabled,
  })
}
export const useDetailAccount = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
      return await http(`${URLS.ACCOUNT}/${id}`)
    },
    enabled,
  })
}
export const useAccountPagination = (
  params?: {
    name?: string
    roleId?: string
  } & Pagination
) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNTS, params?.name, params?.page, params?.limit],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<User[]>>> => {
      return await http(URLS.ACCOUNT, { params })
    },
  })
}
export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: UpdateAccountSchema
    }) => {
      const formData = objectToFormData(payload)
      return await http.patch(`${URLS.ACCOUNT}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      toast.success(data.data.message)
      queryClient.invalidateQueries({ queryKey: [KEYS.ACCOUNT] })
      queryClient.invalidateQueries({ queryKey: [KEYS.ACCOUNTS] })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message)
    },
  })
}
export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: createUser) => {
      return await http.post(URLS.ACCOUNT, payload)
    },
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message)
    },
  })
}
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: UpdatePasswordDto
    }) => {
      return await http.patch(`${URLS.ACCOUNT}/${id}/password/update`, payload)
    },
    onSuccess: (data) => {
      toast.success(data.data.message)
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data.message)
    },
  })
}
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.patch(`${URLS.ACCOUNT}/${id}/password/reset`)
    },
    onSuccess: (data) => {
      toast.success(data.data.message)
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data.message)
    },
  })
}
export const useActiveAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.patch(`${URLS.ACCOUNT}/${id}/activate`)
    },
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}
export const useDeactiveAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.patch(`${URLS.ACCOUNT}/${id}/deactivate`)
    },
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.ACCOUNT}/${id}`)
    },
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}
export const useAssignRoleAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, roleId }: { id: number; roleId: number }) => {
      return await http.patch(`${URLS.ACCOUNT}/${id}/role/add/${roleId}`)
    },
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}

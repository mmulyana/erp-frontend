import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError, IApi, User } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { UpdateAccountSchema, UpdatePasswordDto } from '@/utils/schema/account'
import { objectToFormData } from '@/utils/ObjectToFormData'
import { toast } from 'sonner'

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
export const useAccountPagination = (
  params?: {
    name?: string
    email?: string
    phoneNumber?: string
    roleId: string
  } & Pagination
) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNTS, { ...params }],
    queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
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
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({ queryKey: [KEYS.ACCOUNT] })
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

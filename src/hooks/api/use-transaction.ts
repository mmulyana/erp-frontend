import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateTransaction } from '@/utils/types/form'
import { ApiError, IApi, Transaction } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { AxiosError, AxiosResponse } from 'axios'
import http from '@/utils/http'
import { toast } from 'sonner'

type Params = Pagination & {
  type?: 'in' | 'out' | 'borrowed' | 'returned' | 'opname'
}
export const useTransaction = (params?: Params) => {
  return useQuery({
    queryFn: async (): Promise<
      AxiosResponse<{
        data: Transaction[]
      }>
    > => {
      return await http.request({
        method: 'GET',
        url: URLS.INVENTORY_TRANSACTION,
        params,
      })
    },
    queryKey: [KEYS.TRANSACTION, params?.type, params],
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: CreateTransaction
    }): Promise<AxiosResponse<IApi<{ type: string }>>> => {
      return await http.post(URLS.INVENTORY_TRANSACTION, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.TRANSACTION] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.TRANSACTION, data.data.data?.type],
      })
      toast.success(data.data.message)
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Terjadi kesalahan pada server'
        if (errorMessage.includes('tidak mencukupi')) {
          toast.error(errorMessage)
        } else {
          toast.error(errorMessage)
        }
      } else if (error.request) {
        toast.error('Tidak dapat terhubung ke server')
      } else {
        toast.error('Terjadi kesalahan pada aplikasi')
      }
    },
  })
}

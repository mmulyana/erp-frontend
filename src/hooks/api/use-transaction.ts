import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { Transaction } from '@/utils/types/api'
import { AxiosResponse } from 'axios'
import { objectToFormData } from '@/utils/ObjectToFormData'
import { CreateTransaction } from '@/utils/types/form'
import { toast } from 'sonner'

type Params = Pagination & {
  type?: 'in' | 'out' | 'borrowed' | 'returned' | 'opname'
}
export const useTransaction = (params: Params) => {
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
    queryKey: [KEYS.TRANSACTION, params.type, params],
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: CreateTransaction }) => {
      const formData = objectToFormData(payload)
      return await http.post(URLS.INVENTORY_TRANSACTION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUPPLIER] })
      toast.success(data.data.message)
    },
  })
}

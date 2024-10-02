import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'
import http from '@/utils/http'
import { Transaction } from '@/utils/types/api'
import { AxiosResponse } from 'axios'

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

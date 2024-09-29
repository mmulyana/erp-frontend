import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'
import http from '@/utils/http'

type supplierParams = Pagination & {}
export const useSupplier = (params: supplierParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_SUPPLIER)
    },
    queryKey: [KEYS.SUPPLIER, params],
  })
}

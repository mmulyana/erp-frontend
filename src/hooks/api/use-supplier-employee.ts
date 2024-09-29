import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'
import http from '@/utils/http'

type supplierParams = Pagination & {
  enabled?: boolean
  id?: number
  name?: string
}
export const useSupplierEmployee = (params: supplierParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(
        `${URLS.INVENTORY_SUPPLIER_EMPLOYEE}?id=${params.id}&name=${params.name}`
      )
    },
    queryKey: [KEYS.SUPPLIER_EMPLOYEE, params],
    enabled: params.enabled,
  })
}

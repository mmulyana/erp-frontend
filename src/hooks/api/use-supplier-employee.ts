import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { CreateSupplierEmployee } from '@/utils/types/form'
import { toast } from 'sonner'

type supplierParams = Pagination & {
  enabled?: boolean
  id?: number
  name?: string
}
export const useSupplierEmployee = (params: supplierParams) => {
  return useQuery({
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.INVENTORY_SUPPLIER_EMPLOYEE,
        params,
      })
    },
    queryKey: [KEYS.SUPPLIER_EMPLOYEE, params],
    enabled: params.enabled,
  })
}

export const useCreateSupplierEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: CreateSupplierEmployee & { supplierId: number }
    }) => {
      return await http.post(URLS.INVENTORY_SUPPLIER_EMPLOYEE, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER_EMPLOYEE],
      })
      toast(data.data.message)
    },
  })
}

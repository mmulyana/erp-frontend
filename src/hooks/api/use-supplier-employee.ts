import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { CreateSupplierEmployee } from '@/utils/types/form'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { IApi, SupplierEmployee } from '@/utils/types/api'

type supplierParams = Pagination & {
  enabled?: boolean
  id?: number | null
  name?: string
}
export const useSupplierEmployee = (params: supplierParams) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<SupplierEmployee[]>>> => {
      return await http(URLS.INVENTORY_SUPPLIER_EMPLOYEE, {
        params,
      })
    },
    queryKey: [KEYS.SUPPLIER_EMPLOYEE, params.id, params.name],
    enabled: params.enabled,
  })
}

export const useDetailSupplierEmployee = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<SupplierEmployee>>> => {
      return await http(`${URLS.INVENTORY_SUPPLIER_EMPLOYEE}/${id}`)
    },
    queryKey: [KEYS.SUPPLIER_EMPLOYEE_DETAIL, id],
    enabled,
  })
}

export const useCreateSupplierEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: CreateSupplierEmployee & { supplierId: number }
    }): Promise<AxiosResponse<IApi<SupplierEmployee>>> => {
      return await http.post(URLS.INVENTORY_SUPPLIER_EMPLOYEE, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER_EMPLOYEE, data.data.data?.supplierId],
      })
      toast(data.data.message)
    },
  })
}

export const useUpdateSupplierEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<CreateSupplierEmployee>
    }): Promise<AxiosResponse<IApi<SupplierEmployee>>> => {
      return await http.patch(
        `${URLS.INVENTORY_SUPPLIER_EMPLOYEE}/${id}`,
        payload
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER_EMPLOYEE_DETAIL, data.data.data?.id],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER_EMPLOYEE, data.data.data?.supplierId],
      })
      toast(data.data.message)
    },
  })
}

export const useDeleteSupplierEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<SupplierEmployee>>> => {
      return await http.delete(`${URLS.INVENTORY_SUPPLIER_EMPLOYEE}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER_EMPLOYEE, data.data.data?.supplierId],
      })
      toast(data.data.message)
    },
  })
}

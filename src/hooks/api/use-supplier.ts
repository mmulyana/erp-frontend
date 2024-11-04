import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { CreateSupplier } from '@/utils/types/form'
import { objectToFormData } from '@/utils/ObjectToFormData'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import {
  IApi,
  Supplier,
  SupplierEmployee,
  Transaction,
} from '@/utils/types/api'

type supplierParams = Pagination & {
  name?: string
  tag?: string
}
export const useSupplier = (params?: supplierParams) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Supplier[]>>> => {
      return await http.request({
        method: 'GET',
        url: URLS.INVENTORY_SUPPLIER,
        params,
      })
    },
    queryKey: [KEYS.SUPPLIER, params],
  })
}
export const useSupplierTransaction = (id?: number | null) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Transaction[]>>> => {
      return await http(`${URLS.INVENTORY_SUPPLIER}/${id}/transaction`)
    },
    queryKey: [KEYS.SUPPLIER_TRANSACTION, id],
  })
}
export const useSupplierEmployee = (id?: number | null) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<SupplierEmployee[]>>> => {
      return await http(`${URLS.INVENTORY_SUPPLIER}/${id}/employee`)
    },
    queryKey: [KEYS.SUPPLIER_EMPLOYEE, id],
  })
}

export const useDetailSupplier = (id?: number | null) => {
  return useQuery({
    queryKey: [KEYS.SUPPLIER, id],
    queryFn: async (): Promise<AxiosResponse<IApi<Supplier>>> => {
      return await http(`${URLS.INVENTORY_SUPPLIER}/${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: CreateSupplier }) => {
      const formData = objectToFormData(payload)

      return await http.post(URLS.INVENTORY_SUPPLIER, formData, {
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
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<CreateSupplier>
    }) => {
      return await http.patch(`${URLS.INVENTORY_SUPPLIER}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER, data.data.data.id],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.SUPPLIER],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(URLS.INVENTORY_SUPPLIER + '/' + id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUPPLIER] })
      toast.success(data.data.message)
    },
  })
}

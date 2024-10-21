import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { createLabel } from '@/utils/types/form'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { IApi, SupplierLabel } from '@/utils/types/api'

type Params = Pagination & {
  name?: string
  tag?: string
}
export const useSupplierLabels = (params?: Params) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<SupplierLabel[]>>> => {
      return await http.request({
        method: 'GET',
        url: URLS.INVENTORY_SUPPLIER_LABEL,
        params,
      })
    },
    queryKey: [KEYS.SUPPLIER_LABEL, params],
  })
}
export const useDetailSupplierLabel = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled?: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<SupplierLabel>>> => {
      return await http(`${URLS.INVENTORY_SUPPLIER_LABEL}/${id}`)
    },
    queryKey: [KEYS.SUPPLIER_LABEL, id],
    enabled,
  })
}

export const useCreateSupplierLabel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: createLabel }) => {
      return await http.post(URLS.INVENTORY_SUPPLIER_LABEL, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUPPLIER_LABEL] })
      toast.success(data.data.message)
    },
  })
}
export const useUpdateSupplierLabel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: createLabel & { id: number }
    }) => {
      return await http.patch(
        `${URLS.INVENTORY_SUPPLIER_LABEL}/${payload.id}`,
        {
          name: payload.name,
          color: payload.color,
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUPPLIER_LABEL] })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteSupplierLabel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(URLS.INVENTORY_SUPPLIER_LABEL + '/' + id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.SUPPLIER_LABEL] })
      toast.success(data.data.message)
    },
  })
}

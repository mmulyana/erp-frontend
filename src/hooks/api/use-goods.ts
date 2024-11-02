import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Goods, IApi, IApiPagination } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

type goodsParams = Pagination & {
  name?: string
}
export const useGoods = (params?: goodsParams) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Goods[]>>> => {
      return await http(URLS.INVENTORY_GOODS, { params })
    },
    queryKey: [KEYS.GOODS, params],
  })
}

export const useDetailGoods = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryFn: async () => {
      return await http(`${URLS.INVENTORY_GOODS}/${id}`)
    },
    queryKey: [KEYS.GOODS, id],
    enabled,
  })
}

export const useCreateGoods = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: Goods }) => {
      return await http.post(URLS.INVENTORY_GOODS, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.GOODS] })
      toast.success(data.data.message)
    },
  })
}
export const useUpdateGoods = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: Number
      payload: Partial<Goods>
    }): Promise<AxiosResponse<IApi<Goods>>> => {
      return await http.patch(`${URLS.INVENTORY_GOODS}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.GOODS] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.GOODS, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}
export const useDeleteGoods = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.INVENTORY_GOODS}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.GOODS] })
      toast.success(data.data.message)
    },
  })
}

export const goodsSchema = z.object({
  name: z.string(),
  minimum: z.string(),
  qty: z.string(),
  available: z.string(),
  locationId: z.string(),
  measurementId: z.string(),
  categoryId: z.string(),
  brandId: z.string(),
})
// export type Goods = z.infer<typeof goodsSchema>

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

type goodsParams = Pagination & {}
export const useGoods = (params: goodsParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_GOODS)
    },
    queryKey: [KEYS.GOODS, params],
  })
}

export const useCreateGoods = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-goods'],
    mutationFn: async ({ payload }: { payload: Goods }) => {
      return await http.post(URLS.INVENTORY_GOODS, payload)
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
export type Goods = z.infer<typeof goodsSchema>

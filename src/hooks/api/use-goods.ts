import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Goods, IApi, IApiPagination, Transaction } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createGoods } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

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
    queryFn: async (): Promise<AxiosResponse<IApi<Goods>>> => {
      return await http(`${URLS.INVENTORY_GOODS}/${id}`)
    },
    queryKey: [KEYS.GOODS_DETAIL, id],
    enabled,
  })
}

export const useCreateGoods = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: createGoods }) => {
      const formData = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'photo') {
          formData.append(key, value as File)
        } else if (typeof value == 'number') {
          formData.append(key, String(value))
        } else if (value !== null && typeof value == 'string') {
          formData.append(key, value)
        }
      })
      return await http.post(URLS.INVENTORY_GOODS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.GOODS] })
      queryClient.invalidateQueries({ queryKey: [KEYS.STOCK_OUT] })
      queryClient.invalidateQueries({ queryKey: [KEYS.STOCK_LOW] })
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
      payload: Partial<createGoods>
    }): Promise<AxiosResponse<IApi<Goods>>> => {
      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'photo') {
          formData.append(key, value as File)
        } else if (typeof value == 'number') {
          formData.append(key, String(value))
        } else if (value !== null && typeof value == 'string') {
          formData.append(key, value)
        }
      })
      return await http.patch(`${URLS.INVENTORY_GOODS}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.GOODS] })
      queryClient.invalidateQueries({ queryKey: [KEYS.STOCK_OUT] })
      queryClient.invalidateQueries({ queryKey: [KEYS.STOCK_LOW] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.GOODS_DETAIL, data.data.data?.id],
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

export const useGoodsLowStock = () => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Goods[]>>> => {
      return await http(URLS.INVENTORY_GOODS + '/data/low-stock')
    },
    queryKey: [KEYS.STOCK_LOW],
  })
}
export const useGoodsOutOfStock = () => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Goods[]>>> => {
      return await http(URLS.INVENTORY_GOODS + '/data/out-of-stock')
    },
    queryKey: [KEYS.STOCK_OUT],
  })
}

export const useGoodsTransaction = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<
      AxiosResponse<IApiPagination<Transaction[]>>
    > => {
      return await http(URLS.INVENTORY_TRANSACTION, {
        params: {
          goodsId: id,
        },
      })
    },
    queryKey: [KEYS.TRANSACTION_BY_GOODS, id],
    enabled,
  })
}

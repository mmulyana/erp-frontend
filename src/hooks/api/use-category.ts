import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsCategory, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type Params = Pagination & {
  name?: string
}
export const useCategory = (params?: Params) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsCategory[]>>> => {
      return await http(URLS.INVENTORY_CATEGORY, { params })
    },
    queryKey: [KEYS.CATEGORY, params],
  })
}

export const useDetailCategory = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsCategory>>> => {
      return await http(`${URLS.INVENTORY_CATEGORY}/${id}`)
    },
    queryKey: [KEYS.CATEGORY_DETAIL, id],
    enabled,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
      }
    }) => {
      return await http.post(URLS.INVENTORY_CATEGORY, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORY],
        refetchType: 'all',
        exact: false,
      })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: {
        name: string
      }
    }): Promise<AxiosResponse<IApi<{ id: number }>>> => {
      return await http.patch(`${URLS.INVENTORY_CATEGORY}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORY],
        refetchType: 'all',
        exact: false,
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORY, data.data.data?.id],
      })
    },
  })
}
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.INVENTORY_CATEGORY}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORY],
        refetchType: 'all',
        exact: false,
      })
    },
  })
}

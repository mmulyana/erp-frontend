import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsBrand, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createBrand } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type brandParams = Pagination & {
  name?: string
}
export const useBrand = (params: brandParams) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsBrand[]>>> => {
      return await http.request({
        method: 'GET',
        url: URLS.INVENTORY_BRAND,
        params,
      })
    },
    queryKey: [KEYS.BRAND, params],
  })
}

export const useDetailBrand = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled?: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsBrand>>> => {
      return await http(`${URLS.INVENTORY_BRAND}/${id}`)
    },
    queryKey: [KEYS.BRAND, id],
    enabled,
  })
}

export const useCreateBrand = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: createBrand }) => {
      const formData = new FormData()
      formData.append('name', payload.name)
      if (payload.photo) {
        formData.append('photo', payload.photo)
      }

      return await http.post(URLS.INVENTORY_BRAND, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.BRAND] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateBrand = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: createBrand & {
        id: number
      }
    }): Promise<AxiosResponse<IApi<GoodsBrand>>> => {
      const formData = new FormData()
      formData.append('name', payload.name)
      if (payload.photo) {
        formData.append('photo', payload.photo)
      }

      return await http.patch(
        `${URLS.INVENTORY_BRAND}/${payload.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.BRAND] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.BRAND, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteBrand = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.INVENTORY_BRAND}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.BRAND] })
      toast.success(data.data.message)
    },
  })
}

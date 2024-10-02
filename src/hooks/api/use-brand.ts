import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type brandParams = Pagination & {}
export const useBrand = (params: brandParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_BRAND)
    },
    queryKey: [KEYS.BRAND, params],
  })
}
export const useCreateBrand = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
        photo: File | null
      }
    }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.BRAND] })
    },
  })
}

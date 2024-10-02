import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type Params = Pagination & {}
export const useCategory = (params: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_CATEGORY)
    },
    queryKey: [KEYS.CATEGORY, params],
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
      queryClient.invalidateQueries({ queryKey: [KEYS.CATEGORY] })
    },
  })
}

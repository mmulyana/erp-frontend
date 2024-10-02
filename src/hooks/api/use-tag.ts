import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { toast } from 'sonner'

type Params = Pagination & {}
export const useTag = (params: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_SUPPLIER_TAG)
    },
    queryKey: [KEYS.TAG, params],
  })
}

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
        color: string
      }
    }) => {
      return await http.post(URLS.INVENTORY_SUPPLIER_TAG, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.TAG] })
      toast.success(data.data.message)
    },
  })
}

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Params = Pagination & {}
export const useMeasurement = (params: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_MEASUREMENT)
    },
    queryKey: [KEYS.MEASUREMENT, params],
  })
}

export const useCreateMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
      }
    }) => {
      return await http.post(URLS.INVENTORY_MEASUREMENT, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.MEASUREMENT] })
      toast.success(data.data.message)
    },
  })
}

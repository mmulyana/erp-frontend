import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Params = Pagination & {}
export const useCompetency = (params?: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.COMPETENCY)
    },
    queryKey: [KEYS.COMPETENCY, params],
  })
}

export const useCreateCompetency = () => {
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
      return await http.post(URLS.COMPETENCY, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.COMPETENCY] })
      toast.success(data.data.message)
    },
  })
}

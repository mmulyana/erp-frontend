import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { CreateSupplier } from '@/utils/types/form'
import { toast } from 'sonner'

type Params = Pagination & {
  name?: string
  tag?: string
}
export const useProjectLabel = (params?: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT_LABEL,
        params,
      })
    },
    queryKey: [KEYS.PROJECT_LABEL, params],
  })
}

export const useCreateProjectLabel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: CreateSupplier }) => {
      return await http.post(URLS.PROJECT_LABEL, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT_LABEL] })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteProjectLabel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(URLS.PROJECT_LABEL + '/' + id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT_LABEL] })
      toast.success(data.data.message)
    },
  })
}

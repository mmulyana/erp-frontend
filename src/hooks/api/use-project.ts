import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Params = {
  id?: string
  search?: string
  labelId?: number
  clientId?: number
}
export const useProjects = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, params],
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT,
        params,
      })
    },
  })
}

export const useProject = (id?: number | null) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, id],
    queryFn: async () => {
      return await http(`${URLS.PROJECT}?id=${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      return await http.post(URLS.PROJECT, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      toast.success(data.data.message)
    },
  })
}

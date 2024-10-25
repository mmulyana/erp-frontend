import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { IApi, IApiPagination, Project, ProjectDetail } from '@/utils/types/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
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
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Project[]>>> => {
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
    queryFn: async (): Promise<AxiosResponse<IApi<ProjectDetail>>> => {
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

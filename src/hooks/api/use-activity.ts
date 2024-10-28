import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Activity, IApi } from '@/utils/types/api'
import { createActivity } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type Params = {
  id?: number | null
  enabled: boolean
}
export const useActivity = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.ACTIVITY, params?.id],
    queryFn: async (): Promise<AxiosResponse<IApi<Activity[]>>> => {
      return await http(URLS.PROJECT_ACTIVITY, { params: { id: params?.id } })
    },
    enabled: params?.enabled,
  })
}
export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      payload: createActivity
    ): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.post(URLS.PROJECT_ACTIVITY, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACTIVITY, data.data.data?.projectId],
      })
    },
  })
}

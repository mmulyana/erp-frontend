import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Activity, IApi } from '@/utils/types/api'
import { createActivity } from '@/utils/types/form'
import { URLS } from '@/utils/constant/_urls'
import { KEYS } from '@/utils/constant/_keys'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'

type Params = {
  projectId?: number | null
  enabled: boolean
}
export const useActivity = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.ACTIVITY, params?.projectId],
    queryFn: async (): Promise<AxiosResponse<IApi<Activity[]>>> => {
      return await http(URLS.PROJECT_ACTIVITY, {
        params: { projectId: params?.projectId },
      })
    },
    enabled: params?.enabled,
  })
}
type DetailParams = Params & {
  id?: number | null
}
export const useDetailActivity = (params?: DetailParams) => {
  return useQuery({
    queryKey: [KEYS.ACTIVITY, params?.projectId, params?.id],
    queryFn: async (): Promise<AxiosResponse<IApi<Activity>>> => {
      return await http(URLS.PROJECT_ACTIVITY, {
        params: { id: params?.id, projectId: params?.projectId },
      })
    },
    enabled: params?.enabled,
  })
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      payload: createActivity
    ): Promise<
      AxiosResponse<IApi<{ projectId: number; replyId?: number }>>
    > => {
      return await http.post(URLS.PROJECT_ACTIVITY, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACTIVITY, data.data.data?.projectId],
      })
      queryClient.invalidateQueries({
        queryKey: [
          KEYS.ACTIVITY,
          data.data.data?.projectId,
          data.data.data?.replyId,
        ],
      })
    },
  })
}

export const useDeleteActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<{ projectId: number; replyId?: number }>>> => {
      return await http.delete(`${URLS.PROJECT_ACTIVITY}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACTIVITY, data.data.data?.projectId],
      })
      queryClient.invalidateQueries({
        queryKey: [
          KEYS.ACTIVITY,
          data.data.data?.projectId,
          data.data.data?.replyId,
        ],
      })
    },
  })
}

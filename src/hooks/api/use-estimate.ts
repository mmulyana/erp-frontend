import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEstimate } from '@/utils/types/form'
import { Estimate, IApi } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'
import { toast } from 'sonner'

export const useSaveEstimate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      items: createEstimate[]
      projectId: number
    }): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.post(`${URLS.PROJECT_ESTIMATE}/${payload.projectId}`, {
        items: payload.items,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteEstimate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      ids,
    }: {
      ids: number[]
    }): Promise<AxiosResponse<IApi<Estimate>>> => {
      return await http.delete(`${URLS.PROJECT_ESTIMATE}`, {
        data: { ids },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data?.data.data?.projectId],
      })
    },
  })
}

export const useDetailEstimate = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.ESTIMATE, id],
    queryFn: async () => {
      return await http(`${URLS.PROJECT_ESTIMATE}/${id}`)
    },
    enabled,
  })
}

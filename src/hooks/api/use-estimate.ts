import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEstimate } from '@/utils/types/form'
import { Estimate, IApi } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'
import { toast } from 'sonner'

export const useCreateEstimate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      payload: createEstimate
    ): Promise<AxiosResponse<IApi<Estimate>>> => {
      return await http.post(URLS.PROJECT_ESTIMATE, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateEstimate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: Partial<createEstimate>
      id: number
    }): Promise<AxiosResponse<IApi<Estimate>>> => {
      return await http.patch(`${URLS.PROJECT_ESTIMATE}/${id}`, payload)
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
    mutationFn: async (id: number): Promise<AxiosResponse<IApi<Estimate>>> => {
      return await http.delete(`${URLS.PROJECT_ESTIMATE}/${id}`)
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

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Competency, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createLabel } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = Pagination & { name?: string }
export const useCompetency = (params?: Params) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Competency[]>>> => {
      return await http(URLS.COMPETENCY, { params })
    },
    queryKey: [KEYS.COMPETENCY, params],
  })
}
export const useDetailCompetency = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled?: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Competency>>> => {
      return await http(`${URLS.COMPETENCY}/${id}`)
    },
    queryKey: [KEYS.COMPETENCY, id],
    enabled,
  })
}

export const useCreateCompetency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: createLabel }) => {
      return await http.post(URLS.COMPETENCY, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.COMPETENCY] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateCompetency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: createLabel & {
        id: number
      }
    }): Promise<AxiosResponse<IApi<Competency>>> => {
      return await http.patch(`${URLS.COMPETENCY}/${payload.id}`, {
        name: payload.name,
        color: payload.color,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.COMPETENCY] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.COMPETENCY, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteCompetency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.COMPETENCY}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.COMPETENCY] })
      toast.success(data.data.message)
    },
  })
}

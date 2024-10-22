import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPosition } from '@/utils/types/form'
import { IApi, Position } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { KEYS } from '../../utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { toast } from 'sonner'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'

type Params = Pagination & {
  name?: string
}
export const usePosition = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.HRIS_POSITION, params],
    queryFn: async (): Promise<AxiosResponse<IApi<Position[]>>> => {
      return await http.request({
        method: 'GET',
        url: URLS.HRIS_POSITION,
        params,
      })
    },
  })
}

export const useDetailPosition = ({
  id,
  enabled,
}: {
  id?: number
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.HRIS_POSITION, id],
    queryFn: async (): Promise<AxiosResponse<IApi<Position>>> => {
      return await http(`${URLS.HRIS_POSITION}/${id}`)
    },
    enabled,
  })
}

export const useCreatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: createPosition) => {
      return await http.post(URLS.HRIS_POSITION, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE_TOTAL],
      })
      toast.success(data?.data?.message)
    },
  })
}

export const useUpdatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: createPosition & { id: number }) => {
      return await http.patch(`${URLS.HRIS_POSITION}/${payload.id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE_TOTAL],
      })
      toast.success(data?.data?.message)
    },
  })
}

export const useDeletePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { id: number }) => {
      return await http.delete(`${URLS.HRIS_POSITION}/${payload.id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE_TOTAL],
      })
      toast.success(data?.data?.message)
    },
  })
}

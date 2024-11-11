import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError, IApi, IApiPagination, Overtime } from '@/utils/types/api'
import { AxiosError, AxiosResponse } from 'axios'

import { createOvertime } from '@/utils/types/form'
import { Pagination } from '@/utils/types/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'

type OvertimesParams = Pagination & {
  fullname?: string
  positionId?: string
  date?: string
}
export const useOvertimePagination = (params?: OvertimesParams) => {
  return useQuery({
    queryKey: [
      KEYS.OVERTIME,
      params?.date,
      params?.fullname,
      params?.positionId,
      params?.page,
      params?.limit,
    ],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Overtime[]>>> => {
      return await http(URLS.OVERTIME + '/list/pagination', {
        params,
      })
    },
  })
}
export const useOvertimeDetail = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.OVERTIME_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<Overtime>>> => {
      return await http(`${URLS.OVERTIME}/${id}`)
    },
    enabled,
  })
}
export const useCreateOvertime = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: createOvertime) => {
      return await http.post(URLS.OVERTIME, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.OVERTIME] })
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message)
    },
  })
}
export const useUpdateOvertime = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number
      payload: Partial<createOvertime>
    }) => {
      return await http.patch(`${URLS.OVERTIME}/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.OVERTIME] })
    },
  })
}
export const useDeleteOvertime = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.OVERTIME}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.OVERTIME],
        refetchType: 'all',
      })
    },
  })
}

import { KEYS } from '@/shared/utils/constant/_keys'
import { URLS } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'
import { CashAdvance, IApi, IApiPagination } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createCashAdvance } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type ParamsLeaves = Pagination & {
  name?: string
  startDate?: string
  endDate?: string
}
export const useCashAdvancePagination = (params: ParamsLeaves) => {
  return useQuery({
    queryKey: [
      KEYS.CASH_ADVANCES,
      params.name,
      params.startDate,
      params.endDate,
      params.page,
      params.limit,
    ],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<CashAdvance[]>>> => {
      return await http(URLS.CASH_ADVANCES + '/list/pagination', {
        params,
      })
    },
  })
}
export const useDetailCashAdvance = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.CASH_ADVANCES_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<CashAdvance>>> => {
      return await http(`${URLS.CASH_ADVANCES}/${id}`)
    },
    enabled,
  })
}
export const useCreateCashAdvance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: createCashAdvance) => {
      return await http.post(URLS.CASH_ADVANCES, data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES] })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_TOTAL] })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_CHART] })
      toast.success(data.data.message)
    },
  })
}
export const useUpdateCashAdvance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<createCashAdvance>
    }): Promise<AxiosResponse<IApi<{ id: number }>>> => {
      return await http.patch(`${URLS.CASH_ADVANCES}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.CASH_ADVANCES_DETAIL, data.data.data?.id],
      })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_TOTAL] })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_CHART] })
      toast.success(data.data.message)
    },
  })
}
export const useDeleteCashAdvances = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.CASH_ADVANCES}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CASH_ADVANCES],
      })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_TOTAL] })
      queryClient.invalidateQueries({ queryKey: [KEYS.CASH_ADVANCES_CHART] })
      toast.success(data?.data?.message)
    },
  })
}
export const useTotalCashAdvance = () => {
  return useQuery({
    queryKey: [KEYS.CASH_ADVANCES_TOTAL],
    queryFn: async (): Promise<AxiosResponse<IApi<{ total: number }>>> => {
      return await http(URLS.CASH_ADVANCES + '/data/total')
    },
  })
}

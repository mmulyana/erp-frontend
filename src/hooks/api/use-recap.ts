import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, IApiPagination, Recap, RecapReport } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { CreateRecap } from '@/utils/types/form'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

type Params = Pagination & {
  name?: string
  year?: string
}
export const useRecapPagination = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.RECAP, params?.name, params?.year],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Recap[]>>> => {
      return http(URLS.RECAP + '/list/pagination', { params })
    },
  })
}
type Detail = {
  id?: number | null
  enabled: boolean
}
export const useDetailRecap = ({ id, enabled = false }: Detail) => {
  return useQuery({
    queryKey: [KEYS.RECAP_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<Recap>>> => {
      return http(`${URLS.RECAP}/${id}`)
    },
    enabled,
  })
}
export interface IApiPaginationV2<T = void> {
  data: {
    total: number
    page: number
    limit: number
    total_pages: number
    data: T
    dates: string[]
  }
  message: string
}
export const useRecapReport = ({
  id,
  page,
  limit,
}: {
  id: number
  page?: string
  limit?: string
}) => {
  return useQuery({
    queryKey: [KEYS.RECAP_REPORT, id, page, limit],
    queryFn: async (): Promise<
      AxiosResponse<IApiPaginationV2<RecapReport[]>>
    > => {
      return http(`${URLS.RECAP}/${id}/report`, {
        params: { page, limit },
      })
    },
  })
}
export const useCreateRecap = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateRecap) => {
      await http.post(URLS.RECAP, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.RECAP] })
    },
  })
}
export const useUpdateRecap = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<CreateRecap>
    }) => {
      await http.patch(`${URLS.RECAP}/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.RECAP] })
    },
  })
}
export const useDeleteRecap = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await http.delete(`${URLS.RECAP}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.RECAP] })
    },
  })
}

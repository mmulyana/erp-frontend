import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsMeasurement, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = Pagination & {
  name?: string
}
export const useMeasurement = (params?: Params) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsMeasurement[]>>> => {
      return await http(URLS.INVENTORY_MEASUREMENT, {
        params,
      })
    },
    queryKey: [KEYS.MEASUREMENT, params],
  })
}

export const useDetailMeasurement = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled?: boolean
}) => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<GoodsMeasurement>>> => {
      return await http(`${URLS.INVENTORY_MEASUREMENT}/${id}`)
    },
    queryKey: [KEYS.MEASUREMENT_DETAIL, id],
    enabled,
  })
}

export const useCreateMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
      }
    }) => {
      return await http.post(URLS.INVENTORY_MEASUREMENT, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.MEASUREMENT] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        name: string
        id: number
      }
    }): Promise<AxiosResponse<IApi<GoodsMeasurement>>> => {
      return await http.patch(`${URLS.INVENTORY_MEASUREMENT}/${payload.id}`, {
        name: payload.name,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.MEASUREMENT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.MEASUREMENT_DETAIL, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.INVENTORY_MEASUREMENT}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.MEASUREMENT] })
      toast.success(data.data.message)
    },
  })
}

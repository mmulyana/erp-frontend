import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../../utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'

export const usePosition = () => {
  return useQuery({ queryKey: [KEYS.HRIS_POSITION], queryFn: fetcherPosition })
}

export const useDetailPosition = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.HRIS_POSITION, id],
    queryFn: () => fetcherDetailPosition({ id }),
    enabled: !!id,
  })
}

export const useCreatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreatePosition,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      toast.success(data?.data?.message)
    },
  })
}

export const useUpdatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherUpdatePosition,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      toast.success(data?.data?.message)
    },
  })
}

export const useDeletePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherDeletePosition,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
      toast.success(data?.data?.message)
    },
  })
}

export const fetcherPosition = async () => {
  return await http(URLS.HRIS_POSITION)
}
export const fetcherDetailPosition = async (payload: { id?: number }) => {
  return await http(`${URLS.HRIS_POSITION}/${payload.id}`)
}

type Payload = {
  name: string
  description?: string
}

export const fetcherCreatePosition = async (payload: Payload) => {
  return await http.post(URLS.HRIS_POSITION, payload)
}

export const fetcherUpdatePosition = async (
  payload: Payload & { id: number }
) => {
  return await http.patch(`${URLS.HRIS_POSITION}/${payload.id}`, payload)
}

export const fetcherDeletePosition = async (payload: { id: number }) => {
  return await http.delete(`${URLS.HRIS_POSITION}/${payload.id}`)
}

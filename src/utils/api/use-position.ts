import {
  fetcherCreatePosition,
  fetcherDeletePosition,
  fetcherDetailPosition,
  fetcherPosition,
  fetcherUpdatePosition,
} from './fetcher/fetcher-position'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
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

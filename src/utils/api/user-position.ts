import {
  fetcherCreatePosition,
  fetcherPosition,
} from './fetcher/fetcher-position'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'

export const usePosition = () => {
  return useQuery({ queryKey: [KEYS.HRIS_POSITION], queryFn: fetcherPosition })
}

export const useCreatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreatePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.HRIS_POSITION],
      })
    },
  })
}

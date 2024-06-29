import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import {
  fetcherCreateRoles,
  fetcherDeleteRoles,
  fetcherRole,
  fetcherRoles,
  fetcherUpdateRoles,
} from './fetcher/fetcher-roles'

export const useRoles = () => {
  return useQuery({ queryKey: [KEYS.ROLES], queryFn: fetcherRoles })
}

export const useRole = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.ROLES, id],
    queryFn: () => fetcherRole(id),
    enabled: !!id,
  })
}

export const useUpdateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherUpdateRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

export const useDeleteRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherDeleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

export const useCreateRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreateRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ROLES],
      })
    },
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import {
  fetcherPermissionsGroup,
  fetcherPermissionGroup,
  fetcherCreatePermissionGroup,
} from './fetcher/fetcher-permission'

export const usePermissionsGroup = () => {
  return useQuery({
    queryKey: [KEYS.PERMISSION_GROUP],
    queryFn: fetcherPermissionsGroup,
  })
}

export const usePermissionGroup = (id: number) => {
  return useQuery({
    queryKey: [KEYS.PERMISSION_GROUP, id],
    queryFn: () => fetcherPermissionGroup(id),
    enabled: !!id,
  })
}

export const useCreatePermissionGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreatePermissionGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PERMISSION_GROUP],
      })
    },
  })
}

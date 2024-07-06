import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import {
  fetcherPermissionsGroup,
  fetcherPermissionGroup,
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
    enabled: !!id
  })
}



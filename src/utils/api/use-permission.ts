import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import { fetcherPermissionGroup } from './fetcher/fetcher-permission'

export const usePermissionGroup = () => {
  return useQuery({
    queryKey: [KEYS.PERMISSION_GROUP],
    queryFn: fetcherPermissionGroup,
  })
}

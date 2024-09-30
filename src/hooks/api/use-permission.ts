import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PermissionGroup } from '@/utils/types/permision-group'
import { KEYS } from '../../utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const usePermissionsGroup = () => {
  return useQuery({
    queryKey: [KEYS.PERMISSION_GROUP],
    queryFn: fetcherPermissionsGroup,
  })
}

export const usePermissionGroup = (id?: number) => {
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

export const useUpdatePermissionGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherUpdatePermissionGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PERMISSION_GROUP],
      })
    },
  })
}

export const useDeletePermission = (id?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherDeletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PERMISSION_GROUP, id],
      })

      queryClient.invalidateQueries({
        queryKey: [KEYS.PERMISSION_GROUP],
      })
    },
  })
}

// id for permission
export const useCheckPermission = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.PERMISSION_CHECK, id],
    queryFn: () => fetcherCheckPermission(id),
    enabled: !!id,
  })
}

export type createPGPayload = Pick<PermissionGroup, 'name' | 'description'> & {
  permissionNames: string[]
}

export type updatePGPayload = createPGPayload & {
  id: number
  newPermissionNames?: string[]
}

export const fetcherPermissionsGroup = async () => {
  return await http(URLS.PERMISSION_GROUP)
}

export const fetcherPermissionGroup = async (id?: number) => {
  return await http(`${URLS.PERMISSION_GROUP}/${id}`)
}

export const fetcherCheckPermission = async (id?: number) => {
  return await http(`${URLS.PERMISSION_CHECK}/${id}`)
}

export const fetcherCreatePermissionGroup = async (
  payload: createPGPayload
) => {
  return await http.post(URLS.PERMISSION_GROUP, payload)
}

export const fetcherUpdatePermissionGroup = async (
  payload: updatePGPayload
) => {
  return await http.patch(`${URLS.PERMISSION_GROUP}/${payload.id}`, payload)
}

export const fetcherDeletePermission = async (id?: number) => {
  if (!id) throw new Error('id group is required')

  return await http.delete(`${URLS.PERMISSION}/${id}`)
}
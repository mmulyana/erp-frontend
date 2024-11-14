import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { socket } from '@/utils/socket'
import { IApi, IApiPagination, Project, ProjectDetail } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { updateProject } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = {
  id?: string
  search?: string
  labelId?: number
  clientId?: number
  isArchive?: string
}
export const useProjects = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, params?.search, params?.isArchive],
    queryFn: async (): Promise<AxiosResponse<IApi<Project[]>>> => {
      return await http(URLS.PROJECT, { params })
    },
  })
}
export const useProjectsPagination = (params?: Params & Pagination) => {
  return useQuery({
    queryKey: [
      KEYS.PROJECT_PAGINATION,
      params?.search,
      params?.page,
      params?.limit,
      params?.isArchive,
    ],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Project[]>>> => {
      return await http(URLS.PROJECT + '/list/pagination', { params })
    },
  })
}

export const useProject = (id?: number | null) => {
  return useQuery({
    queryKey: [KEYS.PROJECT_DETAIL, id],
    queryFn: async (): Promise<AxiosResponse<IApi<ProjectDetail>>> => {
      return await http(`${URLS.PROJECT}?id=${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      return await http.post(URLS.PROJECT, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT],
        refetchType: 'all',
        exact: false,
      })
      toast.success(data.data.message)
    },
    onError: (error: AxiosError<any>) => {
      if (error?.response?.data?.errors?.name?.message) {
        toast.error(error?.response?.data?.errors?.name?.message)
      }
    },
  })
}
export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: updateProject
    }): Promise<AxiosResponse<IApi<{ id: number; update: boolean }>>> => {
      return await http.patch(`${URLS.PROJECT}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT_DETAIL, data.data.data?.id],
      })
      if (data.data.data?.update) {
        queryClient.invalidateQueries({
          queryKey: [KEYS.PROJECT_PAGINATION],
          refetchType: 'all',
        })
        queryClient.invalidateQueries({
          queryKey: [KEYS.PROJECT],
          refetchType: 'all',
        })
      }
      toast.success(data.data.message)
    },
  })
}

export const useAssigneEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      projectId,
      employeeId,
    }: {
      projectId: number
      employeeId: number
    }): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/employee/add/${projectId}`, {
        employeeId,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useUnassigneEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/employee/remove/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useAddLabelProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      projectId,
      labelId,
    }: {
      projectId: number
      labelId: number
    }): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/label/add/${projectId}`, {
        labelId,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useRemoveLabelProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<{ projectId: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/label/remove/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}
export const useTotalProject = () => {
  return useQuery({
    queryKey: [KEYS.PROJECT_TOTAL],
    queryFn: async (): Promise<
      AxiosResponse<IApi<{ done: number; active: number }>>
    > => {
      return http(URLS.PROJECT + '/data/total')
    },
  })
}

export const useUpdateStatusProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      containerId,
    }: {
      id: number
      containerId: string
    }): Promise<AxiosResponse<IApi<{ id: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/${id}/status/${containerId}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useCreateProjectSocket = () => {
  const queryClient = useQueryClient()

  const createBySocket = async (payload: any) => {
    return new Promise((resolve, reject) => {
      socket.once('success_create_project', (response) => {
        if (response.message) {
          queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT_PAGINATION] })
          toast.success(response.message)
          resolve(response.data)
        } else {
          toast.error(response.error)
          reject(response)
        }
      })

      socket.once('error_create_project', (error) => {
        if (error?.errors?.name?.message) {
          toast.error(error?.errors?.name?.message)
        } else {
          toast.error(error?.message)
        }
        reject(error)
      })

      socket.emit('create_project', payload)
    })
  }

  return {
    createBySocket,
  }
}

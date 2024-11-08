import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { IApi, IApiPagination, Project, ProjectDetail } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { updateProject } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = {
  id?: string
  search?: string
  labelId?: number
  clientId?: number
}
export const useProjects = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, params],
    queryFn: async (): Promise<AxiosResponse<IApi<Project[]>>> => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT,
        params,
      })
    },
  })
}
export const useProjectsPagination = (params?: Params & Pagination) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, { ...params }],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Project[]>>> => {
      return await http(URLS.PROJECT + '/list/pagination', { params })
    },
  })
}

export const useProject = (id?: number | null) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, id],
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
      queryClient.invalidateQueries({ queryKey: [KEYS.PROJECT] })
      toast.success(data.data.message)
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
    }): Promise<AxiosResponse<IApi<{ id: number }>>> => {
      return await http.patch(`${URLS.PROJECT}/${id}`, payload)
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

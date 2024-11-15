import { useMutation, useQuery } from '@tanstack/react-query'
import { Activity, IApi } from '@/utils/types/api'
import { createActivity } from '@/utils/types/form'
import { URLS } from '@/utils/constant/_urls'
import { KEYS } from '@/utils/constant/_keys'
import { AxiosResponse } from 'axios'
import http from '@/utils/http'
import { objectToFormData } from '@/utils/ObjectToFormData'

type Params = {
  projectId?: number | null
  enabled: boolean
}
export const useActivity = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.ACTIVITY, params?.projectId],
    queryFn: async (): Promise<AxiosResponse<IApi<Activity[]>>> => {
      return await http(URLS.PROJECT_ACTIVITY, {
        params: { projectId: params?.projectId },
      })
    },
    enabled: params?.enabled,
  })
}
type DetailParams = Params & {
  id?: number | null
}
export const useDetailActivity = (params?: DetailParams) => {
  return useQuery({
    queryKey: [KEYS.ACTIVITY, params?.projectId, params?.id],
    queryFn: async (): Promise<AxiosResponse<IApi<Activity>>> => {
      return await http(URLS.PROJECT_ACTIVITY, {
        params: { id: params?.id, projectId: params?.projectId },
      })
    },
    enabled: params?.enabled,
  })
}

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: async (
      payload: createActivity & { type?: string }
    ): Promise<
      AxiosResponse<IApi<{ id: number; projectId: number; replyId?: number }>>
    > => {
      const formData = objectToFormData(payload)
      return await http.post(URLS.PROJECT_ACTIVITY, formData, {
        params: {
          type: payload.type,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  })
}

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<
      AxiosResponse<IApi<{ projectId: number; replyId?: number }>>
    > => {
      return await http.delete(`${URLS.PROJECT_ACTIVITY}/${id}`)
    },
  })
}

export const useToggleLikeActivity = () => {
  return useMutation({
    mutationFn: async (payload: {
      activityId: number
      userId: number
    }): Promise<
      AxiosResponse<
        IApi<{ activityId: number; activity: { projectId: number } }>
      >
    > => {
      return await http.post(URLS.PROJECT_ACTIVITY + '/toggle/like', payload)
    },
  })
}

export const useUploadPhotosActivity = () => {
  return useMutation({
    mutationFn: async (payload: {
      photos: File[] | null
      id: number
    }): Promise<AxiosResponse<IApi<{ id: number; projectId: number }>>> => {
      const formData = new FormData()
      payload.photos?.forEach((item) => {
        formData.append('photos', item)
      })

      return await http.post(
        `${URLS.PROJECT_ACTIVITY}/${payload.id}/upload/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
  })
}

export const useUpdateActivity = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<createActivity>
    }): Promise<
      AxiosResponse<IApi<{ id: number; projectId: number; replyId?: number }>>
    > => {
      return await http.patch(`${URLS.PROJECT_ACTIVITY}/${id}`, payload)
    },
  })
}
export const useRemovePhotoActivity = () => {
  return useMutation({
    mutationFn: async (
      payload: number[]
    ): Promise<
      AxiosResponse<IApi<{ id: number; projectId: number; replyId?: number }>>
    > => {
      return await http.delete(`${URLS.PROJECT_ACTIVITY}/photo/remove`, {
        data: {
          ids: payload,
        },
      })
    },
  })
}

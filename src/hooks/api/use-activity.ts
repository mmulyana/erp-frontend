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
// export const useActivity = (params?: Params) => {
//   return useQuery({
//     queryKey: [KEYS.ACTIVITY, params?.projectId],
//     queryFn: async (): Promise<AxiosResponse<IApi<Activity[]>>> => {
//       return await http(URLS.PROJECT_ACTIVITY, {
//         params: { projectId: params?.projectId },
//       })
//     },
//     enabled: params?.enabled,
//   })
// }
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
      type,
    }: {
      id: number
      type?: string
    }): Promise<
      AxiosResponse<IApi<{ projectId: number; replyId?: number }>>
    > => {
      return await http.delete(`${URLS.PROJECT_ACTIVITY}/${id}`, {
        params: { type },
      })
    },
  })
}

export const useToggleLikeActivity = () => {
  return useMutation({
    mutationFn: async (payload: {
      id: number
      projectId?: number
      userId: number
      type?: string
      replyId?: number
    }) => {
      return await http.post(URLS.PROJECT_ACTIVITY + '/toggle/like', payload)
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
      payload: Partial<createActivity> & {
        deletedPhoto?: string
        type?: string
      }
    }) => {
      const formData = objectToFormData(payload)
      return await http.patch(`${URLS.PROJECT_ACTIVITY}/${id}`, formData, {
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

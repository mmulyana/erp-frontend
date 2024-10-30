import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAttachment } from '@/utils/types/form'
import { Attachment, IApi } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'

export const useCreateAttachment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      payload: createAttachment
    ): Promise<AxiosResponse<IApi<Attachment>>> => {
      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'file') {
          formData.append(key, value as File)
        } else if (typeof value == 'number') {
          formData.append(key, String(value))
        } else if (value !== null && typeof value == 'string') {
          formData.append(key, value)
        }
      })

      return await http.post(
        URLS.PROJECT_ATTACHMENT + `?file_name=lampiran-`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateAttachment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: Partial<createAttachment>
      id: number
    }): Promise<AxiosResponse<IApi<Attachment>>> => {
      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'file') {
          formData.append(key, value as File)
        } else if (typeof value == 'number') {
          formData.append(key, String(value))
        } else if (value !== null && typeof value == 'string') {
          formData.append(key, value)
        }
      })

      return await http.patch(
        `${URLS.PROJECT_ATTACHMENT}/${id}` + `?file_name=lampiran-`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data.data.data?.projectId],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<Attachment>>> => {
      return await http.delete(`${URLS.PROJECT_ATTACHMENT}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ATTACHMENT, data?.data.data?.id],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.PROJECT, data?.data.data?.projectId],
      })
    },
  })
}

export const useDetailAttachment = ({
  id,
  enabled,
}: {
  id?: number | null
  enabled: boolean
}) => {
  return useQuery({
    queryKey: [KEYS.ATTACHMENT, id],
    queryFn: async () => {
      return await http(`${URLS.PROJECT_ATTACHMENT}/${id}`)
    },
    enabled,
  })
}

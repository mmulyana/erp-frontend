import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { objectToFormData } from '@/utils/ObjectToFormData'
import { Pagination } from '@/utils/types/common'
import { CreateClient, CreateClientCompany } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Params = Pagination & {}
export const useClient = (params?: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT_CLIENT,
        params,
      })
    },
    queryKey: [KEYS.CLIENT, params],
  })
}

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateClient) => {
      return await http.post(URLS.PROJECT_CLIENT, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<CreateClient>
    }) => {
      return await http.patch(`${URLS.PROJECT_CLIENT}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT] })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.PROJECT_CLIENT}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT] })
      toast.success(data.data.message)
    },
  })
}

// CLIENT COMPANY
type CompanyParams = Pagination & {}
export const useClientCompany = (params?: CompanyParams) => {
  return useQuery({
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT_CLIENT_COMPANY,
        params,
      })
    },
    queryKey: [KEYS.CLIENT_COMPANY, params],
  })
}

export const useCreateClientCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateClientCompany) => {
      const formData = objectToFormData(payload)

      return await http.post(URLS.PROJECT_CLIENT_COMPANY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT_COMPANY] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateClientCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<CreateClientCompany>
    }) => {
      const formData = objectToFormData(payload)

      return await http.patch(
        `${URLS.PROJECT_CLIENT_COMPANY}/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT_COMPANY] })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteClientCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.PROJECT_CLIENT_COMPANY}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.CLIENT_COMPANY] })
      toast.success(data.data.message)
    },
  })
}

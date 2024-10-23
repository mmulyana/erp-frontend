import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EmployeeStatus } from '@/utils/enum/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { Employee, IApi, IApiPagination } from '@/utils/types/api'
import {
  createCertif,
  payloadCreateEmployee,
  payloadUploadPhoto,
} from '@/utils/types/form'

type ParamsEmployee = {
  search?: string
  positionId?: string
  status?: EmployeeStatus
  enabled?: boolean
}
export const useEmployees = (params?: ParamsEmployee) => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE, params],
    queryFn: async (): Promise<AxiosResponse<IApiPagination<Employee[]>>> => {
      return await http
        .request({
          method: 'GET',
          url: URLS.EMPLOYEE,
          params,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
    enabled: params?.enabled || false,
  })
}

export const useEmployee = (id?: number | null) => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE, id],
    queryFn: async () => {
      return await http(`${URLS.EMPLOYEE}/${id}`)
    },
    enabled: !!id,
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      payload: payloadCreateEmployee
    ): Promise<AxiosResponse<IApi<Employee>>> => {
      return await http.post(URLS.EMPLOYEE, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      toast.success(data.data.message)
    },
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: Partial<payloadCreateEmployee>
      id: number
    }): Promise<AxiosResponse<IApi<Employee>>> => {
      return await http.patch(`${URLS.EMPLOYEE}/${id}`, payload)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useUploadPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: payloadUploadPhoto) => {
      const formData = new FormData()
      formData.append('photo', payload.photo)

      return await http.patch(
        `${URLS.EMPLOYEE}/update-photo/${payload.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      toast.success(data.data.message)
    },
  })
}

export const useRemovePhoto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<{ id: number; photo?: null | string }>>> => {
      return await http.patch(`${URLS.EMPLOYEE}/delete-photo/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE, data.data.data?.id],
      })
      toast.success(data.data.message)
    },
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await http.delete(`${URLS.EMPLOYEE}/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE_TOTAL],
      })
      toast.success(data.data.message)
    },
  })
}

export const useCreateCertifEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      employeeId: number
      data: createCertif[]
    }) => {
      const formData = new FormData()

      payload.data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (key === 'certif_file') {
            if (value instanceof File) {
              formData.append(key, value)
            }
          } else {
            formData.append(key, value as string)
          }
        })
      })

      return await http.post(
        URLS.EMPLOYEE +
          `/certification/${payload.employeeId}?file_name=sertifikat-`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      toast.success(data.data.message)
    },
  })
}

export const useCreatePhone = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      value,
    }: {
      id: number
      value: string
    }): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
      return await http.post(`${URLS.EMPLOYEE}/contact/${id}`, { value })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE, data.data.data?.employeeId],
      })
      toast.success(data.data.message)
    },
  })
}
export const useUpdatePhone = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      value,
    }: {
      id: number
      value: string
    }): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
      return await http.patch(`${URLS.EMPLOYEE}/contact/${id}`, { value })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE, data.data.data?.employeeId],
      })
      toast.success(data.data.message)
    },
  })
}
export const useDeletePhone = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: number
    }): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
      return await http.delete(`${URLS.EMPLOYEE}/contact/${id}`)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.EMPLOYEE, data.data.data?.employeeId],
      })
      toast.success(data.data.message)
    },
  })
}

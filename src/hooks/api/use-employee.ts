import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EmployeeStatus } from '@/utils/enum/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'
import { objectToFormData } from '@/utils/ObjectToFormData'

type ParamsEmployee = {
  search?: string
  positionId?: string
  status?: EmployeeStatus
}
type AdditionalEmployee = {
  enabled?: boolean
}
export const useEmployees = (
  params: ParamsEmployee,
  additional: AdditionalEmployee
) => {
  return useQuery({
    queryKey: [KEYS.EMPLOYEE, params],
    queryFn: async () => {
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
    enabled: additional.enabled,
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
    mutationFn: async (payload: any) => {
      // return await http.post(URLS.EMPLOYEE, data)
      const formData = objectToFormData(payload.data)

      return await http.post(URLS.EMPLOYEE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      toast.success(data.data.message)
    },
  })
}

export const useCreateCertifEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      employeeId: number
      data: {
        certif_name: string
        certif_file: File | null
        issuing_organization?: string
        issue_year?: string
        issue_month?: string
        expiry_year?: string
        competencyId?: string
      }[]
    }) => {
      const formData = new FormData()

      payload.data.forEach((item, index) => {
        Object.entries(item).forEach(([key, value]) => {
          if (key === 'certif_file') {
            if (value instanceof File) {
              formData.append(
                `${key}[${index}]`,
                value,
                value.name
              )
            } else if (value === null || value === undefined) {
              console.log(
                `certif_file is null or undefined for certification ${index}`
              )
            } else {
              console.warn(
                `Unexpected value for certif_file in certification ${index}`
              )
            }
          } else {
            formData.append(`${key}[${index}]`, value as string)
          }
        })
      })

      return await http.post(
        URLS.EMPLOYEE + `/certification/${payload.employeeId}?file_name=sertifikat-`,
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

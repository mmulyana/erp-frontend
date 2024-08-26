import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EmployeeInput } from '@/utils/types/employee'
import { EmployeeStatus } from '@/utils/enum/common'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'

type ParamsEmployee = {
  search?: string
  positionId?: string
  status?: EmployeeStatus
}
export const useEmployees = (params: ParamsEmployee) => {
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
    enabled: !!params.positionId,
  })
}

export const useEmployee = (id?: number) => {
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
    mutationFn: async (data: EmployeeInput) => {
      return await http.post(URLS.EMPLOYEE, data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE] })
      toast.success(data.data.message)
    },
  })
}

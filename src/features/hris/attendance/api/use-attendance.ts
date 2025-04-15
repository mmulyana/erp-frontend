import { KEYS } from '@/shared/constants/_keys'
import { URLS } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'
import { IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type AttendanceParams = Pagination & {
  name?: string
  date?: string
  endDate?: string
}
export const useAttendances = (params?: AttendanceParams) => {
  return useQuery({
    queryKey: [KEYS.ATTENDANCE, params?.date, params?.endDate, params?.name],
    queryFn: async (): Promise<AxiosResponse<IApi<any[]>>> => {
      return await http(URLS.ATTENDANCE, {
        params,
      })
    },
  })
}

type createAttendance = {
  employeeId: number
  date: string | any
  total_hour: number
  type: 'presence' | 'absent'
  leaveId?: number
}
export const useCreateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: createAttendance) => {
      return await http.post(URLS.ATTENDANCE, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ATTENDANCE] })
    },
  })
}

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<createAttendance>
    }) => {
      return await http.patch(`${URLS.ATTENDANCE}/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ATTENDANCE] })
    },
  })
}

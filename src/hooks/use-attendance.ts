import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type AttendanceParams = Pagination & {
  name?: string
}
export const useAttendances = async (params: AttendanceParams) => {
  return useQuery({
    queryKey: [KEYS.ATTENDANCE, params],
    queryFn: async () => {
      return await http(URLS.ATTENDANCE)
    },
  })
}

type createAttendance = {
  employeeId: number
  date: string
  total_hour: number
  type: 'presence' | 'absent' | 'leave'
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

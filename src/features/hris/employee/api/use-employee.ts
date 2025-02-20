import { useQuery } from '@tanstack/react-query'
import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useEmployee = (id?: number | null) => {
	return useQuery({
		queryKey: [keys.employeeDetail, id],
		queryFn: async () => {
			return await http(`${urls.employee}/${id}`)
		},
		enabled: !!id,
	})
}

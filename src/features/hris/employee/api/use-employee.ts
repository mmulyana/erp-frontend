import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'

export const useEmployee = (id?: number | null) => {
	return useQuery({
		queryKey: [keys.employeeDetail, id],
		queryFn: async () => {
			return await http(`${urls.employee}/${id}`)
		},
		enabled: !!id,
	})
}

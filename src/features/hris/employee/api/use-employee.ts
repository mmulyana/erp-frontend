import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'

export const useEmployee = (id?: string | null) => {
	return useQuery({
		queryKey: [keys.employeeDetail, id],
		queryFn: async () => {
			return await http(`${urls.employee}/${id}`)
		},
		enabled: id !== null && id !== undefined && id !== '',
	})
}

import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Employee } from '@/shared/types/api'

export const useEmployee = (id?: string | null) => {
	return useQuery({
		queryKey: [keys.employeeDetail, id],
		queryFn: async (): Promise<Employee> => {
			const { data } = await http(`${urls.employee}/${id}`)
			return data.data
		},
		enabled: id !== null && id !== undefined && id !== '',
	})
}

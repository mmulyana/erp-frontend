import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { AxiosResponse } from 'axios'
import { Employee, IApi } from '@/shared/types'

export const useEmployee = (id?: string | null) => {
	return useQuery({
		queryKey: [keys.employeeDetail, id],
		queryFn: async () => {
			const { data } = await http<IApi<Employee>>(`${urls.employee}/${id}`)
			return data.data
		},
		enabled: id !== null && id !== undefined && id !== '',
	})
}

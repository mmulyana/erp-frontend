import { useQuery } from '@tanstack/react-query'
import { Employee, IApi } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Certificate } from '../types'

export const useCertificate = (id?: string | null) => {
	return useQuery({
		queryKey: [keys.certificate, id],
		queryFn: async () => {
			const { data } = await http<IApi<Certificate>>(`${urls.certificate}/${id}`)
			return data.data
		},
		enabled: id !== null && id !== undefined && id !== '',
	})
}

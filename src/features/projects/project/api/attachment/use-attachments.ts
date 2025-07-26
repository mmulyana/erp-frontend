import { useQuery } from '@tanstack/react-query'

import { ProjectAttachment } from '@/shared/types/api'
import { IApi, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = Pagination & {
	projectId?: string
	type?: string
}

export const useAttachments = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectAttachment, params],
		queryFn: async (): Promise<IApi<ProjectAttachment[]>> => {
			const { data } = await http(`${urls.project}/data/attachments`, {
				params,
			})
			return data.data
		},
	})
}

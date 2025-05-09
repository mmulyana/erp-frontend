import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

import { Attachment } from '../../types'

type Params = {
	search?: string
	id?: string
}

export const useAttachments = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectAttachment, params?.id, params?.search],
		queryFn: async (): Promise<IApi<Attachment[]>> => {
			const { data } = await http(`${urls.project}/${params?.id}/attachment`, {
				params,
			})
			return data
		},
	})
}

import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { URLS } from '@/utils/constant/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/utils/http'

type Payload = {
  type: 'feature' | 'bug'
  message: string
  userId: string
}
export const useCreateHelpdesk = () => {
  return useMutation({
    mutationFn: async (payload: Payload): Promise<AxiosResponse<IApi<any>>> => {
      console.log(payload)
      return await http.post(URLS.HELPDESK, payload)
    },
    onSuccess: (data) => {
      toast.success(data.data.message)
    },
    onError: () => {
      toast.error('Silahkan ulangi')
    },
  })
}
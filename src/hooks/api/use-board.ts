import { useQuery } from '@tanstack/react-query'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'
import { Board, IApi } from '@/utils/types/api'

export const useBoards = () => {
  return useQuery({
    queryFn: async (): Promise<AxiosResponse<IApi<Board[]>>> => {
      return await http(URLS.KANBAN_BOARDD)
    },
    queryKey: [KEYS.KANBAN_BOARD],
  })
}

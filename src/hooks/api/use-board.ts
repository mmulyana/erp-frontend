import { useQuery } from '@tanstack/react-query'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useBoards = () => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.KANBAN_BOARDD)
    },
    queryKey: [KEYS.KANBAN_BOARD],
  })
}

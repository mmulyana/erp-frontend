import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'

type goodsParams = Pagination & {}
export const useGoods = (params: goodsParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_GOODS)
    },
    queryKey: [KEYS.GOODS, params],
  })
}

import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import { URLS } from '../constant/_urls'
import fetchOptions from '../fetch-options'
import { CookieKeys, CookieStorage } from '../cookie'

const useAccount = (id: number | undefined) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT],
    queryFn: () => fetcher(id),
    enabled: !!id,
  })
}

const fetcher = async (id: number | undefined) => {
  const options = new fetchOptions('GET')
  const token = CookieStorage.get(CookieKeys.AuthToken)
  options.addToken(token)
  const response = await fetch(URLS.ACCOUNT + `/${id}`, options.data)
  const { data } = await response.json()

  return data.user
}

export default useAccount

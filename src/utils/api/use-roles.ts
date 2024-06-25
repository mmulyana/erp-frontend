import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import fetchOptions from '../fetch-options'
import { CookieKeys, CookieStorage } from '../cookie'
import { URLS } from '../constant/_urls'

export const useRoles = () => {
  return useQuery({ queryKey: [KEYS.ROLES], queryFn: () => fetcherRoles() })
}

const fetcherRoles = async () => {
  const options = new fetchOptions('GET')
  const token = CookieStorage.get(CookieKeys.AuthToken)
  options.addToken(token)
  const response = await fetch(URLS.ROLES, options.data)
  const { data } = await response.json()

  return data.roles
}

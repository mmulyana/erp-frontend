import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import fetchOptions from '../fetch-options'
import { URLS } from '../constant/_urls'

export const useRoles = () => {
  return useQuery({ queryKey: [KEYS.ROLES], queryFn: () => fetcherRoles() })
}

const fetcherRoles = async () => {
  const options = new fetchOptions('GET')
  options.addToken()
  const response = await fetch(URLS.ROLES, options.data)
  const { data } = await response.json()

  return data.roles
}

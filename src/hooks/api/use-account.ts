import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KEYS } from '../../utils/constant/_keys'
import { URLS } from '../../utils/constant/_urls'
import fetchOptions from '../../utils/fetch-options'
import { User } from '../../utils/types/user'
import { Account } from '../../utils/types/account'

export const useUserAccount = (id: number | undefined) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT],
    queryFn: () => fetcherUserAccount(id),
    enabled: !!id,
  })
}

export const useAccounts = () => {
  return useQuery({
    queryKey: [KEYS.ACCOUNTS],
    queryFn: () => fetcherAccounts(),
  })
}

export const useAccount = (id?: number) => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT, id],
    queryFn: () => fetcherUserAccount(id),
    enabled: !!id,
  })
}

export const useEditAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ payload, id }: { payload: EditPayload; id: number }) =>
      fetcherEditAccount({ payload, id }),
    onSuccess: (data: Account) => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNT, data.id],
      })
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetcherDeleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetcherCreateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ACCOUNTS],
      })
    },
  })
}

type createFetcherPayload = {
  name: string
  email: string
  rolesId?: number
  password?: string
}

const fetcherCreateAccount = async (payload: createFetcherPayload) => {
  const options = new fetchOptions('POST', JSON.stringify(payload))
  options.addToken()

  const response = await fetch(`${URLS.ACCOUNT}`, options.data)
  let data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

type EditPayload = Pick<User, 'email' | 'name'> & {
  password?: string
  rolesId?: number
}

const fetcherEditAccount = async ({
  payload,
  id,
}: {
  payload?: EditPayload
  id: number
}) => {
  const options = new fetchOptions('PATCH', JSON.stringify(payload))
  options.addToken()

  const response = await fetch(`${URLS.ACCOUNT}/${id}`, options.data)
  let data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

const fetcherDeleteAccount = async (id: number) => {
  const options = new fetchOptions('DELETE')
  options.addToken()

  const response = await fetch(`${URLS.ACCOUNT}/${id}`, options.data)
  let data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

const fetcherUserAccount = async (id: number | undefined) => {
  const options = new fetchOptions('GET')
  options.addToken()
  const response = await fetch(URLS.ACCOUNT + `/${id}`, options.data)
  const { data } = await response.json()

  return data.user
}

const fetcherAccounts = async () => {
  const options = new fetchOptions('GET')
  options.addToken()
  const response = await fetch(URLS.ACCOUNT, options.data)
  const { data } = await response.json()

  return data.users
}

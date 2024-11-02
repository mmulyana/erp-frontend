import { useMemo } from 'react'

export function useApiData<T>(query: {
  data?: { data?: { data?: T[] } }
  isLoading: boolean
  isFetching: boolean
  isError: boolean
}) {
  return useMemo(
    () => ({
      data: query.data?.data?.data || [],
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
    }),
    [query.isLoading, query.isFetching, query.isError, query.data]
  )
}

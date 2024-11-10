import { IApi } from '@/utils/types/api'
import { AxiosResponse } from 'axios'
import { useMemo } from 'react'

type ApiResponse<T> = {
  data?: AxiosResponse<IApi<T>>
  isLoading: boolean
  isFetching: boolean
  isError: boolean
}

type ApiDataResult<T> = {
  data: T | undefined
  isLoading: boolean
  isFetching: boolean
  isError: boolean
}

export function useApiData<T>(query: ApiResponse<T>): ApiDataResult<T> {
  return useMemo(
    () => ({
      data: query.data?.data?.data,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
    }),
    [query.isLoading, query.isFetching, query.isError, query.data?.data.data]
  )
}

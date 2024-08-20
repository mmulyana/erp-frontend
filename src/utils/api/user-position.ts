import { useQuery } from '@tanstack/react-query'
import { KEYS } from '../constant/_keys'
import { fetcherPosition } from './fetcher/fetcher-employee'

export const usePosition = () => {
  return useQuery({ queryKey: [KEYS.HRIS_POSITION], queryFn: fetcherPosition })
}

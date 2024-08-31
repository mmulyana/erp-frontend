import useUrlState from '@ahooksjs/use-url-state'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { cn } from '@/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalPages: number
}

export function Pagination({ totalPages }: PaginationProps) {
  const [url, setUrl] = useUrlState({ page: '' })
  const getPageNumbers = () => {
    const pageNumbers = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= (url.page !== '' ? Number(url.page) : 1) - delta &&
          i <= (url.page !== '' ? Number(url.page) : 1) + delta)
      ) {
        pageNumbers.push(i)
      } else if (i === 2 || i === totalPages - 1) {
        pageNumbers.push('...')
      }
    }

    return pageNumbers
  }

  return (
    <nav className='flex justify-between items-center w-full'>
      <button
        onClick={() => setUrl({ page: Number(url.page) - 1 })}
        disabled={(url.page !== '' ? Number(url.page) : 1) === 1}
        className={cn(
          'w-6 h-6 flex justify-center items-center border rounded border-[#D4D7DF]',
          (url.page !== '' ? Number(url.page) : 1) === 1
            ? 'bg-transparent border-transparent text-[#747C94]/50'
            : 'bg-white text-[#747C94]'
        )}
      >
        <ChevronLeft className='w-5 h-5' />
      </button>
      <ul className='flex gap-2'>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            <button
              className={cn(
                'w-6 h-6 flex justify-center items-center border text-sm rounded',
                (url.page !== '' ? Number(url.page) : 1) == number
                  ? 'border-[#D4D7DF] bg-white'
                  : number === '...'
                  ? 'border-transparent'
                  : 'border-transparent hover:bg-white hover:border-[#D4D7DF]'
              )}
              onClick={() => {
                if (typeof number === 'number') {
                  setUrl({ page: number })
                }
              }}
              disabled={number === '...'}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          setUrl({ page: (url.page !== '' ? Number(url.page) : 1) + 1 })
        }
        disabled={(url.page !== '' ? Number(url.page) : 1) === totalPages}
        className={cn(
          'w-6 h-6 flex justify-center items-center border rounded border-[#D4D7DF]',
          (url.page !== '' ? Number(url.page) : 1) === totalPages
            ? 'bg-transparent border-transparent text-[#747C94]/50'
            : 'bg-white text-[#747C94]'
        )}
      >
        <ChevronRight className='w-5 h-5' />
      </button>
    </nav>
  )
}

type LimitProps = {
  limit?: number
}
export function Limit({ limit }: LimitProps) {
  const [_, setUrl] = useUrlState({ limit: limit })
  return (
    <Select
      onValueChange={(val: string) => {
        setUrl({ limit: val })
      }}
    >
      <SelectTrigger className='w-fit h-8 border border-[#EFF0F2] rounded-[8px] shadow-md shadow-gray-100'>
        <SelectValue placeholder={limit ?? '10'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='30'>30</SelectItem>
          <SelectItem value='40'>40</SelectItem>
          <SelectItem value='50'>50</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

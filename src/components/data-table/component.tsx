import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { CalendarDaysIcon } from 'lucide-react'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'

import { cn } from '@/utils/cn'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import Search from '../common/search'
import { useLocation, useNavigate } from 'react-router-dom'
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

type FilterProps = {
  className?: string
  placeholder?: string
  onAdd?: () => void
  filter?: {
    date?: boolean
  }
  customFilter?: React.ReactNode
  reset?: boolean
  create?: boolean
}
export function FilterTable({
  className,
  placeholder,
  onAdd,
  filter,
  customFilter,
  reset = true,
  create = true,
}: FilterProps) {
  return (
    <div
      className={cn(
        'bg-[#F9FAFB] py-2 px-4 flex gap-4 items-center justify-between',
        className
      )}
    >
      <div className='flex gap-2 items-center flex-wrap'>
        <Search debounceTime={500} placeholder={placeholder} />
        {filter?.date && <FilterDate />}
        {customFilter && customFilter}
        {reset && <FilterReset />}
      </div>
      {create && onAdd && <Button onClick={onAdd}>Tambah</Button>}
    </div>
  )
}

type TopTableProps = React.PropsWithChildren & {
  className?: string
}
export function HeadTable({ children, className }: TopTableProps) {
  return (
    <div
      className={cn(
        'px-4 h-12 flex justify-between items-center border-b border-line',
        className
      )}
    >
      {children}
    </div>
  )
}

export function FilterDate() {
  const [url, setUrl] = useUrlState({ date: '' })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('w-fit pl-3 gap-2 text-left font-normal text-dark')}
        >
          <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
          {url.date ? (
            format(
              parse(url.date, 'yyyy-MM-dd', new Date()),
              'EEEE, dd MMM yyyy',
              {
                locale: id,
              }
            )
          ) : (
            <span>Pilih tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={
            url.date ? parse(url.date, 'yyyy-MM-dd', new Date()) : undefined
          }
          onSelect={(val) => {
            if (val) {
              const formattedDate = format(val, 'yyyy-MM-dd')
              setUrl((prev) => ({ ...prev, date: formattedDate }))
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('2024-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  )
}

export function FilterReset() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasSomeQuery = () => {
    const searchParams = new URLSearchParams(location.search)
    return Array.from(searchParams).length > 0
  }

  const reset = () => {
    navigate(location.pathname, { replace: true })
  }

  if (hasSomeQuery()) {
    return (
      <Button
        variant='outline'
        className='font-normal flex items-center gap-1 relative pl-3 pr-6'
        onClick={reset}
      >
        Hapus filter
        <X
          size={14}
          className='text-red-primary/80 absolute top-[55%] right-1.5 -translate-y-1/2'
        />
      </Button>
    )
  }

  return null
}

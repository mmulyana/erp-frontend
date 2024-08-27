import useUrlState from '@ahooksjs/use-url-state'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button className='page-link' onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className='page-link'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

type LimitProps = {
  limit?: number
}
export function Limit({ limit }: LimitProps) {
  const [url, setUrl] = useUrlState({ limit: limit })
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue
          placeholder={limit ?? '10'}
          onChange={(e) => console.log(e)}
        />
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

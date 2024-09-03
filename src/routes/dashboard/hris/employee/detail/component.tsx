import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { useEmployees } from '@/hooks/use-employee'
import { EmployeeStatus } from '@/utils/enum/common'
import { Employee } from '@/utils/types/employee'
import useUrlState from '@ahooksjs/use-url-state'
import { differenceInYears, parse } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'
import { useMemo } from 'react'
import { isString } from 'lodash'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Limit } from '@/components/data-table/component'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '@/utils/constant/_paths'

type TableEmployeeProps = {
  status?: EmployeeStatus
  positionId?: string
}
export function TableEmployee({ status, positionId }: TableEmployeeProps) {
  const [url] = useUrlState({ name: '', page: '' })
  const { isLoading, data } = useEmployees({
    ...(!!status ? { status } : undefined),
    ...(isString(url.name) ? { name: url.name } : undefined),
    ...(!!positionId ? { positionId } : undefined),
    ...(isString(url.page) ? { page: url.page } : undefined),
  }, {})
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
          <Limit />
        </div>
        <Button
          className='h-8'
          onClick={() =>
            navigate(
              `${PATH.EMPLOYEE_ADD}?path=${pathname}&positionId=${positionId}`
            )
          }
        >
          Tambah pegawai
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data?.data?.data || []}
        withPagination
        withLoading
        isLoading={isLoading}
      />
    </>
  )
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'fullname',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.fullname}</p>
    },
  },
  {
    id: 'contact',
    header: 'Kontak',
    cell: ({ cell }) => {
      const contact = cell.row.original.contact
      const primaryIndex = useMemo(
        () => contact?.findIndex((c) => !!c.isPrimary),
        [contact]
      )

      return <p>{contact?.[primaryIndex ?? 0]?.value}</p>
    },
  },
  {
    id: 'age',
    header: 'Usia',
    cell: ({ cell }) => {
      if (!cell.row.original.birthdate) return null
      const birtdate = parse(
        cell.row.original.birthdate,
        'yyyy-MM-dd',
        new Date()
      )
      const age = differenceInYears(new Date(), birtdate)

      return <p>{age}</p>
    },
  },
  {
    accessorKey: 'last_education',
    header: 'Pendidikan terakhir',
  },
  {
    accessorKey: 'employeeCompetency',
    header: 'Kompetensi',
    cell: ({ cell }) => {
      const competencies = cell.row.original.employeeCompetency
      return (
        <p>
          {!!competencies?.length &&
            competencies?.map((item) => (
              <p key={item.id}>{item.competency.name}</p>
            ))}
        </p>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'action',
    cell: () => {
      return (
        <div className='flex justify-end w-full'>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className='border-transparent hover:border-gray-200'
            >
              <Button variant='outline' className='p-0 h-fit rounded px-0.5'>
                <Ellipsis className='w-6 h-6 text-[#313951]/70' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full right-0'></DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

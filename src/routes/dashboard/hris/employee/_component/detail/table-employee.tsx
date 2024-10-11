import DropdownEdit from '@/components/common/dropdown-edit'
import { DataTable } from '@/components/data-table'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { Button } from '@/components/ui/button'
import { useEmployees } from '@/hooks/api/use-employee'
import { EmployeeStatus } from '@/utils/enum/common'
import { Employee } from '@/utils/types/employee'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { differenceInYears, parse } from 'date-fns'
import { isString } from 'lodash'
import { CircleUserRoundIcon, SettingsIcon } from 'lucide-react'

type TableEmployeeProps = {
  status?: EmployeeStatus
  positionId?: string
  name?: string
}
export default function TableEmployee({
  status,
  positionId,
  name,
}: TableEmployeeProps) {
  const [url] = useUrlState({ name: '', page: '' })
  const { isLoading, data } = useEmployees(
    {
      ...(!!status ? { status } : undefined),
      ...(isString(url.name) ? { name: url.name } : undefined),
      ...(!!positionId ? { positionId } : undefined),
      ...(isString(url.page) ? { page: url.page } : undefined),
    },
    {}
  )

  // COLUMNS EMPLOYEE
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'fullname',
      header: 'Nama',
      cell: ({ cell }) => {
        return <p>{cell.row.original.fullname}</p>
      },
    },
    {
      id: 'age',
      size: 80,
      header: () => <p className='text-center'>Usia</p>,
      cell: ({ cell }) => {
        if (!cell.row.original.birthdate) return null
        const birtdate = parse(
          cell.row.original.birthdate,
          'yyyy-MM-dd',
          new Date()
        )
        const age = differenceInYears(new Date(), birtdate)

        return <p className='text-center'>{age}</p>
      },
    },
    {
      accessorKey: 'last_education',
      header: 'Pend. terakhir',
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
            <DropdownEdit />
          </div>
        )
      },
    },
  ]
  // COLUMNS

  return (
    <>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <CircleUserRoundIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>{name}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Button variant='secondary' className='w-8 p-0'>
            <SettingsIcon className='w-4 h-4 text-dark/70' />
          </Button>
          <Button>Tambah</Button>
        </div>
      </HeadTable>
      <FilterTable placeholder='Cari pegawai' />
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

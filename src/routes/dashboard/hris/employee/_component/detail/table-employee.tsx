import DropdownEdit from '@/components/common/dropdown-edit'
import Label from '@/components/common/label'
import Overlay from '@/components/common/overlay'
import StatusChips from '@/components/common/status-chips'
import { DataTable } from '@/components/data-table'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useEmployees } from '@/hooks/api/use-employee'
import { settingConfig } from '@/routes/dashboard/_component/setting/setting'
import { EmployeeStatus } from '@/utils/enum/common'
import { Employee } from '@/utils/types/api'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { differenceInYears, parse } from 'date-fns'
import { useSetAtom } from 'jotai'
import { isString } from 'lodash'
import { CircleUserRoundIcon, SettingsIcon } from 'lucide-react'

type TableEmployeeProps = {
  status?: EmployeeStatus
  positionId?: string
  name?: string
  onAddEmployee: () => void
  onDetailEmployee: (val: boolean) => void
  onSelect: (val: number) => void
}
export default function TableEmployee({
  status,
  positionId,
  name,
  onAddEmployee,
  onDetailEmployee,
  onSelect,
}: TableEmployeeProps) {
  const setConfig = useSetAtom(settingConfig)

  const [url] = useUrlState({ name: '', page: '' })

  const { isLoading, data } = useEmployees({
    ...(status ? { status } : undefined),
    ...(isString(url.name) ? { name: url.name } : undefined),
    ...(positionId ? { positionId } : undefined),
    ...(isString(url.page) ? { page: url.page } : undefined),
    enabled: positionId !== null,
  })

  // COLUMNS EMPLOYEE
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'fullname',
      header: 'Nama',
      cell: ({ row }) => {
        const { fullname, id } = row.original
        return (
          // <div className='flex gap-2 items-center w-[140px]'>
          //   <p>{fullname}</p>
          // </div>
          <Overlay
            className='w-full'
            overlay={
              <button
                onClick={() => {
                  onSelect(id)
                  onDetailEmployee(true)
                }}
                className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
              >
                Lihat
              </button>
            }
          >
            <div className='hover:text-dark'>
              <button
                onClick={() => {
                  onSelect(id)
                  onDetailEmployee(true)
                }}
              >
                {fullname}
              </button>
            </div>
          </Overlay>
        )
      },
    },
    {
      id: 'age',
      size: 80,
      header: () => <p className='text-center'>Usia</p>,
      cell: ({ cell }) => {
        if (!cell.row.original.birth_date) return null
        const birtdate = parse(
          cell.row.original.birth_date,
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
        const competencies = cell.row.original.competencies
        return (
          <div className='flex gap-2 max-w-fit'>
            {!!competencies?.length &&
              competencies?.map((item) => (
                <Label
                  key={item.id}
                  name={item.competency.name}
                  color={item.competency.color}
                />
              ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <StatusChips status={row.original.status === 'active'} />
      ),
    },
    {
      id: 'action',
      cell: () => {
        return (
          <div className='flex justify-end w-full'>
            <DropdownEdit className='-translate-x-3'>
              <DropdownMenuGroup>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                  Nonaktifkan
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => {}}
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownEdit>
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
          <Button
            variant='secondary'
            className='w-8 p-0'
            onClick={() =>
              setConfig({ open: true, default: 'hris_competency' })
            }
          >
            <SettingsIcon className='w-4 h-4 text-dark/70' />
          </Button>
          <Button onClick={onAddEmployee}>Pegawai Baru</Button>
        </div>
      </HeadTable>
      <FilterTable placeholder='Cari pegawai' />
      <DataTable
        columns={columns}
        data={data?.data?.data || []}
        withPagination
        withLoading
        isLoading={isLoading}
        totalPages={data?.data?.total_pages || 0}
      />
    </>
  )
}

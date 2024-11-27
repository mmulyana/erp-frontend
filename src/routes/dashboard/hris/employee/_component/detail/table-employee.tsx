import { CircleUserRoundIcon, Settings2Icon } from 'lucide-react'
import { differenceInYears, parse } from 'date-fns'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue, useSetAtom } from 'jotai'
import { isString } from 'lodash'

import { settingConfig } from '@/routes/dashboard/_component/setting/setting'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import Chips from '@/components/common/chips'

import { permissionAtom } from '@/atom/permission'

import { useEmployees } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'

import { EDUCATIONS_OBJ } from '@/utils/data/educations'
import { Employee } from '@/utils/types/api'

import CompetenciesEmployee from './employee/competencies-employee'
import { TEST_ID } from '@/utils/constant/_testId'

type TableEmployeeProps = {
  status?: boolean
  positionId?: string
  name?: string
  onAddEmployee: () => void
  onDetailEmployee: (val: boolean) => void
  onDeleteEmployee: (val: boolean) => void
  onSelect: (val: number) => void
}
export default function TableEmployee({
  status,
  positionId,
  name,
  onAddEmployee,
  onDetailEmployee,
  onDeleteEmployee,
  onSelect,
}: TableEmployeeProps) {
  const permission = useAtomValue(permissionAtom)
  const setConfig = useSetAtom(settingConfig)

  const isAllowed = permission?.includes('employee:detail')

  const [url] = useUrlState({ name: '', page: '' })

  const { isLoading, data } = useApiData(
    useEmployees({
      ...(status ? { status } : undefined),
      ...(isString(url.name) ? { name: url.name } : undefined),
      ...(positionId ? { positionId } : undefined),
      ...(isString(url.page) ? { page: url.page } : undefined),
      enabled: positionId !== null,
    })
  )

  // COLUMNS EMPLOYEE
  const columns: ColumnDef<Employee>[] = [
    {
      id: 'fullname',
      accessorKey: 'fullname',
      header: 'Nama',
      cell: ({ row }) => {
        const { fullname, id } = row.original
        return (
          <div
            className='max-w-[160px]'
            id={`${TEST_ID.DETAIL_EMPLOYEE}-${row.index + 1}`}
            data-testid={`${TEST_ID.DETAIL_EMPLOYEE}-${row.index + 1}`}
          >
            <Overlay
              className='w-fit pr-14'
              overlay={
                isAllowed && (
                  <button
                    onClick={() => {
                      onSelect(id)
                      onDetailEmployee(true)
                    }}
                    className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                  >
                    Lihat
                  </button>
                )
              }
            >
              <div className='hover:text-dark'>
                <button
                  onClick={() => {
                    if (isAllowed) {
                      onSelect(id)
                      onDetailEmployee(true)
                    }
                  }}
                  disabled={!isAllowed}
                  className='justify-start flex'
                >
                  <span className='break-words max-w-[120px] text-left'>
                    {fullname}
                  </span>
                </button>
              </div>
            </Overlay>
          </div>
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
      id: 'last_education',
      accessorKey: 'last_education',
      header: () => <p className='text-center'>Pend. terakhir</p>,
      cell: ({ row }) => (
        <p>{EDUCATIONS_OBJ[row.original.last_education as string]}</p>
      ),
    },
    {
      accessorKey: 'employeeCompetency',
      header: 'Kompetensi',
      cell: ({ cell }) => {
        const { competencies, id } = cell.row.original
        return (
          <div className='w-[200px]'>
            <CompetenciesEmployee
              competencies={competencies}
              permission={permission}
              className='py-2'
              id={id}
            />
          </div>
        )
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Chips status={row.original.status} className='rounded-full' />
      ),
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const { id } = row.original
        return (
          <div
            className='flex justify-end w-full'
            id={`${TEST_ID.DROPDOWN_EDIT_EMPLOYEE}-${row.index + 1}`}
            data-testid={`${TEST_ID.DROPDOWN_EDIT_EMPLOYEE}-${row.index + 1}`}
          >
            <ProtectedComponent
              required={[
                'employee:activate',
                'employee:deactivate',
                'employee:delete',
              ]}
            >
              <DropdownEdit className='-translate-x-3'>
                <ProtectedComponent
                  required={['employee:activate', 'employee:deactivate']}
                >
                  <DropdownMenuItem className='flex items-center gap-2 cursor-pointer rounded-none'>
                    Nonaktifkan
                  </DropdownMenuItem>
                </ProtectedComponent>
                <ProtectedComponent required={['employee:delete']}>
                  <DropdownMenuItem
                    className='flex items-center gap-2 cursor-pointer rounded-none'
                    onClick={() => {
                      onSelect(id)
                      onDeleteEmployee(true)
                    }}
                  >
                    Hapus
                  </DropdownMenuItem>
                </ProtectedComponent>
              </DropdownEdit>
            </ProtectedComponent>
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
          <div
            id={TEST_ID.BUTTON_OPEN_COMPETENCY}
            data-testid={TEST_ID.BUTTON_OPEN_COMPETENCY}
          >
            <Button
              variant='secondary'
              className='w-8 p-0'
              onClick={() =>
                setConfig({ open: true, default: 'hris_competency' })
              }
            >
              <Settings2Icon className='w-4 h-4 text-dark/70' />
            </Button>
          </div>
          <ProtectedComponent required={['employee:create']}>
            <div
              id={TEST_ID.BUTTON_ADD_EMPLOYEE}
              data-testid={TEST_ID.BUTTON_ADD_EMPLOYEE}
            >
              <Button onClick={onAddEmployee}>Pegawai Baru</Button>
            </div>
          </ProtectedComponent>
        </div>
      </HeadTable>
      <FilterTable placeholder='Cari pegawai' />
      <DataTable
        columns={columns}
        data={data?.data || []}
        withPagination
        isLoading={isLoading}
        totalPages={data?.total_pages || 0}
        clickableColumns={['fullname', 'age', 'last_education', 'status']}
        autoRedirect={isAllowed}
        onCellClick={({ id }) => {
          onSelect(id)
          onDetailEmployee(true)
        }}
      />
    </>
  )
}

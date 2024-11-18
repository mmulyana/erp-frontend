import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { FileOutputIcon } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'

import { permissionAtom } from '@/atom/permission'
import { formatToRupiah } from '@/utils/formatCurrency'
import { CashAdvance } from '@/utils/types/api'
import { PATH } from '@/utils/constant/_paths'
import {
  useCashAdvancePagination,
  useTotalCashAdvance,
} from '@/hooks/api/use-cash-advance'
import { useApiData } from '@/hooks/use-api-data'

import { FilterTable, HeadTable } from '@/components/data-table/component'
import { Card, CardBody, CardHead } from '@/components/common/card-v1'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { DashboardLayout } from '../../_component/layout'
import ModalDelete from './_component/modal-delete'
import CardMonthly from './_component/card-monthly'
import { useTitle } from '../../_component/header'
import { ModalAdd } from './_component/modal-add'
import FilterDate from './_component/filter-date'
import ProtectedComponent from '@/components/protected'
import { cn } from '@/utils/cn'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Kasbon',
    path: PATH.EMPLOYEE_CASH_ADVANCES,
  },
]

export default function Page() {
  useTitle(links)

  const permission = useAtomValue(permissionAtom)

  const [url] = useUrlState({
    name: '',
    page: 1,
    limit: 10,
    startDate: '',
    endDate: '',
  })

  const { data, isLoading } = useApiData(
    useCashAdvancePagination({
      ...(url.name !== '' ? { name: url.name } : undefined),
      ...(url.startDate !== '' ? { startDate: url.startDate } : undefined),
      ...(url.endDate !== '' ? { endDate: url.endDate } : undefined),
      page: url.page,
    })
  )
  const { data: totalData } = useApiData(useTotalCashAdvance())

  // COLUMNS CASH ADVANCE
  const columns: ColumnDef<CashAdvance>[] = [
    {
      id: 'nama',
      header: 'Nama',
      cell: ({ cell }) => {
        return <p>{cell.row.original.employee.fullname}</p>
      },
    },
    {
      accessorKey: 'amount',
      header: 'Jumlah',
      cell: ({ cell }) => {
        return <p>{formatToRupiah(Number(cell.row.original.amount))}</p>
      },
    },
    {
      accessorKey: 'requestDate',
      header: 'Tanggal',
      cell: ({ cell }) => {
        return (
          <p>
            {format(cell.row.original.requestDate, 'EEEE, dd/MM/yy', {
              locale: id,
            })}
          </p>
        )
      },
    },
    {
      accessorKey: 'description',
      header: 'Keterangan',
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end w-full'>
          <ProtectedComponent
            required={['cash-advance:update', 'cash-advance:delete']}
          >
            <DropdownEdit>
              <ProtectedComponent required={['cash-advance:update']}>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer rounded-none'
                  onClick={() => {
                    handleDialog('add', true)
                    setSelectedId(row.original.id)
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </ProtectedComponent>
              <ProtectedComponent required={['cash-advance:delete']}>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer rounded-none'
                  onClick={() => {
                    handleDialog('delete', true)
                    setSelectedId(row.original.id)
                  }}
                >
                  Hapus
                </DropdownMenuItem>
              </ProtectedComponent>
            </DropdownEdit>
          </ProtectedComponent>
        </div>
      ),
    },
  ]
  // COLUMNS

  type Dialog = { add: boolean; delete: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    add: false,
    delete: false,
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleDialog = (type: keyof Dialog, val?: boolean) => {
    setDialog((prev) => ({ ...prev, [type]: val || false }))
    if (!val && selectedId !== null) {
      setSelectedId(null)
    }
  }

  const hasAnyPermission = ['cash-advance:total', 'cash-advance:chart'].some(
    (item) => permission.includes(item)
  )

  return (
    <DashboardLayout>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[1fr_340px]',
          !hasAnyPermission && 'md:grid-cols-1'
        )}
      >
        <div>
          <HeadTable>
            <div className='flex gap-4 items-center'>
              <FileOutputIcon className='text-[#989CA8]' />
              <p className='text-dark font-medium'>Kasbon</p>
            </div>
            <ProtectedComponent required={['cash-advance:create']}>
              <Button onClick={() => handleDialog('add', true)}>
                Kasbon Baru
              </Button>
            </ProtectedComponent>
          </HeadTable>
          <FilterTable
            placeholder='Cari pegawai'
            customFilter={<CustomFilter />}
          />
          <DataTable
            data={data?.data || []}
            isLoading={isLoading}
            columns={columns}
            withPagination
            totalPages={data?.total_pages}
          />
        </div>
        <div className='h-[calc(100vh-48px)] border-l border-line p-4 space-y-4'>
          <ProtectedComponent required={['cash-advance:total']}>
            <Card className='rounded-xl'>
              <CardHead>
                <p className='text-dark text-sm font-semibold'>
                  Total kasbon bln. {format(new Date(), 'MMMM', { locale: id })}
                </p>
              </CardHead>
              <CardBody>
                <p>{formatToRupiah(totalData?.total || 0)}</p>
              </CardBody>
            </Card>
          </ProtectedComponent>
          <ProtectedComponent required={['cash-advance:chart']}>
            <CardMonthly />
          </ProtectedComponent>
        </div>
      </div>
      <ModalAdd
        id={selectedId}
        open={dialog.add}
        setOpen={(val) => handleDialog('add', val)}
      />
      <ModalDelete
        open={dialog.delete}
        setOpen={(val) => handleDialog('delete', val)}
        id={selectedId}
      />
    </DashboardLayout>
  )
}

function CustomFilter() {
  const [url, setUrl] = useUrlState({ startDate: '', endDate: '' })

  return (
    <>
      <FilterDate
        data={url.startDate}
        onSelect={(val) => {
          const formattedDate = format(val, 'yyyy-MM-dd')
          setUrl((prev) => ({ ...prev, startDate: formattedDate }))
        }}
        placeholder='Pilih Tanggal Mulai'
      />
      <FilterDate
        data={url.endDate}
        onSelect={(val) => {
          const formattedDate = format(val, 'yyyy-MM-dd')
          setUrl((prev) => ({ ...prev, endDate: formattedDate }))
        }}
        placeholder='Pilih Tanggal Akhir'
      />
    </>
  )
}

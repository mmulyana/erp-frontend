import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { FileOutputIcon } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'

import { permissionAtom } from '@/shared/store/permission'
import { useApiData } from '@/shared/hooks/use-api-data'

import { formatToRupiah } from '@/utils/formatCurrency'
import { testIds } from '@/utils/constant/_testId'
import { cn } from '@/utils/cn'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Tour from '@/components/common/tour'
import { FilterTable, HeadTable } from '@/shared/component/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/shared/component/data-table'
import { Button } from '@/components/ui/button'

import ModalDelete from '@/features/hris/cash-advance/component/modal-delete'
import CardMonthly from '@/features/hris/cash-advance/component/card-monthly'
import FilterDate from '@/features/hris/cash-advance/component/filter-date'
import { ModalAdd } from '@/features/hris/cash-advance/component/modal-add'
import { steps } from '@/features/hris/cash-advance/component/tour-index'
import { useTitle } from '@/shared/store/title'
import { paths } from '@/utils/constant/_paths'
import {
	useCashAdvancePagination,
	useTotalCashAdvance,
} from '@/features/hris/cash-advance/api/use-cash-advance'

export default function Page() {
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
	const columns: ColumnDef<any>[] = [
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
		<>
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
							<Button
								onClick={() => handleDialog('add', true)}
								id={testIds.buttonAddCashAdvance}
								data-testid={testIds.buttonAddCashAdvance}
							>
								Kasbon Baru
							</Button>
						</ProtectedComponent>
					</HeadTable>
					<FilterTable
						placeholder='Cari pegawai'
						customFilter={<CustomFilter />}
					/>
					<DataTable
						data={[]}
						isLoading={isLoading}
						columns={columns}
						withPagination
					/>
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
			<Tour steps={steps} name='cash-advance' />
		</>
	)
}

function CustomFilter() {
	const [url, setUrl] = useUrlState({ startDate: '', endDate: '' })

	return (
		<div
			className='flex gap-2 items-center flex-wrap'
			id={testIds.filterDateCashAdvance}
		>
			<FilterDate
				data={url.startDate}
				onSelect={(val) => {
					const formattedDate = format(val, 'yyyy-MM-dd')
					setUrl((prev) => ({ ...prev, startDate: formattedDate }))
				}}
				placeholder='Pilih Tanggal Mulai'
				id={testIds.filterDateStart}
			/>
			<FilterDate
				data={url.endDate}
				onSelect={(val) => {
					const formattedDate = format(val, 'yyyy-MM-dd')
					setUrl((prev) => ({ ...prev, endDate: formattedDate }))
				}}
				placeholder='Pilih Tanggal Akhir'
				id={testIds.filterDateEnd}
			/>
		</div>
	)
}

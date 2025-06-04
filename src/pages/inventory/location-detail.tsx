import { CalendarDays, House, Package, Pencil, Warehouse } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { id as ind } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'

import ModalDetailLocation from '@/features/inventory/location/components/modal-detail-location'
import { CommandSearch } from '@/features/command/components/command-search'
import { useLocation } from '@/features/inventory/location/api/use-location'
import { useItems } from '@/features/inventory/item/api/use-items'
import { statusItem } from '@/features/inventory/item/constant'

import FilterButton from '@/shared/components/common/filter-button'
import StatusBadge from '@/shared/components/common/status-badge'
import PhotoUrl from '@/shared/components/common/photo-url'
import DetailLayout from '@/shared/layout/detail-layout'
import CardV1 from '@/shared/components/common/card-v1'

import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import { Inventory } from '@/shared/types/api'
import { Link } from '@/shared/types'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Gudang',
		path: paths.inventoryMasterdataLocation,
	},
	{
		name: 'Detail',
		path: paths.inventoryMasterdataLocationDetail,
	},
]
export default function LocationDetail() {
	const { id } = useParams()
	const [open, setOpen] = useState(false)
	const { page, limit, q } = usePagination()

	const { data } = useLocation({ id })

	const { data: items } = useItems({
		page,
		limit,
		search: q,
		warehouseId: id,
	})

	const linkMemo: Link[] = useMemo(() => {
		if (!id || !data?.data) return links

		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.name || id,
				path: `${paths.inventoryMasterdataLocation}/${data.data.id}`,
			},
		]
	}, [id, data])

	const column: ColumnDef<Inventory>[] = [
		{
			id: 'name',
			header: 'Barang',
			cell: ({ row }) => (
				<div className='flex gap-4 items-center py-2'>
					<PhotoUrl
						url={row.original.photoUrl as string}
						style={{ img: 'h-12 w-12' }}
					/>
					<p className='text-ink-primary'>{row.original.name}</p>
				</div>
			),
		},
		{
			header: 'Qty',
			accessorKey: 'totalStock',
		},
		{
			id: 'brand',
			header: 'Merek',
			cell: ({ row }) => row.original.brand.name,
		},
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			cell: ({ row }) => (
				<StatusBadge options={statusItem} value={row.original.status} />
			),
		},
	]

	return (
		<DetailLayout
			links={linkMemo}
			style={{
				header: 'w-[940px]',
			}}
			buttonAction={<CommandSearch className='w-[200px]' />}
		>
			<div className='w-[940px] mx-auto pt-6 max-w-full px-4 md:px-0 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start'>
				<CardV1
					title='Gudang'
					icon={<Warehouse size={20} className='text-ink-primary' />}
					style={{
						content: 'pt-2',
					}}
					action={
						<Button variant='outline' onClick={() => setOpen(true)}>
							<Pencil size={16} className='text-ink-light' />
							<span className='px-1 text-ink-primary'>Ubah</span>
						</Button>
					}
				>
					<div className='flex flex-col'>
						<p className='text-ink-primary text-xl mb-2 font-medium'>
							{data?.data?.name}
						</p>
						<p className='text-ink-primary/50 mb-0.5 text-sm'>Dibuat sejak</p>
						<div className='flex gap-1 items-center'>
							<CalendarDays size={16} className='text-ink-light text-sm' />
							{data?.data?.createdAt && (
								<p className='text-sm'>
									{format(new Date(data?.data?.createdAt), 'PPP', {
										locale: ind,
									})}
								</p>
							)}
						</div>
					</div>
				</CardV1>
				<CardV1
					title='Barang'
					icon={<Package size={20} className='text-ink-primary' />}
					action={<FilterButton></FilterButton>}
					style={{ content: 'pt-4' }}
					count={data?.data?._count.inventories}
				>
					<DataTable
						columns={column}
						data={items?.data.data || []}
						withPagination
						autoRedirect
						totalItems={items?.data?.total}
						totalPages={items?.data?.total_pages}
					/>
				</CardV1>
			</div>
			<ModalDetailLocation id={id} open={open} setOpen={setOpen} />
		</DetailLayout>
	)
}

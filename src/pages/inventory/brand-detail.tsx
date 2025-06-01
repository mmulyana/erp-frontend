import { CalendarDays, House, Package, Tag } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { id as ind } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'

import ModalDetailBrand from '@/features/inventory/brand/components/modal-detail-brand'
import { useBrand } from '@/features/inventory/brand/api/use-brand'
import { useItems } from '@/features/inventory/item/api/use-items'

import FilterButton from '@/shared/components/common/filter-button'
import PhotoUrl from '@/shared/components/common/photo-url'
import DetailLayout from '@/shared/layout/detail-layout'
import CardV1 from '@/shared/components/common/card-v1'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { paths } from '@/shared/constants/paths'
import { Inventory } from '@/shared/types/api'
import { Link } from '@/shared/types'
import { useDynamicLinks } from '@/shared/utils/link'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Merek',
		path: paths.inventoryMasterdataBrand,
	},
	{
		name: 'Detail',
		path: paths.inventoryMasterdataBrand,
	},
]
export default function BrandDetail() {
	const { id } = useParams()
	const { limit, page, q } = usePagination()

	const { data } = useBrand({ id })
	const { data: items } = useItems({
		page,
		limit,
		search: q,
		brandId: id,
	})

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.projectMasterdataClient}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

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
			cell: ({ row }) => row.original?.brand?.name,
		},
	]

	return (
		<DetailLayout
			links={dynamicLink}
			style={{
				header: 'w-[940px]',
			}}
		>
			<div className='w-[940px] mx-auto pt-6 max-w-full px-4 md:px-0 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start'>
				<CardV1
					title='Merek'
					icon={<Tag size={20} className='text-ink-primary' />}
					style={{
						content: 'grid grid-cols-[80px_1fr] gap-4 pt-2',
					}}
					action={<ModalDetailBrand />}
				>
					<PhotoUrl
						url={data?.data?.photoUrl || ''}
						style={{ img: 'h-20 w-20' }}
					/>
					<div className='flex flex-col'>
						<p className='text-ink-primary text-xl mb-1 font-medium'>
							{data?.data?.name}
						</p>
						<p className='text-ink-primary/50 mb-0.5'>Dibuat sejak</p>
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
				>
					<DataTable
						columns={column}
						data={items?.data.data || []}
						totalItems={items?.data.total}
						totalPages={items?.data.total_pages}
						withPagination
						autoRedirect
					/>
				</CardV1>
			</div>
		</DetailLayout>
	)
}

import { House, Image, List, Package } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'
import { useMemo } from 'react'

import { useStockOut } from '@/features/inventory/stock-out/api/use-stock-out'

import EmptyState from '@/shared/components/common/empty-state'
import PhotoUrl from '@/shared/components/common/photo-url'
import DetailLayout from '@/shared/layout/detail-layout'
import CardV1 from '@/shared/components/common/card-v1'

import { DataTable } from '@/shared/components/common/data-table'
import { Button } from '@/shared/components/ui/button'
import { baseUrl } from '@/shared/constants/urls'
import { paths } from '@/shared/constants/paths'
import { formatThousands } from '@/shared/utils'
import { Link as Links } from '@/shared/types'
import ModalDetailStockOut from '@/features/inventory/stock-out/components/modal-detail-stock-out'

const links: Links[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Stock keluar',
		path: paths.inventoryStockOut,
	},
	{
		name: 'Detail',
		path: paths.inventoryStockOutNew,
	},
]

export default function StockInDetail() {
	const { id } = useParams()
	const { data } = useStockOut({ id })

	const linkMemo: Links[] = useMemo(() => {
		if (!id || !data) return links
		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.id || 'Detail',
				path: `${paths.inventoryStockOut}/${id}`,
			},
		]
	}, [id, data])

	const { date, photoUrl, user, note, items, totalPrice } = data?.data || {}

	const columns: ColumnDef<any>[] = [
		{
			id: 'item',
			header: 'Barang',
			cell: ({ row }) => (
				<div className='flex gap-2 items-center py-2'>
					<PhotoUrl
						url={row.original.item.photoUrl}
						style={{ img: 'h-12 w-12 rounded-lg' }}
					/>
					<p className='text-ink-primary'>{row.original.item.name}</p>
				</div>
			),
		},
		{
			header: 'Qty',
			accessorKey: 'quantity',
		},
		{
			id: 'price',
			header: 'Harga',
			cell: ({ row }) => (
				<p className='text-right'>
					Rp {formatThousands(row.original.unitPrice)}
				</p>
			),
		},
		{
			id: 'total',
			header: 'Total',
			cell: ({ row }) => (
				<p className='text-right'>
					Rp {formatThousands(row.original.totalPrice)}
				</p>
			),
		},
	]

	return (
		<DetailLayout
			links={linkMemo}
			style={{
				header: 'w-[940px] max-w-full px-6 md:px-0',
			}}
		>
			<div className='flex flex-col md:grid md:grid-cols-[320px_1fr] w-[940px] max-w-full px-4 md:px-0 mx-auto pt-6 gap-6'>
				<div className='space-y-6'>
					<CardV1
						title='Detail'
						icon={<List size={20} className='text-ink-primary' />}
						style={{ content: 'space-y-6 pt-4' }}
						action={<ModalDetailStockOut />}
					>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Tanggal</p>
							{date && (
								<p className='text-ink-primary'>
									{format(new Date(date), 'PPP', { locale: ind })}
								</p>
							)}
						</div>

						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Dibuat oleh</p>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={user?.photoUrl || ''}
									style={{ img: 'h-8 w-8', icon: 'h-5 w-5' }}
								/>
								<p className='text-ink-primary'>{user?.username}</p>
							</div>
						</div>
						<div>
							<p className='text-ink-primary/50'>Catatan</p>
							<p className='text-ink-primary'>{note}</p>
						</div>
					</CardV1>
					<CardV1
						title='Foto'
						icon={<Image size={20} className='text-ink-primary' />}
						style={{ content: 'pt-4' }}
					>
						{photoUrl ? (
							<>
								<PhotoUrl
									url={photoUrl || ''}
									style={{
										img: 'rounded-md w-full h-auto border',
									}}
								/>
								<div className='flex justify-between items-center pt-2'>
									<p className='text-ink-primary/50 text-sm'>{photoUrl}</p>
									<Link
										className='text-sm text-ink-primary font-medium'
										to={`${baseUrl}/${photoUrl}`}
									>
										Unduh
									</Link>
								</div>
							</>
						) : (
							<EmptyState text='Tidak ada bukti' />
						)}
					</CardV1>
				</div>

				<CardV1
					title='Daftar Barang'
					icon={<Package size={20} className='text-ink-primary' />}
					style={{ card: 'h-fit', content: 'pt-4 space-y-2' }}
				>
					<DataTable columns={columns} data={items || []} />
					<div className='flex flex-col items-end justify-center pt-2'>
						<p className='text-ink-primary/50 text-sm'>Subtotal</p>
						<p className='text-lg font-medium text-primary'>
							Rp {formatThousands(totalPrice)}
						</p>
					</div>
				</CardV1>
			</div>
		</DetailLayout>
	)
}

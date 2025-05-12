import { House, Image, List, Package } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'
import { useMemo } from 'react'

import { useStockIn } from '@/features/inventory/stock-in/api/use-stock-in'
import { Item } from '@/features/inventory/stock-in/type'

import DetailLayout, { Link as Links } from '@/shared/layout/detail-layout'
import { DataTable } from '@/shared/components/common/data-table'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { Button } from '@/shared/components/ui/button'
import { baseUrl } from '@/shared/constants/urls'
import { paths } from '@/shared/constants/paths'
import { formatThousands } from '@/shared/utils'

const links: Links[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Stock masuk',
		path: paths.inventoryStockIn,
	},
	{
		name: 'Detail',
		path: paths.inventoryStockInNew,
	},
]

export default function StockInDetail() {
	const { id } = useParams()
	const { data } = useStockIn({ id })

	const linkMemo: Links[] = useMemo(() => {
		if (!id || !data) return links
		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.id || 'Detail',
				path: `${paths.inventoryStockIn}/${id}`,
			},
		]
	}, [id, data])

	const {
		date,
		photoUrl,
		supplier,
		user,
		note,
		referenceNumber,
		items,
		totalPrice,
	} = data?.data || {}

	const columns: ColumnDef<Item>[] = [
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
			buttonAction={<Button variant='outline'>Update</Button>}
		>
			<div className='flex flex-col md:grid md:grid-cols-[320px_1fr] w-[940px] max-w-full px-4 md:px-0 mx-auto pt-6 gap-6'>
				<div className='space-y-6'>
					<CardV1
						title='Detail'
						icon={<List size={20} className='text-ink-primary' />}
						style={{ content: 'space-y-6 pt-4' }}
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
							<p className='text-ink-primary/50'>Nomor Referensi</p>
							<p className='text-ink-primary'>{referenceNumber}</p>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Tanggal</p>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={user?.photoUrl || ''}
									style={{ img: 'h-8 w-8', icon: 'h-5 w-5' }}
								/>
								<p className='text-ink-primary'>{user?.username}</p>
							</div>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Tanggal</p>
							<p className='text-ink-primary'>{supplier?.name}</p>
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

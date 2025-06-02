import { History, House, Wallet } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Link, useParams } from 'react-router-dom'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import ModalDetailCashAdvance from '@/features/hris/cash-advance/components/modal-detail-cash-advance'
import ModalAddTransaction from '@/features/hris/cash-advance/components/modal-add-transaction'
import { useCashAdvance } from '@/features/hris/cash-advance/api/use-cash-advance'
import { useTransactions } from '@/features/hris/cash-advance/api/use-transaction'

import HeadPage from '@/shared/components/common/head-page'
import PhotoUrl from '@/shared/components/common/photo-url'
import DetailLayout from '@/shared/layout/detail-layout'
import CardV1 from '@/shared/components/common/card-v1'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { DataTable } from '@/shared/components/common/data-table'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useDynamicLinks } from '@/shared/utils/link'
import { Badge } from '@/shared/components/ui/badge'
import { formatThousands } from '@/shared/utils'
import { paths } from '@/shared/constants/paths'
import { Link as Links } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

const links: Links[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.hris,
		hideName: true,
	},
	{
		name: 'Kasbon',
		path: paths.hrisCashAdvance,
	},
	{
		name: 'Detail',
		path: paths.hrisCashAdvanceDetail,
	},
]
export default function CashAdvanceDetail() {
	const { id } = useParams()
	const { limit, page, q } = usePagination()

	const { data, isPending } = useCashAdvance({ id })
	const { data: items } = useTransactions({
		page,
		limit,
		search: q,
		id,
	})

	const linkMemo = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: id ?? '',
					path: `${paths.hrisCashAdvance}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	const column: ColumnDef<any>[] = [
		{
			id: 'date',
			header: 'Tanggal',
			cell: ({ row }) =>
				row.original.date &&
				format(new Date(row.original.date), 'PPP', { locale: ind }),
		},
		{
			header: 'Jumlah',
			cell: ({ row }) => `Rp ${formatThousands(row.original.amount)}`,
		},
		{
			header: 'Sisa',
			cell: ({ row }) => `Rp ${formatThousands(row.original.remaining)}`,
		},
		{
			accessorKey: 'note',
			header: 'Catatan',
		},
	]

	const isPaid = data?.data?.status === 'paidOff'

	return (
		<DetailLayout
			links={linkMemo}
			style={{
				header: 'w-[940px]',
			}}
		>
			<div className='w-[940px] mx-auto pt-6 max-w-full px-6 lg:px-0 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start'>
				<CardV1
					title='Kasbon'
					icon={<Wallet size={20} className='text-ink-primary' />}
					style={{
						content: 'space-y-6 pt-4',
					}}
					action={<ModalDetailCashAdvance transactions={items?.data?.total} />}
				>
					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Status</p>
						<Badge variant='outline' className='gap-1'>
							<div
								className={cn(
									'h-1.5 w-1.5 rounded-full',
									isPaid ? 'bg-success' : 'bg-error'
								)}
							></div>
							<p
								className={cn(
									'text-sm text-nowrap',
									isPaid ? 'text-success' : 'text-error'
								)}
							>
								{isPaid ? 'Lunas' : 'Blm lunas'}
							</p>
						</Badge>
					</div>

					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Pegawai</p>
						<LoaderWrapper isLoading={isPending}>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={data?.data?.employee.photoUrl}
									style={{ img: 'h-10 w-10' }}
								/>
								<Link
									className='text-ink-primary'
									to={`${paths.hrisMasterdataEmployee}/${data?.data?.employeeId}`}
								>
									{data?.data?.employee?.fullname}
								</Link>
							</div>
						</LoaderWrapper>
					</div>
					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Tanggal</p>
						<LoaderWrapper isLoading={isPending}>
							{data?.data?.date && (
								<p className='text-ink-primary'>
									{format(data.data.date, 'PPP', { locale: ind })}
								</p>
							)}
						</LoaderWrapper>
					</div>

					<div className='flex justify-between items-center'>
						<p className='text-ink-primary/50'>Jumlah</p>
						<LoaderWrapper isLoading={isPending}>
							{data?.data?.amount && (
								<p className='text-ink-primary'>
									Rp {formatThousands(data.data.amount)}
								</p>
							)}
						</LoaderWrapper>
					</div>

					<div className='space-y-2'>
						<p className='text-ink-primary/50'>Keterangan</p>
						<LoaderWrapper isLoading={isPending}>
							<p className='text-ink-primary'>{data?.data?.note}</p>
						</LoaderWrapper>
					</div>
				</CardV1>
				<div className='space-y-6'>
					<HeadPage
						title='Riwayat'
						subtitle='Lihat riwayat pembayaran kasbon'
						icon={<History size={20} className='text-ink-primary' />}
						action={<ModalAddTransaction />}
						hideAction={isPaid}
					/>
					<CardV1 style={{ content: 'pt-4' }}>
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
			</div>
		</DetailLayout>
	)
}

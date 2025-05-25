import { ChevronDown, ChevronRight, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { id as ind } from 'date-fns/locale'
import { Fragment, useState } from 'react'
import { format } from 'date-fns'

import PhotoUrl from '@/shared/components/common/photo-url'
import { paths } from '@/shared/constants/paths'
import { cn } from '@/shared/utils/cn'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

import { formatThousands } from '@/shared/utils'
import { StockIn } from '@/shared/types/api'

type props = {
	data: StockIn[]
}

export default function TableStockIn({ data }: props) {
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	const navigate = useNavigate()

	const onDetail = (id: string) => {
		navigate(`${paths.inventoryStockIn}/${id}`)
	}

	const toggleRow = (id: string) => {
		setExpandedRow((prev) => (prev === id ? null : id))
	}

	return (
		<Table className='w-full border-none'>
			<TableHeader>
				<TableRow className='border-none'>
					<TableHead className='bg-[#F7F7F7] rounded-l-lg w-10 p-2'></TableHead>
					<TableHead className='bg-[#F7F7F7] text-left p-2'>Tanggal</TableHead>
					<TableHead className='bg-[#F7F7F7] text-center p-2'>
						Jml Barang
					</TableHead>
					<TableHead className='bg-[#F7F7F7] text-left p-2'>
						No. Referensi
					</TableHead>
					<TableHead className='bg-[#F7F7F7] text-left p-2'>Catatan</TableHead>
					<TableHead className='bg-[#F7F7F7] rounded-r-lg text-right p-2 pr-4'>
						Total
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((stock, index) => (
					<Fragment key={`${stock.id}-${index}`}>
						<TableRow className={cn('cursor-pointer border-none')}>
							<TableCell
								className={cn(
									'p-2',
									index % 2 === 1 && 'bg-[#FAFAFA] rounded-l-xl'
								)}
							>
								<button
									className='h-8 w-8 p-0 bg-white shadow-sm flex items-center justify-center rounded-full border border-border'
									onClick={() => toggleRow(stock.id)}
								>
									{expandedRow === stock.id ? (
										<ChevronDown className='h-4 w-4' />
									) : (
										<ChevronRight className='h-4 w-4' />
									)}
									<span className='sr-only'>Toggle items</span>
								</button>
							</TableCell>
							<TableCell
								className={cn('p-2', index % 2 === 1 && 'bg-[#FAFAFA]')}
								onClick={() => onDetail(stock.id)}
							>
								{format(new Date(stock.date), 'PPP', { locale: ind })}
							</TableCell>
							<TableCell
								className={cn(
									'p-2 text-center',
									index % 2 === 1 && 'bg-[#FAFAFA]'
								)}
								onClick={() => onDetail(stock.id)}
							>
								{stock._count.items}
							</TableCell>
							<TableCell
								className={cn('p-2', index % 2 === 1 && 'bg-[#FAFAFA]')}
								onClick={() => onDetail(stock.id)}
							>
								{stock.referenceNumber || '-'}
							</TableCell>
							<TableCell
								className={cn('p-2', index % 2 === 1 && 'bg-[#FAFAFA]')}
								onClick={() => onDetail(stock.id)}
							>
								{stock.note || '-'}
							</TableCell>
							<TableCell
								className={cn(
									'p-2 text-right pr-4',
									index % 2 === 1 && 'bg-[#FAFAFA] rounded-r-xl'
								)}
								onClick={() => onDetail(stock.id)}
							>
								Rp {formatThousands(stock.totalPrice)}
							</TableCell>
						</TableRow>

						{expandedRow === stock.id && (
							<TableRow>
								<TableCell colSpan={6} className='p-2 bg-gray-200/40'>
									<div className='p-4 rounded-xl border bg-white space-y-4'>
										<div className='flex gap-2 items-center pl-2'>
											<Package size={20} className='text-ink-primary' />
											<p className='text-ink-primary text-nowrap font-medium text-[15px]'>
												Daftar Barang
											</p>
										</div>
										<Table className='w-full text-sm rounded-md'>
											<TableHeader className='border-none'>
												<TableRow>
													<TableHead className='bg-[#F7F7F7] rounded-l-lg p-2 pl-4'>
														Item
													</TableHead>
													<TableHead className='bg-[#F7F7F7] p-2'>
														Qty
													</TableHead>
													<TableHead className='bg-[#F7F7F7] p-2 text-right'>
														Harga
													</TableHead>
													<TableHead className='bg-[#F7F7F7] rounded-r-lg p-2 text-right pr-4'>
														Subtotal
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{stock.items?.map((item, indexItem) => (
													<TableRow key={`${item.id}-${indexItem}`}>
														<TableCell className='p-2 pl-4'>
															<div className='flex items-center gap-2'>
																<PhotoUrl
																	url={item.item.photoUrl || ''}
																	style={{ img: 'h-8 w-8' }}
																/>
																{item.item?.name || '-'}
															</div>
														</TableCell>
														<TableCell className='p-2'>
															{item.quantity}
														</TableCell>
														<TableCell className='p-2 text-right'>
															Rp {formatThousands(item.unitPrice)}
														</TableCell>
														<TableCell className='p-2 pr-4 text-right'>
															Rp{' '}
															{formatThousands(item.unitPrice * item.quantity)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</TableCell>
							</TableRow>
						)}
					</Fragment>
				))}
			</TableBody>
		</Table>
	)
}

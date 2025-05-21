import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { useState } from 'react'

import CardV1 from '@/shared/components/common/card-v1'
import { months } from '@/shared/constants/months'
import { formatThousands } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { useTotalNetValue } from '../../project/api/use-total-net-value'

export default function TotalRevenue() {
	const [selectedMonth, setSelectedMonth] = useState<number | null>(
		new Date().getMonth()
	)

	const { data } = useTotalNetValue({
		month: selectedMonth?.toString(),
	})

	const percentage = data?.data?.percentage || 0

	return (
		<CardV1
			title='Pendapatan'
			icon={<Wallet size={20} className='text-ink-primary' />}
			style={{ card: 'flex-1' }}
			action={
				<Select
					value={String(selectedMonth) || '0'}
					onValueChange={(val) => setSelectedMonth(Number(val))}
				>
					<SelectTrigger className='w-[120px] h-8 rounded-lg'>
						<SelectValue placeholder='Pilih bulan' />
					</SelectTrigger>
					<SelectContent>
						{months.map((month) => (
							<SelectItem key={month.value} value={month.value.toString()}>
								{month.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			}
		>
			<div className='flex justify-between items-end mt-4'>
				<div>
					<div className='flex gap-1.5 items-center'>
						<div className='flex items-end gap-1'>
							<p className='text-ink-primary/50 text-lg'>Rp</p>
							<p className='text-2xl font-medium text-ink-primary'>
								{formatThousands(data?.data?.current)}
							</p>
						</div>
						<div
							className={cn(
								'rounded-full flex text-xs px-1.5 py-0.5 gap-1',
								percentage > 0
									? 'bg-success/10 text-success'
									: 'bg-error/10 text-error'
							)}
						>
							{percentage > 0 ? (
								<TrendingUp size={16} />
							) : (
								<TrendingDown size={16} />
							)}
							<p>{percentage}%</p>
						</div>
					</div>
					<p className='text-sm text-ink-primary/50'>Dibanding bulan kemarin</p>
				</div>
			</div>
		</CardV1>
	)
}

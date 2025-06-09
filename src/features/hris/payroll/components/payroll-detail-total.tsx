import { AlertCircle, BarChartIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'

import CardV1 from '@/shared/components/common/card-v1'
import { formatThousands } from '@/shared/utils'

import { useAmountTotal } from '../api/use-amount-total'

export default function PayrollDetailTotal() {
	const { id } = useParams()
	const { data } = useAmountTotal({ periodId: id })
	return (
		<CardV1
			title='Total pengeluaran'
			icon={<BarChartIcon size={20} className='text-ink-primary' />}
			style={{
				card: 'w-[320px] max-w-full',
				content: '!px-6 h-[72px]',
			}}
			footer={
				<div className='bg-[#F7F7F7] w-full h-8 rounded-md flex justify-between items-center px-2'>
					<p className='text-sm text-ink-primary/80'>
						Total gaji karyawan yang sudah diproses
					</p>
					<AlertCircle size={16} className='text-ink-secondary' />
				</div>
			}
		>
			<div className='flex flex-col justify-end items-start h-full pb-2'>
				<div className='flex items-end gap-1'>
					<p className='text-ink-primary/50 text-lg'>Rp</p>
					<p className='text-2xl font-medium text-ink-primary'>
						{formatThousands(data?.total)}
					</p>
				</div>
			</div>
		</CardV1>
	)
}

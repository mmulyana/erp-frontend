import { AlertCircle, Wallet } from 'lucide-react'

import CardV1 from '@/shared/components/common/card-v1'
import { formatThousands } from '@/shared/utils'

import { useEstimateRevenue } from '../../project/api/use-estimate-revenue'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function TotalEstimateRevenue() {
	const { data } = useEstimateRevenue()

	return (
		<CardV1
			title='Estimasi Pendapatan'
			icon={<Wallet size={20} className='text-ink-primary' />}
			style={{ card: 'flex-1' }}
			footer={
				<ProtectedComponent required={[permissions.project_read_value]}>
					<div className='bg-[#F7F7F7] w-full h-8 rounded-md flex justify-between items-center px-2'>
						<p className='text-sm text-ink-primary/80'>
							Proyek yang belum selesai
						</p>
						<AlertCircle size={16} className='text-ink-secondary' />
					</div>
				</ProtectedComponent>
			}
		>
			<div className='flex flex-col justify-end items-start h-full pb-2 px-6 mt-4'>
				<ProtectedComponent required={[permissions.project_read_value]}>
					<div className='flex items-end gap-1'>
						<p className='text-ink-primary/50 text-lg'>Rp</p>
						<p className='text-2xl font-medium text-ink-primary'>
							{formatThousands(data?.data?.total)}
						</p>
					</div>
				</ProtectedComponent>
			</div>
		</CardV1>
	)
}

import CardInformation from '@/features/hris/employee/components/detail/card-information'
import CardPosition from '@/features/hris/employee/components/detail/card-position'
import CardAddress from '@/features/hris/employee/components/detail/card-address'
import CardDetail from '@/features/hris/employee/components/detail/card-detail'

import DetailLayout from '@/shared/layout/detail-layout'

export default function DetailEmployee() {
	return (
		<DetailLayout title='Pegawai'>
			<div className='mx-auto p-6 max-w-[1200px]'>
				<div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6'>
					<div className='space-y-6'>
						<CardInformation />
						<CardAddress />
					</div>
					<div className='space-y-6'>
						<CardPosition />
						<CardDetail />
					</div>
				</div>
			</div>
		</DetailLayout>
	)
}

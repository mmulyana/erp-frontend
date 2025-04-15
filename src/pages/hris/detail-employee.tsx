import CardInformation from '@/features/hris/employee/components/card-information'
import CardPosition from '@/features/hris/employee/components/card-position'
import CardAddress from '@/features/hris/employee/components/card-address'
import CardDetail from '@/features/hris/employee/components/card-detail'

import DetailLayout from '@/shared/layout/detail-layout'

export default function DetailEmployee() {
	return (
		<DetailLayout title='Pegawai'>
			<div className='mx-auto p-6 max-w-[1200px]'>
				<div className='grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6'>
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

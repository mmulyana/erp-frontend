import { HrisLayout } from '@/shared/layout/hris-dashboard'
import CardHighlight from '@/shared/component/card-highlight'

import TrenEmployee from '@/features/hris/dashboard/components/tren-employee'
import PieEducation from '@/features/hris/dashboard/components/pie-education'
import PiePosition from '@/features/hris/dashboard/components/pie-position'
import Reminder from '@/features/hris/dashboard/components/reminder'
import PieAge from '@/features/hris/dashboard/components/pie-age'

export default function DashboardHris() {
	return (
		<HrisLayout>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-3'>
				<CardHighlight
					title='Total Pegawai'
					value={120}
					footer={{
						percent: 12,
						text: 'Lebih banyak dari bulan kemarin',
					}}
				/>
				<CardHighlight
					title='Pegawai Aktif'
					value={80}
					footer={{
						percent: 15,
						text: 'Lebih banyak dari bulan kemarin',
					}}
				/>
				<CardHighlight
					title='Pegawai Nonaktif'
					value={120}
					footer={{
						percent: -8,
						text: 'Lebih sedikit dari bulan kemarin',
					}}
				/>
			</div>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-3 mt-6'>
				<div className='grid gap-6 col-span-1 md:col-span-2 grid-cols-1 md:grid-cols-2 h-fit'>
					<Reminder />
					<TrenEmployee />
				</div>
				<div className='space-y-6'>
					<PiePosition />
					<PieAge />
					<PieEducation />
				</div>
			</div>
		</HrisLayout>
	)
}

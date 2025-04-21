import CardHighlight from '@/shared/components/common/card-highlight'

import { useTotalEmployee } from '../api/use-total-employee'

export default function TotalEmployee() {
	const { data } = useTotalEmployee()

	return (
		<div className='grid gap-6 grid-cols-1 lg:grid-cols-3'>
			<CardHighlight 
				title='Total Pegawai' 
				value={data?.data?.all || 0} 
			/>
			<CardHighlight 
				title='Pegawai Aktif' 
				value={data?.data?.active || 0} 
			/>
			<CardHighlight
				title='Pegawai Nonaktif'
				value={data?.data?.nonactive || 0}
			/>
		</div>
	)
}

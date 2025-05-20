import HeadPage from '@/shared/components/common/head-page'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function SalarySlip() {
	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<HeadPage
				title='Slip gaji'
				subtitle='Lihat dan ekspor slip gaji karyawan'
			/>
		</DefaultLayout>
	)
}

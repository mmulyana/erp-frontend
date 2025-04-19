import DetailLayout from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'

import FormNewEmployee from '@/features/hris/employee/components/form-new-employee'

export default function NewEmployee() {
	return (
		<DetailLayout title='Pegawai Baru' back={paths.hrisMasterDataEmployee}>
			<FormNewEmployee />
		</DetailLayout>
	)
}

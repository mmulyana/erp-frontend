import DetailLayout, { Link } from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'

import FormNewEmployee from '@/features/hris/employee/components/form-new-employee'
import { House } from 'lucide-react'
import { EmployeeForm } from '@/features/hris/employee/types'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateEmployee } from '@/features/hris/employee/api/use-create-employee'
import ProgressBar from '@/shared/components/common/progress-bar'
import { handleFormError } from '@/shared/utils/form'
import { delay } from '@/shared/utils'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.hris,
		hideName: true,
	},
	{
		name: 'Pegawai',
		path: paths.hrisMasterdataEmployee,
	},
	{
		name: 'Baru',
		path: paths.hrisMasterdataEmployeeCreate,
	},
]

export default function NewEmployee() {
	const defaultValues = {
		fullname: '',
		address: '',
		birthDate: undefined,
		joinedAt: undefined,
		lastEducation: '',
		overtimeSalary: undefined,
		phone: '',
		position: '',
		salary: undefined,
		photoUrl: undefined,
	}

	const { mutate } = useCreateEmployee()

	const form = useForm<EmployeeForm>({ defaultValues })
	const navigate = useNavigate()

	const onSubmit = (payload: EmployeeForm) => {
		mutate(payload, {
			onSuccess: () => {
				form.reset()
				delay(2000, () => navigate(paths.hrisMasterdataEmployee))
			},
			onError: handleFormError(form),
		})
	}

	return (
		<DetailLayout
			links={links}
			titleAction='Simpan'
			action={() => form.handleSubmit(onSubmit)()}
		>
			<ProgressBar />
			<FormNewEmployee form={form} onSubmit={onSubmit} />
		</DetailLayout>
	)
}

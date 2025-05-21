import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { House } from 'lucide-react'

import FormNewEmployee from '@/features/hris/employee/components/form-new-employee'
import { useCreateEmployee } from '@/features/hris/employee/api/use-create-employee'

import ProgressBar from '@/shared/components/common/progress-bar'
import DetailLayout from '@/shared/layout/detail-layout'
import { EmployeeForm } from '@/features/hris/employee/types'
import { handleFormError } from '@/shared/utils/form'
import { paths } from '@/shared/constants/paths'
import { delay } from '@/shared/utils'
import { Link } from '@/shared/types'

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

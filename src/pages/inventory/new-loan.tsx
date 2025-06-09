import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import FormCreateLoan from '@/features/inventory/loan/components/form-create-loan'
import { useCreateLoan } from '@/features/inventory/loan/api/use-create-loan'
import { loanForm } from '@/features/inventory/loan/types'

import DetailLayout from '@/shared/layout/detail-layout'
import { Button } from '@/shared/components/ui/button'
import { handleFormError } from '@/shared/utils/form'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'
import { House } from 'lucide-react'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Peminjaman',
		path: paths.inventoryStockLoan,
	},
	{
		name: 'Baru',
		path: paths.inventoryStockLoanNew,
	},
]

export default function NewLoan() {
	const { mutate, isPending } = useCreateLoan()
	const navigate = useNavigate()

	const defaultValues = {
		inventoryId: undefined,
		note: '',
		photoUrlIn: null,
		requestDate: undefined,
		requestQuantity: 0,
	}

	const form = useForm<loanForm>({
		defaultValues,
	})

	const submit = (payload: loanForm) => {
		mutate(payload, {
			onSuccess: () => {
				form.reset(defaultValues)
				navigate(paths.inventoryStockLoan, {
					replace: true,
				})
			},
			onError: handleFormError(form),
		})
	}

	return (
		<DetailLayout
			links={links}
			buttonAction={
				<Button onClick={() => form.handleSubmit(submit)()}>Simpan</Button>
			}
			style={{ header: 'w-[576px]' }}
		>
			<div className='space-y-6 max-w-xl mx-auto pt-6 pb-10'>
				<FormCreateLoan
					variant='form'
					form={form}
					onSubmit={submit}
					isPending={isPending}
				/>
			</div>
		</DetailLayout>
	)
}

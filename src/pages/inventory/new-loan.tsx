import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import FormCreateLoan from '@/features/inventory/loan/components/form-create-loan'
import { useCreateLoan } from '@/features/inventory/loan/api/use-create-loan'
import { loanForm } from '@/features/inventory/loan/types'

import DetailLayout from '@/shared/layout/detail-layout'
import { handleFormError } from '@/shared/utils/form'
import { paths } from '@/shared/constants/paths'
import { Button } from '@/shared/components/ui/button'

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
		console.log('payload', payload)
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
			links={[]}
			buttonAction={
				<Button onClick={() => form.handleSubmit(submit)()}>Simpan</Button>
			}
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

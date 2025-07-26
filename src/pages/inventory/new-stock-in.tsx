import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { House } from 'lucide-react'

import FormStockIn from '@/features/inventory/stock-in/components/form-stock-in'
import { useCreateStockIn } from '@/features/inventory/stock-in/api/use-create-stock-in'
import { StockInForm } from '@/features/inventory/stock-in/type'

import DetailLayout from '@/shared/layout/detail-layout'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Stock masuk',
		path: paths.inventoryStockIn,
	},
	{
		name: 'Baru',
		path: paths.inventoryStockInNew,
	},
]

export default function NewStockIn() {
	const navigate = useNavigate()

	const { mutate } = useCreateStockIn()

	const form = useForm<StockInForm>({
		defaultValues: {
			supplierId: undefined,
			items: [{ itemId: '', quantity: 0, unitPrice: 0 }],
		},
	})

	const onSuccess = () => navigate(paths.inventoryStockIn)

	const submit = (payload: StockInForm) => {
		mutate(
			{
				date: payload.date,
				items: payload.items,
				note: payload.note,
				photoUrl: payload.photoUrl,
				referenceNumber: payload.referenceNumber,
				supplierId: payload.supplierId,
			},
			{
				onSuccess: handleFormSuccess(onSuccess),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<DetailLayout
			links={links}
			style={{ header: 'w-[800px] max-w-full px-6 md:px-0' }}
			titleAction='Simpan'
			action={() => form.handleSubmit(submit)()}
		>
			<FormStockIn form={form} onSubmit={submit} />
		</DetailLayout>
	)
}

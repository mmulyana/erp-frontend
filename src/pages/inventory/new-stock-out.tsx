import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { House } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import DetailLayout from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

import FormCreateStockOut from '@/features/inventory/stock-out/components/form-create-stock-out'
import { useCreateStockOut } from '@/features/inventory/stock-out/api/use-create-stock-out'
import { StockOutForm } from '@/features/inventory/stock-out/types'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Stock keluar',
		path: paths.inventoryStockOut,
	},
	{
		name: 'Baru',
		path: paths.inventoryStockOutNew,
	},
]

export default function NewStockOut() {
	const navigate = useNavigate()

	const { mutate, isPending } = useCreateStockOut()

	const form = useForm<StockOutForm>({
		defaultValues: {
			items: [{ itemId: '', quantity: 0, price: 0 }],
		},
	})

	const handleSuccess = () => {
		navigate(paths.inventoryStockOut)
		form.reset()
	}

	const submit = (payload: StockOutForm) => {
		mutate(
			{
				date: payload.date,
				items: payload.items.map((i) => ({
					itemId: i.itemId,
					quantity: i.quantity,
					unitPrice: i.price,
				})),
				photoUrl: payload.photoUrl,
				note: payload.note,
				projectId: payload.projectId,
			},
			{
				onSuccess: handleFormSuccess(handleSuccess),
				onError: handleFormError<StockOutForm>(form),
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
			<FormCreateStockOut form={form} onSubmit={submit} isPending={isPending} />
		</DetailLayout>
	)
}

import { useItem } from '@/features/inventory/item/api/use-item'
import { useSupplier } from '@/features/inventory/supplier/api/use-supplier'
import ModalSupplier, {
	atomModalSupplier,
} from '@/features/inventory/supplier/components/modal-supplier'
import SupplierDetail from '@/features/inventory/supplier/components/supplier-detail'
import SupplierInfo from '@/features/inventory/supplier/components/supplier-info'
import SupplierTotal from '@/features/inventory/supplier/components/supplier-total'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import DetailLayout, { Link } from '@/shared/layout/detail-layout'
import { useSetAtom } from 'jotai'
import { House, Pencil } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Item',
		path: paths.inventoryMasterdataItem,
	},
	{
		name: 'Detail',
		path: paths.inventoryMasterdataItem,
	},
]

export default function DetailSupplier() {
	const { id } = useParams()
	const setModal = useSetAtom(atomModalSupplier)

	const { data } = useSupplier({ id })

	const linkMemo: Link[] = useMemo(() => {
		if (!id || !data?.data) return links

		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.name || id,
				path: paths.projectMasterdataProjectsDetail,
			},
		]
	}, [id, data])

	return (
		<DetailLayout
			links={linkMemo}
			titleAction='SRE'
			buttonAction={
				<Button
					variant='outline'
					className='gap-1'
					onClick={() => {
						if (id) {
							setModal({ id: id as string, open: true })
						}
					}}
				>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			}
		>
			<div className='grid grid-cols-1 md:grid-cols-[580px_1fr] gap-6 w-[800px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<SupplierInfo id={id} />
					<SupplierDetail id={id} />
				</div>
				<div className='space-y-6'>
					<SupplierTotal id={id} />
				</div>
			</div>
			<ModalSupplier />
		</DetailLayout>
	)
}

import { useItem } from '@/features/inventory/item/api/use-item'
import ItemDetail from '@/features/inventory/item/components/item-detail'
import ItemInfo from '@/features/inventory/item/components/item-info'
import ItemStock from '@/features/inventory/item/components/item-stock'
import ItemSupplier from '@/features/inventory/item/components/item-supplier'
import ItemTabs from '@/features/inventory/item/components/item-tabs'
import { paths } from '@/shared/constants/paths'
import DetailLayout, { Link } from '@/shared/layout/detail-layout'
import { House } from 'lucide-react'
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

export default function DetailItem() {
	const { id } = useParams()

	const { data, isPending } = useItem({ id })

	const linkMemo: Link[] = useMemo(() => {
		if (!id || isPending || !data?.data) return links
		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.name,
				path: `${paths.inventoryMasterdataItem}/${data.data.id}`,
			},
		]
	}, [id, data, isPending])

	return (
		<DetailLayout links={linkMemo} style={{ header: 'w-[1020px]' }}>
			<div className='grid grid-cols-1 md:grid-cols-[640px_1fr] gap-8 w-[1020px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<ItemInfo id={id} />
					<ItemDetail id={id} />
					<ItemTabs />
				</div>
				<div className='space-y-6'>
					<ItemStock />
					<ItemSupplier />
				</div>
			</div>
		</DetailLayout>
	)
}

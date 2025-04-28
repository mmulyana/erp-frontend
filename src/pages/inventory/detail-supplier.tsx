import { useItem } from '@/features/inventory/item/api/use-item'
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

export default function DetailSupplier() {
	const { id } = useParams()

	const { data } = useItem({ id })

	const linkMemo: Link[] = useMemo(() => {
		if (!id || data?.data) return links

		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.name || id,
				path: paths.projectMasterdataProjectsDetail,
			},
		]
	}, [id, data])

	return (
		<DetailLayout links={linkMemo}>
			<p>Supplier</p>
		</DetailLayout>
	)
}

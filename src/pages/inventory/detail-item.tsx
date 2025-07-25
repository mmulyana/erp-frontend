import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo } from 'react'

import { CommandSearch } from '@/features/command/components/command-search'
import { useItem } from '@/features/inventory/item/api/use-item'
import ItemSupplier from '@/features/inventory/item/components/item-supplier'
import ItemDetail from '@/features/inventory/item/components/item-detail'
import ItemStock from '@/features/inventory/item/components/item-stock'
import ItemInfo from '@/features/inventory/item/components/item-info'
import ItemTabs from '@/features/inventory/item/components/item-tabs'

import DetailLayout from '@/shared/layout/detail-layout'
import { useDynamicLinks } from '@/shared/utils/link'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

const baseLinks: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Barang',
		path: paths.inventoryMasterdataItem,
	},
	{
		name: 'Detail',
		path: paths.inventoryMasterdataItem,
	},
]

export default function DetailItem() {
	const { id } = useParams()
	const [query, setQuery] = useQueryState('scroll')

	const { data, isSuccess } = useItem({ id })

	const links = useMemo(() => {
		if (isSuccess && data?.data) {
			return baseLinks.map((item) => {
				const isMaterial = data.data.type === 'material'

				if (item.name === 'Barang') {
					return {
						...item,
						name: isMaterial ? 'Material' : 'Alat proyek',
						path: isMaterial
							? paths.inventoryMasterdataMaterial
							: paths.inventoryMasterdataItem,
					}
				}
				return item
			})
		}
		return baseLinks
	}, [data, isSuccess])
	useEffect(() => {
		if (query !== '') {
			window.scrollTo({ top: 0, behavior: 'smooth' })
			setQuery(null)
		}
	}, [])

	return (
		<DetailLayout
			links={links}
			style={{ header: 'w-[1020px]' }}
			buttonAction={<CommandSearch />}
		>
			<div className='grid grid-cols-1 xl:grid-cols-[640px_1fr] gap-8 w-[1020px] max-w-full px-4 xl:px-0 mx-auto pt-6 pb-10'>
				<div className='space-y-6'>
					<ItemInfo id={id} />
					<ItemDetail id={id} />
					<ItemTabs id={id} />
				</div>
				<div className='space-y-6'>
					<ItemStock id={id} />
					<ItemSupplier id={id} />
				</div>
			</div>
		</DetailLayout>
	)
}

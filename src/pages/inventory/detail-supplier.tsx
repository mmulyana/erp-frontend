import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'

import SupplierTransaction from '@/features/inventory/supplier/components/supplier-transaction'
import SupplierDetail from '@/features/inventory/supplier/components/supplier-detail'
import SupplierInfo from '@/features/inventory/supplier/components/supplier-info'
import { useSupplier } from '@/features/inventory/supplier/api/use-supplier'
import { CommandSearch } from '@/features/command/components/command-search'

import DetailLayout from '@/shared/layout/detail-layout'
import { useDynamicLinks } from '@/shared/utils/link'
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
		name: 'Supplier',
		path: paths.inventoryMasterdataSupplier,
	},
	{
		name: 'Detail',
		path: paths.inventoryMasterdataSupplier,
	},
]

export default function DetailSupplier() {
	const { id } = useParams()

	const { data } = useSupplier({ id })

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.inventoryMasterdataSupplier}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	return (
		<DetailLayout
			links={dynamicLink}
			style={{
				header: 'w-[600px]',
			}}
			buttonAction={<CommandSearch />}
		>
			<div className='space-y-6 w-[600px] max-w-full px-4 md:px-0 mx-auto py-6'>
				<SupplierInfo id={id} />
				<SupplierDetail id={id} />
				<SupplierTransaction id={id} />
			</div>
		</DetailLayout>
	)
}

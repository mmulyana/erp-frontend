import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'

import LoanEvidence from '@/features/inventory/loan/components/loan-evidence'
import LoanInfo from '@/features/inventory/loan/components/loan-info'
import { useLoan } from '@/features/inventory/loan/api/use-loan'

import DetailLayout from '@/shared/layout/detail-layout'
import { Button } from '@/shared/components/ui/button'
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
		name: 'Peminjaman',
		path: paths.inventoryStockLoan,
	},
	{
		name: 'Detail',
		path: paths.inventoryStockLoan,
	},
]
export default function LoanDetail() {
	const { id } = useParams()
	const { data } = useLoan({ id })

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: id?.slice(0, 8) + '...',
					path: `${paths.inventoryStockLoan}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})
	return (
		<DetailLayout
			links={dynamicLink}
			style={{ header: 'w-[600px]' }}
			buttonAction={
				<Button
					variant='secondary'
					className='text-ink-primary px-3 bg-amber-400 hover:bg-amber-500'
				>
					Kembalikan
				</Button>
			}
		>
			<div className='space-y-8 w-[600px] max-w-full px-4 xl:px-0 mx-auto pt-6 pb-10'>
				<LoanInfo id={id} />
				<LoanEvidence id={id} />
			</div>
		</DetailLayout>
	)
}

import PieLoan from '@/features/inventory/loan/components/pie-loan'

import { DefaultLayout } from '@/shared/layout/default-layout'
import HeadPage from '@/shared/components/common/head-page'
import { paths } from '@/shared/constants/paths'

export default function Loan() {
	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<div className='h-fit w-[320px] max-w-full'>
				<PieLoan />
			</div>
			<HeadPage
				title='Peminjaman'
				subtitle='Kelola data peminjaman barang'
				url={paths.inventoryStockLoanNew}
			/>
		</DefaultLayout>
	)
}

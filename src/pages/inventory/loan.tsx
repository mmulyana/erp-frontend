import TableLoan from '@/features/inventory/loan/components/table-loan'
import PieLoan from '@/features/inventory/loan/components/pie-loan'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { paths } from '@/shared/constants/paths'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

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
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex gap-2 items-center'>
					<SearchV3 />
				</div>
				<TableLoan />
			</div>
		</DefaultLayout>
	)
}

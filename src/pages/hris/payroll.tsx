import ModalAddPayroll from '@/features/hris/payroll/components/modal-add-payroll'
import PayrollTotal from '@/features/hris/payroll/components/payroll-total'
import TablePayroll from '@/features/hris/payroll/components/table-payroll'

import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'
import CreateSelect from '@/shared/components/common/select/created-select'
import BaseSelect from '@/shared/components/common/select/base-select'

export default function Payroll() {
	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<PayrollTotal />
			<HeadPage
				title='Periode'
				subtitle='Kelola periode gaji di perusahaan'
				action={<ModalAddPayroll />}
			/>
			<div className='p-6 rounded-xl border-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton>
							<BaseSelect
								label='Status'
								options={[
									{
										label: 'Selesai',
										value: 'done',
									},
									{
										label: 'Sedang diproses',
										value: 'processing',
									},
								]}
								urlName='status'
							/>
						</FilterButton>
						<SortButton>
							<CreateSelect
								options={[
									{
										label: 'Tanggal Mulai (Terbaru)',
										value: 'startDate:asc',
									},
									{
										label: 'Tanggal Mulai (Terlama)',
										value: 'startDate:desc',
									},
									{
										label: 'Tanggal Berakhir (Terbaru)',
										value: 'endDate:asc',
									},
									{
										label: 'Tanggal Berakhir (Terlama)',
										value: 'endDate:desc',
									},
								]}
							/>
						</SortButton>
					</div>
				</div>
				<TablePayroll />
			</div>
		</DefaultLayout>
	)
}

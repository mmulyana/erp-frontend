import { parseAsString, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import PayrollPeriodCombobox from '@/features/hris/payroll/components/payroll-period-combobox'
import SalarySlipTable from '@/features/hris/payroll/components/salary-slip-table'

import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterReset from '@/shared/components/common/filter-reset'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { selectOption } from '@/shared/types'

const createdOptions: selectOption[] = [
	{
		label: 'Tanggal Selesai (Terbaru)',
		value: 'doneAt:asc',
	},
	{
		label: 'Tanggal Selesai (Terlama)',
		value: 'doneAt:desc',
	},
]
export default function SalarySlip() {
	const [query, setQuery] = useQueryStates({
		q: parseAsString,
		page: parseAsString,
		limit: parseAsString,
		sort: parseAsString,
		periodId: parseAsString,
	})

	const hasQueryValue = useMemo(() => {
		return Object.values(query).some(
			(val) => val !== '' && val !== undefined && val !== null
		)
	}, [query])

	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<HeadPage
				title='Slip gaji'
				subtitle='Lihat dan ekspor slip gaji karyawan'
				hideAction
			/>
			<div className='p-6 rounded-xl border border-border bg-white space-y-6'>
				<div className='flex justify-start md:justify-between gap-4 items-center flex-wrap'>
					<SearchV3 />
					<FilterReset
						show={hasQueryValue}
						onClick={() =>
							setQuery({
								periodId: null,
								limit: null,
								q: '',
								page: null,
								sort: null,
							})
						}
					/>
					<PayrollPeriodCombobox />
					<SortButton>
						<CreatedSelect options={createdOptions} />
					</SortButton>
				</div>
				<SalarySlipTable />
			</div>
		</DefaultLayout>
	)
}

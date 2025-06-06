import { parseAsString, useQueryStates } from 'nuqs'
import { Check } from 'lucide-react'

import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { usePayrollPeriodInfinite } from '../api/use-payroll-period-infinite'

export default function PayrollPeriodCombobox() {
	const [query, setQuery] = useQueryStates({
		periodId: parseAsString.withDefault(''),
	})

	return (
		<div className='ml-0 md:ml-auto'>
			<InfiniteCombobox
				onSelect={(val) => setQuery((prev) => ({ ...prev, periodId: val }))}
				defaultValue={query.periodId}
				useInfiniteQuery={({ search }) =>
					usePayrollPeriodInfinite({ search, limit: '10' })
				}
				fetchItemById={fetchItemById}
				label={(item) => item.name}
				placeholder='Pilih Periode'
				renderItem={(item, isSelected) => (
					<div className='flex gap-2 justify-between w-full items-center'>
						<p>{item.name}</p>
						{isSelected && <Check className='h-4 w-4' />}
					</div>
				)}
				style={{ value: 'min-w-[120px] h-8 bg-white' }}
			/>
		</div>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.payrollPeriod}/${id}`)
	return data?.data ?? null
}

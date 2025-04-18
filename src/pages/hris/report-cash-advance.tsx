import { parseAsInteger, useQueryStates } from 'nuqs'

import TopEmployeeCashAdvance from '@/features/hris/cash-advance/components/top-employee-cash-advance'
import TrenCashAdvances from '@/features/hris/cash-advance/components/tren-cash-advance'

import CardHighlight from '@/shared/components/common/card-highlight'
import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { formatToRupiah } from '@/shared/utils/formatCurrency'
import { useDateIndex } from '@/shared/hooks/use-date-index'
import { HrisLayout } from '@/shared/layout/hris-layout'
import { useTotalInYear } from '@/features/hris/cash-advance/api/use-total-in-year'
import { useTotalInMonth } from '@/features/hris/cash-advance/api/use-total-in-month'
import { useTotalInDay } from '@/features/hris/cash-advance/api/use-total-in-day'
import { useReportLastSixMonths } from '@/features/hris/cash-advance/api/use-report-last-six-months'

export default function ReportCashAdvance() {
	const { month } = useCurrentDate()

	const [query] = useQueryStates({
		date: parseAsInteger.withDefault(0),
		month: parseAsInteger.withDefault(month),
	})

	const { resultDate } = useDateIndex({
		indexDate: query.date > 0 ? query.date : new Date().getDate(),
		indexMonth: query.month,
	})

	const { data: dataYear } = useTotalInYear({
		startDate: resultDate.toString(),
	})

	const { data: dataMonth } = useTotalInMonth({
		startDate: resultDate.toString(),
	})

	const { data: dataDay } = useTotalInDay({
		startDate: resultDate.toString(),
	})

	const { data: dataReport } = useReportLastSixMonths({
		startDate: resultDate.toString(),
	})

	return (
		<HrisLayout>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<CardHighlight
					title='Total Nominal Per tahun'
					value={formatToRupiah(dataYear?.data?.total || 0)}
					footer={{
						percent: dataYear?.data?.lastYear || 0,
						text:
							(dataYear?.data?.lastYear || 0) > 0
								? 'Lebih banyak dari tahun kemarin'
								: 'Lebih sedikit dari tahun kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<CardHighlight
					title='Total Nominal Per bulan'
					value={formatToRupiah(dataMonth?.data?.total || 0)}
					footer={{
						percent: dataMonth?.data?.lastMonth || 0,
						text:
							(dataMonth?.data?.lastMonth || 0) > 0
								? 'Lebih banyak dari bulan kemarin'
								: 'Lebih sedikit dari bulan kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<CardHighlight
					title='Total Nominal hari ini'
					value={formatToRupiah(dataDay?.data?.total || 0)}
					footer={{
						percent: dataDay?.data?.lastDay || 0,
						text:
							(dataDay?.data?.lastDay || 0) > 0
								? 'Lebih banyak dari hari kemarin'
								: 'Lebih sedikit dari hari kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<TrenCashAdvances />
				<CardHighlight
					title='Rata-rata per bulan'
					value={formatToRupiah(dataReport?.data?.mean || 0)}
					style={{
						value: 'text-2xl pt-0',
						content: 'pt-2',
					}}
				/>
				<TopEmployeeCashAdvance />
			</div>
		</HrisLayout>
	)
}

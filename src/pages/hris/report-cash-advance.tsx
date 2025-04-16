import TopEmployeeCashAdvance from '@/features/hris/cash-advance/components/top-employee-cash-advance'
import TrenCashAdvances from '@/features/hris/cash-advance/components/tren-cash-advance'
import CardHighlight from '@/shared/components/card-highlight'
import { HrisLayout } from '@/shared/layout/hris-layout'
import { formatToRupiah } from '@/shared/utils/formatCurrency'

export default function ReportCashAdvance() {
	return (
		<HrisLayout>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<CardHighlight
					title='Total Nominal Per tahun'
					value={formatToRupiah(1200000)}
					footer={{
						percent: 4,
						text: 'Lebih banyak dari tahun kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<CardHighlight
					title='Total Nominal Per bulan'
					value={formatToRupiah(120000)}
					footer={{
						percent: 4,
						text: 'Lebih banyak dari bulan kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<CardHighlight
					title='Total Nominal hari ini'
					value={formatToRupiah(200000)}
					footer={{
						percent: 4,
						text: 'Lebih banyak dari hari kemarin',
					}}
					style={{
						value: 'text-2xl lg:text-3xl',
					}}
				/>
				<TrenCashAdvances />
				<CardHighlight
					title='Rata-rata per bulan'
					value={formatToRupiah(120000)}
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

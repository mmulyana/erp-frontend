import type { Step } from 'react-joyride'

import { testIds } from '@/shared/constants/testId'

import Img from '/public/images/cash-advance.png'

export const steps: Step[] = [
	{
		title: 'Kasbon',
		content: 'Kelola data kasbon disini',
		target: 'body',
		placement: 'center',
	},
	{
		title: 'Tambahkan data lembur',
		content: 'Tekan tombol disini, untuk menambahkan data baru',
		target: '#' + testIds.buttonAddCashAdvance,
		placement: 'bottom',
	},
	{
		title: 'Pilih Rentang Tanggal dengan Mudah',
		content:
			'Tentukan tanggal awal dan akhir untuk menemukan data yang Anda butuhkan.',
		target: '#' + testIds.filterDateCashAdvance,
		placement: 'bottom',
	},
	{
		content: 'Tekan tanggal awal disini',
		target: '#' + testIds.filterDateStart,
		placement: 'bottom',
	},
	{
		content: 'Tekan tanggal akhir disini',
		target: '#' + testIds.filterDateEnd,
		placement: 'bottom',
	},
	{
		title: 'Kelola data',
		content: (
			<div>
				<img src={Img} className='w-full h-auto' />
				<p className='mt-2'>Tekan disini untuk edit dan hapus data</p>
			</div>
		),
		target: 'body',
		placement: 'center',
	},
]

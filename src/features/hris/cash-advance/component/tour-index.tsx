import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

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
    target: '#' + TEST_ID.BUTTON_ADD_CASH_ADVANCE,
    placement: 'bottom',
  },
  {
    title: 'Pilih Rentang Tanggal dengan Mudah',
    content:
      'Tentukan tanggal awal dan akhir untuk menemukan data yang Anda butuhkan.',
    target: '#' + TEST_ID.FILTER_DATE_CASH_ADVANCE,
    placement: 'bottom',
  },
  {
    content: 'Tekan tanggal awal disini',
    target: '#' + TEST_ID.FILTER_DATE_START,
    placement: 'bottom',
  },
  {
    content: 'Tekan tanggal akhir disini',
    target: '#' + TEST_ID.FILTER_DATE_END,
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
  {
    title: 'Total Kasbon',
    content: 'Ketahui jumlah kasbon bulan ini',
    target: '#' + TEST_ID.TOTAL_CASH_ADVANCE,
    placement: 'bottom',
  },
  {
    title: 'Perbandingan Kasbon Bulanan',
    content:
      'Pantau jumlah kasbon dari bulan ke bulan untuk analisis yang lebih mendalam.',
    target: '#' + TEST_ID.REPORT_CASH_ADVANCE,
    placement: 'auto',
  },
]

import { TEST_ID } from '@/utils/constant/_testId'
import type { Step } from 'react-joyride'

export const steps: Step[] = [
  {
    title: 'Absensi',
    content: 'Kelola absensi reguler dan lembur',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Navigasi Tanggal dengan cepat',
    content: 'Tekan tombol panah untuk melihat hari sebelumnya atau berikutnya',
    target: '#' + TEST_ID.BUTTON_NAVIGATION_DATE,
    placement: 'bottom-start',
  },
  {
    content: 'Tekan tombol ini untuk ke tanggal sebelumnya dan seterusnya',
    target: '#' + TEST_ID.BUTTON_PREV_DATE,
    placement: 'bottom-start',
  },
  {
    content: 'Tekan tombol ini untuk ke tanggal berikutnya',
    target: '#' + TEST_ID.BUTTON_NEXT_DATE,
    placement: 'bottom-start',
  },
  {
    title: 'Pindah tanggal dengan cepat',
    content: 'Temukan data yang Anda butuhkan dengan cepat',
    target: '#' + TEST_ID.FILTER_DATE_ATTENDANCE,
    placement: 'bottom',
  },
  {
    title: 'Tampilan data',
    content: 'Ganti tampilan data absensi grid dan tabel sesuai kebutuhan',
    target: '#' + TEST_ID.TOGGLE_ATTENDANCE,
    placement: 'bottom',
  },
  {
    content: 'Tekan ini untuk tampilan grid atau yg sekarang dilihat',
    target: '#' + TEST_ID.TOGGLE_GRID_ATTENDANCE,
    placement: 'bottom',
  },
  {
    content: 'Tekan ini untuk tampilan dalam bentuk tabel',
    target: '#' + TEST_ID.TOGGLE_TABLE_ATTENDANCE,
    placement: 'bottom',
  },
]

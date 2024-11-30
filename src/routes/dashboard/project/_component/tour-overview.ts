import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const steps: Step[] = [
  {
    title: 'Dashboard Proyek',
    content:
      'Kelola proyek Anda dengan mudah. Lihat total proyek, status, klien/user, dan akses lampiran penting dalam satu tempat.',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Pantau proyek aktif',
    content: 'Lihat jumlah proyek yang aktif saat ini',
    target: '#' + TEST_ID.TOTAL_PROJECT_ACTIVE,
    placement: 'auto',
  },
  {
    title: 'Pantau proyek selesai',
    content: 'Lihat jumlah proyek yang sudah diselesaikan',
    target: '#' + TEST_ID.TOTAL_PROJECT_DONE,
    placement: 'auto',
  },
  {
    content: 'Lihat total klien',
    target: '#' + TEST_ID.TOTAL_CLIENT,
    placement: 'auto',
  },
  {
    content: 'Identifikasi klien dengan proyek terbanyak',
    target: '#' + TEST_ID.TOP_CLIENT,
    placement: 'auto',
  },
  {
    content: 'Analisis proyek berdasarkan statusnya.',
    target: '#' + TEST_ID.PROJECT_BY_STATUS,
    placement: 'auto',
  },
  {
    title: 'Lampiran proyek',
    content: 'Akses semua dokumen dalam satu tempat',
    target: '#' + TEST_ID.PROJECT_ATTACHMENTS,
    placement: 'auto',
  },
  {
    content: 'Lihat daftar tabel proyek aktif',
    target: '#' + TEST_ID.TAB_PROJECT_ACTIVE,
    placement: 'auto',
  },
  {
    content: 'Lihat daftar tabel proyek yang sudah diarsipkan',
    target: '#' + TEST_ID.TAB_PROJECT_ARCHIVE,
    placement: 'auto',
  },
  {
    title: 'Label',
    content: 'Tekan tombol ini untuk membuka pengaturan untuk label',
    target: '#' + TEST_ID.BUTTON_OPEN_LABEL,
    placement: 'auto',
  },
  {
    title: 'Buat proyek baru',
    content: 'Tekan tombol ini untuk membuat proyek baru',
    target: '#' + TEST_ID.BUTTON_ADD_PROJECT_OVERVIEW,
    placement: 'auto',
  },
]

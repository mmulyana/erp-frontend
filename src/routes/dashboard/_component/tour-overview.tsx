import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const steps: Step[] = [
  {
    title: 'Selamat Datang di Dashboard',
    content: 'Pantau semua informasi dalam satu tempat',
    target: 'body',
    placement: 'center',
  },
  {
    content: 'Total pegawai aktif saat ini',
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_EMPLOYEE_OVERVIEW,
  },
  {
    content: 'Total proyek aktif saat ini',
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_PROJECT_OVERVIEW,
  },
  {
    content: 'Daftar proyek aktif',
    placementBeacon: 'top',
    target: '#' + TEST_ID.PROJECT_LIST_OVERVIEW,
  },
  {
    title: 'Pantau Sertifikasi Pegawai',
    content:
      'Sistem akan memberitahu sebulan sebelum sertifikasi akan kadaluwarsa',
    placement: 'bottom',
    target: '#' + TEST_ID.CARD_CERTIF_LIST,
  },
  {
    title: 'Pantau Safety Induction Pegawai',
    content:
      'Sistem akan memberitahu sebulan sebelum safety induction akan kadaluwarsa',
    placement: 'top',
    target: '#' + TEST_ID.CARD_SAFETY_LIST,
  },
]

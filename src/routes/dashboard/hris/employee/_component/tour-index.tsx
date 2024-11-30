import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const steps: Step[] = [
  {
    title: 'Jabatan',
    content: 'Kelola jabatan di dalam perusahaan',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Tambah jabatan',
    content: 'Buat jabatan baru untuk mendukung struktur perusahaan',
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_ADD_POSITION,
  },
  {
    title: 'Cari jabatan',
    content: 'Cari jabatan berdasarkan nama',
    placement: 'bottom',
    target: '#' + TEST_ID.SEARCH,
  },
  {
    title: 'Lihat pegawai',
    content: 'Lihat semua daftar pegawai dengan dengan menekan disini',
    placement: 'bottom',
    target: '#' + TEST_ID.DETAIL_POSITION + '-1',
  },
  {
    title: 'Kelola Jabatan',
    content: 'Pilih tindakan untuk mengubah atau menghapus jabatan.',
    placement: 'bottom',
    target: '#' + TEST_ID.DROPDOWN_EDIT_POSITION + '-1',
  },
  {
    title: 'Total Pegawai per Jabatan',
    content: 'Visualisasi jumlah pegawai di setiap jabatan.',
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_EMPLOYEE_POSITION,
  },
  {
    title: 'Status Pegawai',
    content: 'Lihat distribusi pegawai aktif dan nonaktif.',
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_STATUS_EMPLOYEE_POSITION,
  },
]

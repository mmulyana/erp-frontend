import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/constants/_testId'

export const steps: Step[] = [
  {
    title: 'Manajemen Supplier',
    content: 'Kelola data supplier Anda dengan mudah disini',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Tambah label',
    content: 'Tekan tombol disini untuk membuka pengaturan label',
    target: '#' + TEST_ID.BUTTON_OPEN_SUPPLIER_LABEL_SETTING,
    placement: 'auto',
  },
  {
    title: 'Tambah Supplier',
    content: 'Klik tombol ini untuk menambahkan supplier baru',
    target: '#' + TEST_ID.BUTTON_ADD_SUPPLIER,
    placement: 'auto',
  },
  {
    content: 'Cari supplier berdasarkan nama atau informasi lainnya',
    target: '#' + TEST_ID.SEARCH,
    placement: 'auto',
  },
]

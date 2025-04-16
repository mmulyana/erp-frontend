import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/constants/testId'

export const steps: Step[] = [
  {
    title: 'Kelola Stok Barang',
    content:
      'Sederhanakan pengelolaan stok Anda dengan fitur barang masuk, keluar, opname, dan pinjam.',
    target: 'body',
    placement: 'center',
  },
  {
    content: 'Cari barang disini',
    target: '#' + TEST_ID.SEARCH,
    placement: 'auto',
  },
  {
    title: 'Tambah data',
    content: 'Tekan tombol disini untuk menambahkan data',
    target: '#' + TEST_ID.BUTTON_ADD,
    placement: 'auto',
  },
]

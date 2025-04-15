import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/constants/_testId'

export const steps: Step[] = [
  {
    title: 'Manajemen Inventory',
    content:
      'Cek ketersediaan stok barang, kelola data barang, dan optimalkan pengelolaan inventori untuk mendukung kebutuhan',
    target: 'body',
    placement: 'center',
  },
  {
    content: 'Pantau stok yg dipinjam dan belum dikembalikan',
    target: '#' + TEST_ID.CARD_STOCK_BORROWED,
    placement: 'auto',
  },
  {
    content: 'Pantau stock hampir habis',
    target: '#' + TEST_ID.CARD_STOCK_LOW,
    placement: 'auto',
  },
  {
    content: 'Pantau stock yang sudah habis',
    target: '#' + TEST_ID.CARD_STOCK_OUT,
    placement: 'auto',
  },
  {
    content: 'Cari stock berdasar nama',
    target: '#' + TEST_ID.SEARCH,
    placement: 'auto',
  },
  {
    content: 'Tekan tombol disini untuk buka pengaturan inventory',
    target: '#' + TEST_ID.BUTTON_OPEN_INVENTORY_SETTING,
    placement: 'auto',
  },
  {
    title: 'Tambah stock',
    content: 'Tekan tombol disini untuk tambah data baru',
    target: '#' + TEST_ID.BUTTON_ADD_GOODS,
    placement: 'auto',
  },
]

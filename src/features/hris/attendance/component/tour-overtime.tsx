import { TEST_ID } from '@/shared/utils/constant/_testId'

import type { Step } from 'react-joyride'

export const steps: Step[] = [
  {
    title: 'Lembur',
    content: 'Kelola data lemburan pegawai disini',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Tambahkan data lembur',
    content: 'Tekan tombol disini, untuk menambahkan data baru',
    target: '#' + TEST_ID.BUTTON_ADD_OVERTIME,
    placement: 'left',
  },
]

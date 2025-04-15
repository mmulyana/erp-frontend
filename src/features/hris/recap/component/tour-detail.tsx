import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/utils/constant/_testId'

export const steps: Step[] = [
  {
    title: 'Detail Rekapan',
    content:
      'Tinjau data lengkap dari absensi, lemburan, dan kasbon dalam satu tempat',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Simpan data rekapan',
    content: 'Tekan tombol ini menyimpan data dalam bentuk excel',
    target: '#' + TEST_ID.BUTTON_EXPORT_RECAP,
    placement: 'auto',
  },
]

import { TEST_ID } from '@/shared/utils/constant/_testId'

import Img from '/public/images/attendance.png'

import type { Step } from 'react-joyride'

export const steps: Step[] = [
  {
    title: 'Tampilan Table',
    content: (
      <div>
        <img src={Img} className='w-full h-auto' />
        <p className='mt-2'>
          Tekan disini untuk menambahkan data absensi pegawai
        </p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Pindah tanggal dengan cepat',
    content: 'Temukan data yang Anda butuhkan dengan cepat',
    target: '#' + TEST_ID.SELECT_DATE_ATTENDANCE,
    placement: 'bottom',
  },
]

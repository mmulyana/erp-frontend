import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/constants/_testId'

import Img from '/public/images/kanban.png'

export const steps: Step[] = [
  {
    title: 'Kelola proyek',
    content: 'Anda dapat memonitor setiap tahap proyek secara real-time.',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Perbarui status proyek dengan cepat',
    content: (
      <div>
        <img src={Img} className='w-full h-auto' />
        <p className='mt-2'>
          Tekan lalu Seret dan lepas proyek untuk memperbarui status dengan
          cepat
        </p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Label',
    content: 'Tekan tombol ini untuk membuka pengaturan label',
    target: '#' + TEST_ID.BUTTON_OPEN_LABEL,
    placement: 'auto',
  },
  {
    title: 'Buat proyek baru',
    content: 'Tekan tombol ini untuk membuat proyek baru',
    target: '#' + TEST_ID.BUTTON_ADD_PROJECT_MANAGE,
    placement: 'auto',
  },
]

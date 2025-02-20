import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

import Img from '/public/images/recap.png'

export const steps: Step[] = [
  {
    title: 'Rekapan',
    content: 'Kelola data rekapan',
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Tambah data periode',
    content: 'Tekan tombol ini untuk menambah data periode',
    target: '#' + TEST_ID.BUTTON_ADD_RECAP,
    placement: 'auto',
  },
  {
    title: 'Pencarian',
    content: 'Masukan nama periode disini',
    target: '#' + TEST_ID.SEARCH,
    placement: 'auto',
  },
  {
    title: 'Kelola',
    content: (
      <div>
        <img src={Img} className='w-full h-auto' />
        <p className='mt-2'>Tekan disini untuk edit dan hapus periode</p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
]

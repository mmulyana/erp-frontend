import type { Step } from 'react-joyride'

import { TEST_ID } from '@/shared/constants/_testId'

import Img from '/public/images/client.png'

export const steps: Step[] = [
  {
    title: 'Manajemen Klien',
    content:
      'Cari, tambahkan klien baru, dan kelola data klien serta perusahaan dengan mudah',
    target: 'body',
    placement: 'center',
  },
  {
    content: 'Tekan disini untuk lihat daftar klien',
    target: '#' + TEST_ID.TAB_CLIENT,
    placement: 'auto',
  },
  {
    content: 'Tekan disini untuk lihat daftar perusahaan',
    target: '#' + TEST_ID.TAB_COMPANY,
    placement: 'auto',
  },
  {
    content: 'Cari nama klien/perusahaan disini',
    target: '#' + TEST_ID.SEARCH,
    placement: 'auto',
  },
  {
    title: 'Tambah data',
    content: 'Tekan tombol disini untuk menambahkan data',
    target: '#' + TEST_ID.BUTTON_ADD,
    placement: 'auto',
  },
  {
    title: 'Edit/Hapus',
    content: (
      <div>
        <img src={Img} className='w-full h-auto' />
        <p className='mt-2'>
          Tekan tombol disini untuk mengedit dan menghapus data
        </p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
]

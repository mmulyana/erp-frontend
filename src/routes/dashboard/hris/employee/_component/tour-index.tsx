import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const steps: Step[] = [
  {
    content: (
      <div className='text-center'>
        <p className='font-medium text-dark text-xl'>Jabatan</p>
        <p className='text-dark/50'>Kelola jabatan di dalam perusahaan</p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
  {
    content: (
      <>
        <p className='font-medium'>Tambah jabatan</p>
        <p className='text-dark/50'>
          Buat jabatan baru untuk mendukung struktur perusahaan.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_ADD_POSITION,
  },
  {
    content: (
      <>
        <p className='font-medium'>Cari jabatan</p>
        <p className='text-dark/50'>Cari jabatan berdasarkan nama</p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.SEARCH,
  },
  {
    content: (
      <>
        <p className='font-medium'>Lihat pegawai</p>
        <p className='text-dark/50'>
          Lihat semua daftar pegawai dengan dengan menekan disini
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.DETAIL_POSITION + '-1',
  },
  {
    content: (
      <>
        <p className='font-medium'>Kelola Jabatan</p>
        <p className='text-dark/50'>
          Pilih tindakan untuk mengubah atau menghapus jabatan.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.DROPDOWN_EDIT_POSITION + '-1',
  },
  {
    content: (
      <>
        <p className='font-medium'>Total Pegawai per Jabatan</p>
        <p className='text-dark/50'>
          Visualisasi jumlah pegawai di setiap jabatan.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_EMPLOYEE_POSITION,
  },
  {
    content: (
      <>
        <p className='font-medium'>Status Pegawai</p>
        <p className='text-dark/50'>
          Lihat distribusi pegawai aktif dan nonaktif.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_STATUS_EMPLOYEE_POSITION,
  },
]

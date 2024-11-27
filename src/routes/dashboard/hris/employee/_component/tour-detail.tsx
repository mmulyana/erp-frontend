import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const generateStep = (name: string): Step[] => [
  {
    content: (
      <div className='text-center'>
        <p className='font-medium text-dark text-xl'>Daftar pegawai</p>
        <p className='text-dark/50'>
          Kelola semua pegawai dengan jabatan {name}
        </p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
  {
    content: (
      <>
        <p className='font-medium'>Tambah Pegawai</p>
        <p className='text-dark/50'>Buat pegawai dengan menekan tombol ini</p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_ADD_EMPLOYEE,
  },
  {
    content: (
      <>
        <p className='font-medium'>Tambah Kompetensi</p>
        <p className='text-dark/50'>
          Daftarkan keahlian teknis dan keterampilan yang dimiliki pegawai anda
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_OPEN_COMPETENCY,
  },
  {
    content: (
      <>
        <p className='font-medium'>Cari Pegawai</p>
        <p className='text-dark/50'>Lakukan pencarian berdasarkan nama</p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.SEARCH,
  },
  {
    content: (
      <>
        <p className='font-medium'>Lihat Profil Pegawai</p>
        <p className='text-dark/50'>
          Lihat detail lengkap informasi dan kompetensi pegawai ini
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.DETAIL_EMPLOYEE + '-1',
  },
  {
    content: (
      <>
        <p className='font-medium'>Kelola Pegawai</p>
        <p className='text-dark/50'>
          Pilih tindakan untuk aktifkan/menonaktifkan dan menghapus pegawai
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.DROPDOWN_EDIT_EMPLOYEE + '-1',
  },
  {
    content: (
      <>
        <p className='font-medium'>Pantau Sertifikasi Pegawai</p>
        <p className='text-dark/60'>
          Sistem akan memberitahu sebulan sebelum sertifikasi bakal kadaluwarsa
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.CARD_CERTIF_LIST,
  },
  {
    content: (
      <>
        <p className='font-medium'>Pantau Safety Induction Pegawai</p>
        <p className='text-dark/60'>
          Sistem akan memberitahu sebulan sebelum 'safety induction' bakal
          kadaluwarsa
        </p>
      </>
    ),
    placement: 'top',
    target: '#' + TEST_ID.CARD_SAFETY_LIST,
  },
]

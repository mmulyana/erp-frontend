import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

export const generateStep = (name: string): Step[] => [
  {
    title: 'Daftar pegawai',
    content: `Kelola semua pegawai dengan jabatan ${name}`,
    target: 'body',
    placement: 'center',
  },
  {
    title: 'Tambah Pegawai',
    content: 'Buat pegawai dengan menekan tombol ini',
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_ADD_EMPLOYEE,
  },
  {
    title: 'Tambah Kompetensi',
    content:
      'Daftarkan keahlian teknis dan keterampilan yang dimiliki pegawai anda',
    placement: 'bottom',
    target: '#' + TEST_ID.BUTTON_OPEN_COMPETENCY,
  },
  {
    title: 'Cari Pegawai',
    content: 'Lakukan pencarian berdasarkan nama',
    placement: 'bottom',
    target: '#' + TEST_ID.SEARCH,
  },
  {
    title: 'Lihat Profil Pegawai',
    content: 'Lihat detail lengkap informasi dan kompetensi pegawai ini',
    placement: 'bottom',
    target: '#' + TEST_ID.DETAIL_EMPLOYEE + '-1',
  },
  {
    title: 'Kelola Pegawai',
    content: 'Pilih tindakan untuk menghapus pegawai',
    placement: 'bottom',
    target: '#' + TEST_ID.DROPDOWN_EDIT_EMPLOYEE + '-1',
  },
  {
    title: 'Pantau Sertifikasi Pegawai',
    content:
      'Sistem akan memberitahu sebulan sebelum sertifikasi akan kadaluwarsa',
    placement: 'bottom',
    target: '#' + TEST_ID.CARD_CERTIF_LIST,
  },
  {
    title: 'Pantau Safety Induction Pegawai',
    content:
      'Sistem akan memberitahu sebulan sebelum safety induction akan kadaluwarsa',
    placement: 'top',
    target: '#' + TEST_ID.CARD_SAFETY_LIST,
  },
]

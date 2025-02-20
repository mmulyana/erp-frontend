import type { Step } from 'react-joyride'

import { testIds } from '@/utils/constant/_testId'

export const tourDetail = (name: string): Step[] => [
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
		target: '#' + testIds.buttonAddEmployee,
	},
	{
		title: 'Tambah Kompetensi',
		content:
			'Daftarkan keahlian teknis dan keterampilan yang dimiliki pegawai anda',
		placement: 'bottom',
		target: '#' + testIds.buttonOpenCompetency,
	},
	{
		title: 'Cari Pegawai',
		content: 'Lakukan pencarian berdasarkan nama',
		placement: 'bottom',
		target: '#' + testIds.search,
	},
	{
		title: 'Lihat Profil Pegawai',
		content: 'Lihat detail lengkap informasi dan kompetensi pegawai ini',
		placement: 'bottom',
		target: '#' + testIds.detailEmployee + '-1',
	},
	{
		title: 'Kelola Pegawai',
		content: 'Pilih tindakan untuk menghapus pegawai',
		placement: 'bottom',
		target: '#' + testIds.dropdownEditEmployee + '-1',
	},
	{
		title: 'Pantau Sertifikasi Pegawai',
		content:
			'Sistem akan memberitahu sebulan sebelum sertifikasi akan kadaluwarsa',
		placement: 'bottom',
		target: '#' + testIds.cardCertifList,
	},
	{
		title: 'Pantau Safety Induction Pegawai',
		content:
			'Sistem akan memberitahu sebulan sebelum safety induction akan kadaluwarsa',
		placement: 'top',
		target: '#' + testIds.cardSafetyList,
	},
]

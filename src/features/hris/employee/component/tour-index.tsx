import type { Step } from 'react-joyride'

import { testIds } from '@/utils/constant/_testId'

export const steps: Step[] = [
	{
		title: 'Jabatan',
		content: 'Kelola jabatan di dalam perusahaan',
		target: 'body',
		placement: 'center',
	},
	{
		title: 'Tambah jabatan',
		content: 'Buat jabatan baru untuk mendukung struktur perusahaan',
		placement: 'bottom',
		target: '#' + testIds.buttonAddPosition,
	},
	{
		title: 'Cari jabatan',
		content: 'Cari jabatan berdasarkan nama',
		placement: 'bottom',
		target: '#' + testIds.search,
	},
	{
		title: 'Lihat pegawai',
		content: 'Lihat semua daftar pegawai dengan dengan menekan disini',
		placement: 'bottom',
		target: '#' + testIds.detailPosition + '-1',
	},
	{
		title: 'Kelola Jabatan',
		content: 'Pilih tindakan untuk mengubah atau menghapus jabatan.',
		placement: 'bottom',
		target: '#' + testIds.dropdownEditPosition + '-1',
	},
	{
		title: 'Total Pegawai per Jabatan',
		content: 'Visualisasi jumlah pegawai di setiap jabatan.',
		placement: 'bottom',
		target: '#' + testIds.totalEmployeePosition,
	},
	{
		title: 'Status Pegawai',
		content: 'Lihat distribusi pegawai aktif dan nonaktif.',
		placement: 'bottom',
		target: '#' + testIds.totalStatusEmployeePosition,
	},
]

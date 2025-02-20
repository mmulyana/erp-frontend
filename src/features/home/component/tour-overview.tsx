import type { Step } from 'react-joyride'

import { testIds } from '@/utils/constant/_testId'

export const steps: Step[] = [
	{
		title: 'Selamat Datang di Dashboard',
		content: 'Pantau semua informasi dalam satu tempat',
		target: 'body',
		placement: 'center',
	},
	{
		content: 'Total pegawai aktif saat ini',
		placement: 'bottom',
		target: '#' + testIds.totalEmployeeOverview,
	},
	{
		content: 'Total proyek aktif saat ini',
		placement: 'bottom',
		target: '#' + testIds.totalProjectOverview,
	},
	{
		content: 'Daftar proyek aktif',
		placementBeacon: 'top',
		target: '#' + testIds.projectListOverview,
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

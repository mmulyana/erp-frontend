import type { Step } from 'react-joyride'

import { testIds } from '@/utils/constant/_testId'

import Img from '/public/images/user-edit.png'

const tourUser: Step[] = [
	{
		title: 'Kelola akun',
		content: 'Kelola akun pengguna dengan mudah disini',
		target: 'body',
		placement: 'center',
	},
	{
		title: 'Tambah data',
		content: 'Tekan tombol disini untuk menambahkan user baru',
		target: '#' + testIds.buttonAddUser,
		placement: 'auto',
	},
	{
		title: 'Pencarian',
		content: 'Cari akun berdasarkan nama',
		target: '#' + testIds.search,
		placement: 'auto',
	},
	{
		title: 'Tambah dan ganti Peran/Role',
		content: 'Tekan tombol disini mereset password untuk akun',
		target: '#' + testIds.buttonAddRole + '-1',
		placement: 'auto',
	},
	{
		title: 'Reset password',
		content: 'Tekan tombol disini mereset password untuk akun',
		target: '#' + testIds.buttonReset + '-1',
		placement: 'auto',
	},
	{
		title: 'Kelola akun',
		content: (
			<div>
				<img src={Img} className='w-full h-auto' />
				<p className='mt-2'>
					Tekan tombol disini untuk aktifkan/menonaktifkan, edit, dan hapus
				</p>
			</div>
		),
		target: 'body',
		placement: 'center',
	},
]

export default tourUser

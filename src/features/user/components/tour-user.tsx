import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

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
		target: '#' + TEST_ID.BUTTON_ADD_USER,
		placement: 'auto',
	},
	{
		title: 'Pencarian',
		content: 'Cari akun berdasarkan nama',
		target: '#' + TEST_ID.SEARCH,
		placement: 'auto',
	},
	{
		title: 'Tambah dan ganti Peran/Role',
		content: 'Tekan tombol disini mereset password untuk akun',
		target: '#' + TEST_ID.BUTTON_ADD_ROLE + '-1',
		placement: 'auto',
	},
	{
		title: 'Reset password',
		content: 'Tekan tombol disini mereset password untuk akun',
		target: '#' + TEST_ID.BUTTON_RESET + '-1',
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

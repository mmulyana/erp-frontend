import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'

import Img from '/public/images/role.png'

const tourRole: Step[] = [
	{
		title: 'Kelola peran',
		content: 'Atur peran dan izin atau hak istimewa',
		target: 'body',
		placement: 'center',
	},
	{
		title: 'Tambah data',
		content: 'Tekan tombol disini untuk menambahkan role/peran baru',
		target: '#' + TEST_ID.BUTTON_CREATE_ROLE,
		placement: 'auto',
	},
	{
		content: 'Cari role/peran disini',
		target: '#' + TEST_ID.SEARCH,
		placement: 'auto',
	},
	{
		title: 'Kelola role',
		content: (
			<div>
				<img src={Img} className='w-full h-auto' />
				<p className='mt-2'>
					Tekan tombol disini untuk update hak istimewa, edit, dan hpus
				</p>
			</div>
		),
		target: 'body',
		placement: 'center',
	},
]

export default tourRole
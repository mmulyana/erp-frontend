import type { Step } from 'react-joyride'

import { testIds } from '@/shared/utils/constant/_testId'

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
		target: '#' + testIds.buttonCreateRole,
		placement: 'auto',
	},
	{
		content: 'Cari role/peran disini',
		target: '#' + testIds.search,
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

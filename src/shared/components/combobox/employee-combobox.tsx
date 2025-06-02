import { Check } from 'lucide-react'

import { useEmployeeInfinite } from '@/features/hris/employee/api/use-employees-infinite'
import { useEmployee } from '@/features/hris/employee/api/use-employee'

import InfiniteCombobox from '../common/infinite-combobox'
import PhotoUrl from '../common/photo-url'

export default function EmployeeCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
	disabled?: boolean
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useEmployeeInfinite({ search, limit: 10 })
			}
			fetchItemById={async (id) => {
				const { data } = await useEmployee(id)
				return data ?? null
			}}
			label={(item) => item.fullname}
			placeholder='Pilih pegawai'
			renderItem={(item, isSelected) => (
				<div className='flex gap-2 justify-between w-full items-center'>
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							url={item.photoUrl}
							style={{ img: 'h-10 w-10 rounded' }}
						/>
						<p className='text-ink-primary'>{item.fullname}</p>
						<p>{item?.position}</p>
					</div>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

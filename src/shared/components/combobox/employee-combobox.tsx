import { Check } from 'lucide-react'

import { useEmployeeInfinite } from '@/features/hris/employee/api/use-employees-infinite'
import { useEmployee } from '@/features/hris/employee/api/use-employee'

import { baseUrl } from '@/shared/constants/urls'

import InfiniteCombobox from '../common/infinite-combobox'

export default function EmployeeCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
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
						{item.photoUrl && (
							<img
								className='h-10 w-10 rounded'
								src={`${baseUrl}/${item.photoUrl}`}
							/>
						)}
						<p>{item.fullname}</p>
					</div>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

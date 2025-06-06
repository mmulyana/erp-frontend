import { differenceInDays, format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { useState } from 'react'

import EmptyState from '@/shared/components/common/empty-state'
import SearchV3 from '@/shared/components/common/search-v3'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { paths } from '@/shared/constants/paths'

import ModalAssignedDetail from './modal-assigned-detail'
import ModalAssignedAdd from './modal-assigned-add'
import { useProjectEmployees } from '../../api/employees/use-project-employees'
import { ModalCost } from './modal-cost'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function ProjectAssignedEmployees({ id }: { id?: string }) {
	const [search, setSearch] = useState('')
	const { data } = useProjectEmployees({ id })

	const isEmpty = data?.data?.length === 0

	return (
		<CardV1
			title='Pegawai'
			icon={<Users size={20} className='text-ink-primary' />}
			action={<SearchV3 value={search} onValueChange={setSearch} />}
			style={{ content: 'px-4 pb-4' }}
		>
			<ScrollArea className='h-[280px] pt-2'>
				{isEmpty && (
					<div className='h-full flex justify-center items-center'>
						<EmptyState />
					</div>
				)}
				<div className='flex flex-col gap-4'>
					{data?.data?.map((i, index) => {
						return (
							<div
								key={index}
								className='flex justify-between items-center hover:bg-gray-50 p-1.5 rounded-md group'
							>
								<div className='flex gap-2 items-center'>
									<PhotoUrl
										url={i.employee?.photoUrl}
										style={{ img: 'h-10 w-10' }}
									/>
									<div>
										<div className='flex gap-1 items-center'>
											<Link
												to={`${paths.hrisMasterdataEmployee}/${i.employee.id}`}
												className='text-ink-primary font-medium'
											>
												{i.employee?.fullname}
											</Link>
											{i.employee?.position && (
												<p className='text-ink-primary/50'>
													({i.employee?.position})
												</p>
											)}
										</div>
										<p className='text-sm text-ink-primary'>
											{i.endDate
												? `Selesai di ${format(
														new Date(i.endDate),
														'dd/MM/yyyy'
												  )}`
												: `Sejak ${format(
														new Date(i.startDate),
														'dd/MM/yyyy'
												  )} - Sekarang`}
										</p>
									</div>
								</div>

								<ProtectedComponent required={[permissions.project_assignee]}>
									<div className='flex gap-2 items-center'>
										<ModalAssignedDetail id={i.id} />
									</div>
								</ProtectedComponent>
							</div>
						)
					})}
				</div>
			</ScrollArea>
			<ProtectedComponent required={[permissions.project_assignee]}>
				<div className='mt-4 space-y-4'>
					<ModalAssignedAdd id={id} />
					<ModalCost />
				</div>
			</ProtectedComponent>
		</CardV1>
	)
}

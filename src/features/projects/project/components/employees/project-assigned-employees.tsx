import { ChevronRight, Plus, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { useState } from 'react'

import EmptyState from '@/shared/components/common/empty-state'
import SearchV3 from '@/shared/components/common/search-v3'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'

import { useProjectEmployees } from '../../api/employees/use-project-employees'
import ModalAssignedAdd from './modal-assigned-add'
import ModalAssignedDetail from './modal-assigned-detail'
import { Badge } from '@/shared/components/ui/badge'
import { ModalCost } from './modal-cost'

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
						const total =
							(i.startDate &&
								differenceInDays(
									i.endDate ? new Date(i.endDate) : new Date(),
									new Date(i.startDate)
								)) ||
							0

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
								<div className='flex gap-2 items-center'>
									<ModalAssignedDetail id={i.id} />
								</div>
							</div>
						)
					})}
				</div>
			</ScrollArea>
			<div className='mt-4 space-y-4'>
				<ModalAssignedAdd id={id} />
				<ModalCost />
			</div>
		</CardV1>
	)
}

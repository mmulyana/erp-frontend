import { ChevronDown, ChevronUp, Users } from 'lucide-react'
import { differenceInDays, format } from 'date-fns'
import { id as ind } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import EmptyState from '@/shared/components/common/empty-state'
import SearchV3 from '@/shared/components/common/search-v3'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import ProtectedComponent from '@/shared/components/common/protected'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { permissions } from '@/shared/constants/permissions'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'

import { useProjectEmployees } from '../../api/employees/use-project-employees'
import ModalAssignedDetail from './modal-assigned-detail'
import ModalAssignedAdd from './modal-assigned-add'
import { ModalCost } from './modal-cost'

export default function ProjectAssignedEmployees({ id }: { id?: string }) {
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)

	const { data } = useProjectEmployees({ id })

	const employees = data?.data?.filter((i) => !i.endDate)
	const employeesEnd = data?.data?.filter((i) => i.endDate)

	const isEmpty = data?.data?.length === 0

	return (
		<CardV1
			title='Pegawai'
			icon={<Users size={20} className='text-ink-primary' />}
			action={<SearchV3 value={search} onValueChange={setSearch} />}
			style={{ content: 'px-0 pb-4' }}
		>
			<ScrollArea className='h-[280px] pt-2 px-4'>
				{isEmpty && (
					<div className='h-full flex justify-center items-center'>
						<EmptyState />
					</div>
				)}
				<div className='flex flex-col gap-4'>
					{employees?.map((i, index) => {
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
											Sejak{' '}
											{format(new Date(i.startDate), 'PPP', { locale: ind })}{' '}
											<span className='font-medium'>
												({differenceInDays(new Date(), new Date(i.startDate))}{' '}
												hari)
											</span>
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
					<Button
						variant='ghost'
						onClick={() => setOpen(!open)}
						className='gap-2'
					>
						{open ? 'Tutup' : 'Lihat semua'}
						{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</Button>
					{open &&
						employeesEnd?.map((i, index) => {
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
												Selesai di{' '}
												{format(new Date(i.endDate), 'PPP', { locale: ind })}
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
			<ProtectedComponent
				required={[
					permissions.project_assignee,
					permissions.project_read_value,
				]}
			>
				<div className='mt-4 space-y-4 px-4'>
					<ModalAssignedAdd id={id} />
					<ProtectedComponent required={[permissions.project_read_value]}>
						<ModalCost />
					</ProtectedComponent>
				</div>
			</ProtectedComponent>
		</CardV1>
	)
}

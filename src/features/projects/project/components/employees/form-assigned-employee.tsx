import { Check, ExternalLink } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useEmployeeProject } from '@/features/hris/employee/api/use-employee-project'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import { useUpdateAssignProject } from '../../api/employees/use-update-assign-project'
import { AssignedForm } from '../../types'

type props = {
	form: UseFormReturn<AssignedForm>
	onSubmit: (data: AssignedForm) => void
	variant: 'add' | 'edit'
	isPending?: boolean
	modal?: React.ReactNode
	open?: boolean
}
export default function FormAssignedEmployee({
	form,
	onSubmit,
	variant,
	isPending = false,
	modal,
	open,
}: props) {
	const startDate = form.watch('startDate')

	const employeeId = form.watch('employeeId')

	const { mutate } = useUpdateAssignProject()
	const { data, refetch } = useEmployeeProject({
		employeeId,
		isEnd: false,
		enabled: open && employeeId !== '' && employeeId !== undefined,
	})

	const totalProjects = data?.data?.data?.filter(
		(i) => i.project.status !== 'DONE'
	).length
	const undoneProjects = data?.data?.data?.filter(
		(i) => i.project.status !== 'DONE'
	)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-4 flex-col pt-4'
			>
				{variant === 'add' && (
					<>
						<FormField
							control={form.control}
							name='employeeId'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Pegawai</FormLabel>
									<FormControl>
										<EmployeeCombobox onSelect={(e) => field.onChange(e)} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{!!totalProjects && (
							<div className='-mt-2 flex justify-between items-center'>
								<p className='text-ink-primary/50 text-sm'>
									Pegawai ini sudah ditugaskan di {totalProjects} proyek
								</p>
								<DialogHistoryProject>
									{undoneProjects?.map((i) => (
										<div
											key={i.id}
											className='flex gap-2 items-center justify-between'
										>
											<p className='text-ink-primary'>{i.project.name}</p>
											<Link
												target='_blank'
												to={`${paths.projectMasterdataProjects}/${i.project.id}`}
												className='flex gap-2 items-center'
											>
												Lihat
												<ExternalLink size={16} className='ml-0.5' />
											</Link>
										</div>
									))}
								</DialogHistoryProject>
							</div>
						)}
					</>
				)}
				<FormField
					control={form.control}
					name='startDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal Mulai</FormLabel>
							<FormControl>
								<DatePickerField
									value={field.value}
									onChange={field.onChange}
									disabledDate={(date) => {
										const today = new Date()

										const monthBfore = new Date(today)
										monthBfore.setMonth(monthBfore.getMonth() - 1)

										const monthAfter = new Date(today)
										monthAfter.setMonth(monthAfter.getMonth() + 1)

										return date < monthBfore || date > monthAfter
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{variant === 'edit' && (
					<FormField
						control={form.control}
						name='endDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal Berakhir</FormLabel>
								<FormControl>
									<DatePickerField
										value={field.value}
										onChange={field.onChange}
										disabledDate={(date) => {
											return date < new Date(startDate)
										}}
										showReset
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<DialogFooter>
					<div className='flex justify-between gap-4 items-center pt-4 w-full'>
						<div>{modal}</div>
						<div className='flex gap-4'>
							<DialogClose asChild>
								<Button variant='outline' type='button'>
									Batal
								</Button>
							</DialogClose>
							{variant === 'add' ? (
								totalProjects ? (
									<DialogHistoryProject
										trigger={<Button type='button'>Simpan</Button>}
										title='Pegawai Ini Sedang Aktif di Proyek Lain'
										description='Pegawai ini masih memiliki penugasan aktif di proyek lain. Anda tetap bisa menambahkannya ke proyek ini jika diperlukan.'
									>
										{({ setOpen }) => (
											<>
												<div className='mb-2 border-b pb-1'>
													<p className='font-medium'>Proyek</p>
												</div>
												{undoneProjects?.map((i) => (
													<div
														key={i.id}
														className='flex gap-2 items-center justify-between mt-2'
													>
														<p className='text-ink-primary'>{i.project.name}</p>
														<Button
															variant='outline'
															className='gap-1'
															onClick={() => {
																mutate(
																	{
																		id: i.id,
																		endDate: new Date().toString(),
																		startDate: i.startDate,
																	},
																	{
																		onSuccess: () => {
																			refetch()
																		},
																	}
																)
															}}
														>
															Tandai Selesai
															<Check size={16} strokeWidth={3} />
														</Button>
													</div>
												))}
												<div className='pt-6 flex justify-end gap-4'>
													<Button
														variant='outline'
														onClick={() => setOpen(false)}
													>
														Batal
													</Button>
													<Button onClick={() => form.handleSubmit(onSubmit)()}>
														Tetap tambahkan ke Proyek
													</Button>
												</div>
											</>
										)}
									</DialogHistoryProject>
								) : (
									<ButtonSubmit isPending={isPending} />
								)
							) : (
								<ButtonSubmit isPending={isPending} />
							)}
						</div>
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}

type DialogHistoryProjectProps = {
	trigger?: React.ReactNode
	children:
		| React.ReactNode
		| ((props: {
				open: boolean
				setOpen: (v: boolean) => void
		  }) => React.ReactNode)
	title?: string
	description?: string
}

function DialogHistoryProject({
	children,
	trigger,
	title = 'Riwayat Proyek',
	description = 'Daftar proyek yang pernah diikuti oleh pegawai ini.',
}: DialogHistoryProjectProps) {
	const [open, setOpen] = useState(false)

	const renderChildren =
		typeof children === 'function' ? children({ open, setOpen }) : children

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || <Button variant='ghost'>Lihat Proyek</Button>}
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader className='mb-4'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{renderChildren}
			</DialogContent>
		</Dialog>
	)
}

import { UseFormReturn } from 'react-hook-form'

import { useEmployeeProject } from '@/features/hris/employee/api/use-employee-project'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'
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
import { AssignedForm } from '../../types'
import { ExternalLink } from 'lucide-react'
import { paths } from '@/shared/constants/paths'
import { Link } from 'react-router-dom'
import { baseUrl } from '@/shared/constants/urls'

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

	const { data } = useEmployeeProject({
		employeeId,
		isEnd: false,
		enabled: open && employeeId !== '' && employeeId !== undefined,
	})

	const totalProjects = data?.data?.data?.filter(
		(i) => i.project.status !== 'DONE'
	).length

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
									{data?.data?.data.map((i) => (
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
							<ButtonSubmit isPending={isPending} />
						</div>
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}

function DialogHistoryProject({ children }: React.PropsWithChildren) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost'>Lihat Proyek</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader className='mb-4'>
					<DialogTitle>Riwayat Proyek</DialogTitle>
					<DialogDescription>
						Daftar proyek yang pernah diikuti oleh pegawai ini.
					</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}

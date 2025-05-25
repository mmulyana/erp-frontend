import { ChevronRight, Plus, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import ButtonSubmit from '@/shared/components/common/button-submit'
import EmptyState from '@/shared/components/common/empty-state'
import SearchV3 from '@/shared/components/common/search-v3'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button } from '@/shared/components/ui/button'
import { paths } from '@/shared/constants/paths'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { useCreateAssignProject } from '../api/assigned/use-create-assign-project'
import { useProjectEmployeee } from '../api/assigned/use-project-employee'

export default function ProjectAssignedEmployees({ id }: { id?: string }) {
	const [search, setSearch] = useState('')
	const { data } = useProjectEmployeee({ id })

	const isEmpty = data?.data?.length === 0

	return (
		<CardV1
			title='Pegawai'
			icon={<Users size={20} className='text-ink-primary' />}
			action={<SearchV3 value={search} onValueChange={setSearch} />}
			style={{ content: 'px-4' }}
		>
			<ScrollArea className='h-[280px] pt-2'>
				{isEmpty && (
					<div className='h-full flex justify-center items-center'>
						<EmptyState />
					</div>
				)}
				<div className='flex flex-col gap-4'>
					{data?.data?.map((i, index) => (
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
									<Link
										to={`${paths.hrisMasterdataEmployee}/${i.employee.id}`}
										className='text-ink-primary font-medium'
									>
										{i.employee?.fullname}
									</Link>
									<p className='text-ink-primary/50 text-sm -mt-0.5'>
										{i.employee?.position}
									</p>
								</div>
							</div>
							<div className='flex gap-2 items-center'>
								<p className='text-ink-light'>
									{format(new Date(i.startDate), 'dd/MM/yyyy')}
								</p>
								<Button
									variant='outline'
									className='w-8 h-8 p-0 hidden group-hover:flex transition-all ease-in'
								>
									<ChevronRight />
								</Button>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
			<ModalAddEmployee id={id} />
		</CardV1>
	)
}

function ModalAddEmployee({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm({
		defaultValues: {
			employeeId: '',
			projectId: id,
			startDate: new Date(),
		},
	})
	const { mutate, isPending } = useCreateAssignProject()

	const submit = (data: any) => {
		if (!id) return
		mutate(
			{
				employeeId: data.employeeId,
				projectId: id,
				startDate: new Date().toDateString(),
			},
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-1 w-full h-10'>
					<Plus size={16} />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Pegawai baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
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

						<DialogFooter>
							<div className='flex justify-end gap-4 items-center pt-4'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<ButtonSubmit isPending={isPending} />
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

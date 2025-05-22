import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
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
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ProjectForm } from '../types'
import { Input } from '@/shared/components/ui/input'
import { EditorDescription } from '@/shared/components/common/tiptap/editor-description'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { useUpdateProject } from '../api/use-update-project'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { useProject } from '../api/use-project'
import { Slider } from '@/shared/components/ui/slider'
import { cn } from '@/shared/utils/cn'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { priorityOption, statusBadges } from '../constant/types'
import ClientCombobox from '../../client/components/client-combobox'
import UserCombobox from '@/features/user/components/user-combobox'
import { NumericFormat } from 'react-number-format'

type FormValues = Partial<ProjectForm>

type props = {
	variant: 'info' | 'detail'
}
export default function ModalEditProject({ variant }: props) {
	const skipInterval = 20
	const ticks = [...Array(100 + 1)].map((_, i) => i)

	const [open, setOpen] = useState(false)

	const { id } = useParams()
	const { data } = useProject({ id })
	const { mutate, isPending } = useUpdateProject()

	const form = useForm<FormValues>()
	const formWatch = form.watch()

	const submit = (data: FormValues) => {
		if (!id) return
		mutate(
			{
				...data,
				id,
				paymentPercentage: Array.isArray(data.paymentPercentage)
					? data.paymentPercentage[0]
					: undefined,
				progressPercentage: Array.isArray(data.progressPercentage)
					? data.progressPercentage[0]
					: undefined,
			},
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<FormValues>(form),
			}
		)
	}

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				name: res.name,
				clientId: res.clientId,
				deadlineAt: res.deadlineAt ? new Date(res.deadlineAt) : undefined,
				description: res.description,
				doneAt: res.doneAt ? new Date(res.doneAt) : undefined,
				leadId: res.leadId,
				netValue: res.netValue,
				paymentPercentage: res.paymentPercentage,
				priority: res.priority,
				progressPercentage: res.progressPercentage,
				status: res.status,
			})
		}
	}, [data])

	const FormType = {
		info: (
			<div className='space-y-4'>
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Nama Proyek<span className='text-error'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-surface-secondary w-full'
									placeholder='Nama'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='description'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<EditorDescription
									content={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						name='deadlineAt'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tenggat waktu</FormLabel>
								<FormControl>
									<DatePickerField
										onChange={field.onChange}
										value={field.value}
										showReset
										disabledDate={() => false}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='doneAt'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Selesai</FormLabel>
								<FormControl>
									<DatePickerField
										onChange={field.onChange}
										value={field.value}
										showReset
										disabledDate={() => false}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		),
		detail: (
			<div className='space-y-6'>
				<FormField
					control={form.control}
					name='netValue'
					render={({ field }) => {
						const usedField = { ...field }
						delete (usedField as any).onChange
						
						return (
							<FormItem>
								<FormLabel>Nilai proyek</FormLabel>
								<FormControl>
									<div className='relative'>
										<div className='absolute bg-white rounded-l-lg top-1/2 -translate-y-1/2 px-3 left-[1px] border-r border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
											Rp
										</div>
										<NumericFormat
											type='text'
											thousandSeparator='.'
											decimalSeparator=','
											customInput={Input}
											className='h-10 w-full pl-12'
											{...usedField}
											onValueChange={(values) => {
												field.onChange(Number(values.value))
											}}
										/>
									</div>
								</FormControl>
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name='progressPercentage'
					render={({ field }) => {
						const value = field.value ?? 0
						return (
							<FormItem>
								<div className='flex justify-between items-center'>
									<FormLabel>Progress</FormLabel>
									<output className='text-sm font-medium tabular-nums'>
										{Array.isArray(value) ? value[0] : value}
									</output>
								</div>
								<Slider
									defaultValue={[0]}
									max={100}
									step={10}
									value={[field.value || 0]}
									onValueChange={field.onChange}
								/>
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name='paymentPercentage'
					render={({ field }) => {
						const value = field.value ?? 0
						return (
							<FormItem>
								<div className='flex justify-between items-center'>
									<FormLabel>Pembayaran</FormLabel>
									<output className='text-sm font-medium tabular-nums'>
										{Array.isArray(value) ? value[0] : value}
									</output>
								</div>
								<Slider
									defaultValue={[0]}
									max={100}
									step={10}
									value={[field.value || 0]}
									onValueChange={field.onChange}
								/>
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name='status'
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className='w-full h-8 rounded-lg'>
											<SelectValue placeholder='Pilih status' />
										</SelectTrigger>
										<SelectContent>
											{statusBadges.map((i) => (
												<SelectItem key={i.value} value={i.value.toString()}>
													{i.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Prioritas</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className='w-full h-8 rounded-lg'>
											<SelectValue placeholder='Pilih status' />
										</SelectTrigger>
										<SelectContent>
											{priorityOption.map((i) => (
												<SelectItem key={i.value} value={i.value}>
													{i.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)
					}}
				/>
				<FormField
					name='clientId'
					control={form.control}
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel className='text-ink-primary text-base font-normal'>
								klien
							</FormLabel>
							<FormControl>
								<ClientCombobox
									defaultValue={field.value}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='leadId'
					control={form.control}
					render={({ field }) => (
						<FormItem className=''>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Penanggung jawab lapangan
							</FormLabel>
							<FormControl>
								<UserCombobox
									defaultValue={formWatch.leadId}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2 absolute right-4 z-10'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Proyek</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='px-4 pt-4' onSubmit={form.handleSubmit(submit)}>
						{FormType[variant as keyof typeof FormType]}
						<DialogFooter className='pt-6'>
							<DialogClose asChild>
								<Button variant='outline' type='button'>
									Batal
								</Button>
							</DialogClose>
							<ButtonSubmit isPending={isPending} />
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

import { useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Plus, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatThousands } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'
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
} from '@/shared/components/ui/form'

import { useSummaryEmployee } from '../../employee/api/use-summary-employee'
import { useEmployee } from '../../employee/api/use-employee'
import { useUpdatePayroll } from '../api/use-update-payroll'
import { usePayroll } from '../api/use-payroll'
import { FormProcess } from '../types'

const optionsPayment = [
	{
		id: 'TRANSFER',
		name: 'Transfer',
		description: 'Ditransfer ke ATM pegawai',
	},
	{
		id: 'CASH',
		name: 'Uang Tunai',
		description: 'Diberikan langsung secara tunai',
	},
]

type props = {
	id?: string
	employeeId?: string
	startDate?: string
	endDate?: string
}
export default function ModalProcessPayroll({
	id,
	employeeId,
	startDate,
	endDate,
}: props) {
	const [open, setOpen] = useState(false)
	const [isPayment, setIsPayment] = useState(false)

	const { data: payroll } = usePayroll({ id: open ? id : '' })
	const { data: summary, isPending } = useSummaryEmployee({
		id: open ? employeeId : '',
		startDate,
		endDate,
	})
	const { data: employee } = useEmployee(open ? employeeId : '')

	const { mutate } = useUpdatePayroll()

	const form = useForm<FormProcess>({
		defaultValues: {
			deduction: 0,
			overtimeHour: 0,
			workDay: 0,
			overtimeSalary: 0,
			salary: 9,
			paymentType: '',
		},
	})
	const formWatch = form.watch()

	const totalBasic = formWatch.salary * formWatch.workDay
	const totalOvertime = formWatch.overtimeSalary * formWatch.overtimeHour
	const totalIncome = totalBasic + totalOvertime

	const numericDeductions = formWatch.deductions
		?.filter((d) => d.type === 'numeric')
		?.reduce((acc, curr) => acc + curr.amount, 0)

	const percentDeductions = formWatch.deductions
		?.filter((d) => d.type === 'percent')
		?.reduce((acc, curr) => acc + totalIncome * (curr.amount / 100), 0)

	const totalDeduction = numericDeductions + percentDeductions || 0

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'deductions',
	})

	useEffect(() => {
		if (isPending) return
		form.reset({
			workDay: summary?.total.presence,
			overtimeHour: summary?.total.overtimes,
			overtimeSalary: payroll?.overtimeSalary,
			salary: payroll?.salary,
		})
	}, [summary, isPending])

	const submit = (data: FormProcess) => {
		if (!payroll?.id) return
		const noteNames = data.deductions?.map((i) => i.name).join(',')
		const noteValue = data.deductions?.map((i) => i.amount).join(',')
		const noteType = data.deductions?.map((i) => i.type).join(',')

		const note =
			noteNames !== ''
				? [noteNames, '|', noteValue, '|', noteType].join('')
				: ''

		mutate(
			{
				...data,
				deduction: totalDeduction,
				id: payroll?.id,
				status: 'done',
				note,
			},
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<FormProcess>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Proses gaji</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-center'>Proses Gaji</DialogTitle>
				<DialogDescription className='text-center'>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)}>
						{isPayment ? (
							<div className='px-6 pt-6'>
								<div className='space-y-2'>
									<FormLabel className='mb-2'>Pilih Skema Pembayaran</FormLabel>
									<FormField
										control={form.control}
										name='paymentType'
										render={({ field }) => (
											<RadioGroup
												value={field.value}
												onValueChange={field.onChange}
												className='grid grid-cols-1 md:grid-cols-2 gap-4'
											>
												{optionsPayment.map((option) => (
													<label
														key={option.id}
														htmlFor={option.id}
														className={cn(
															'relative flex items-center rounded-lg border p-4 cursor-pointer transition-colors',
															field.value === option.id
																? 'bg-blue-50 border-blue-600'
																: 'bg-white border-gray-200 hover:border-gray-300'
														)}
													>
														<div className='flex flex-col flex-1'>
															<span className='font-medium'>{option.name}</span>
															<span className='text-gray-500 text-sm max-w-[120px]'>
																{option.description}
															</span>
														</div>
														<div className='ml-auto'>
															<RadioGroupItem
																value={option.id}
																id={option.id}
																className={cn(
																	'h-6 w-6 border-2',
																	field.value === option.id
																		? 'border-blue-600 text-blue-600'
																		: 'border-gray-300'
																)}
															/>
														</div>
													</label>
												))}
											</RadioGroup>
										)}
									/>
								</div>
							</div>
						) : (
							<div className='px-6'>
								<div className='py-4 my-2 border-b border-dashed space-y-2 border-border'>
									<div className='flex justify-between items-center'>
										<p className='text-ink-primary/50'>Nama</p>
										<p className='text-ink-primary'>{employee?.fullname}</p>
									</div>
									<div className='flex justify-between items-center'>
										<p className='text-ink-primary/50'>Jabatan</p>
										<p className='text-ink-primary'>{employee?.position}</p>
									</div>
									<div className='flex justify-between items-center'>
										<p className='text-ink-primary/50'>Bergabung sejak</p>
										{employee?.joinedAt && (
											<p className='text-ink-primary'>
												{format(new Date(employee?.joinedAt), 'PPP', {
													locale: ind,
												})}
											</p>
										)}
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
										<div className='space-y-2'>
											<p className='text-ink-primary/50'>Gaji pokok (harian)</p>
											<FormField
												name='salary'
												control={form.control}
												render={({ field }) => {
													const usedField = { ...field }
													delete (usedField as any).onChange

													return (
														<FormItem>
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
										</div>
										<div className='space-y-2'>
											<p className='text-ink-primary/50'>Gaji lembur (jam)</p>
											<FormField
												name='overtimeSalary'
												control={form.control}
												render={({ field }) => {
													const usedField = { ...field }
													delete (usedField as any).onChange

													return (
														<FormItem>
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
										</div>
									</div>
								</div>
								<div className='py-4 my-2 border-b border-dashed space-y-4 border-border'>
									<p className='text-ink-primary font-medium'>
										Absensi dan lembur
									</p>
									<div className='flex justify-between items-center'>
										<p className='text-ink-primary/50'>Jml hari</p>
										<FormField
											name='workDay'
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='relative'>
															<div className='w-12 bg-white rounded-r-lg absolute top-1/2 -translate-y-1/2 px-3 right-[1px] border-l border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
																Hari
															</div>
															<Input className='w-28 pr-14' {...field} />
														</div>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className='flex justify-between items-center'>
										<p className='text-ink-primary/50'>Jml lembur</p>
										<FormField
											name='overtimeHour'
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='relative'>
															<div className='w-12 bg-white rounded-r-lg absolute top-1/2 -translate-y-1/2 px-3 right-[1px] border-l border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
																Jam
															</div>
															<Input className='w-28 pr-14' {...field} />
														</div>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className='py-4 my-2 border-b border-dashed space-y-4 border-border'>
									<p className='text-ink-primary font-medium'>Potongan</p>
									{fields.map((i, index) => (
										<div
											key={i.id}
											className='flex justify-between items-center'
										>
											<div className='flex gap-2 items-center'>
												<p>{i.name}</p>
												<Button
													variant='ghost'
													className='text-sm hover:text-error'
													onClick={() => remove(index)}
													type='button'
												>
													Batal
												</Button>
											</div>
											<FormField
												control={form.control}
												name={`deductions.${index}.amount`}
												render={({ field }) => {
													const usedField = { ...field }
													delete (usedField as any).onChange

													return (
														<FormItem>
															<FormControl>
																<div className='relative'>
																	{i.type === 'percent' ? (
																		<>
																			<Input
																				className='w-28 pr-14'
																				{...field}
																			/>
																			<div className='w-12 bg-white rounded-r-lg absolute top-1/2 -translate-y-1/2 px-3 right-[1px] border-l border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary'>
																				<p className='font-medium'>%</p>
																			</div>
																		</>
																	) : (
																		<>
																			<FormItem>
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
																								field.onChange(
																									Number(values.value)
																								)
																							}}
																						/>
																					</div>
																				</FormControl>
																			</FormItem>
																		</>
																	)}
																</div>
															</FormControl>
														</FormItem>
													)
												}}
											/>
										</div>
									))}
									<ModalAddDeduction
										onClick={(name, type) => {
											append({
												name,
												type,
												amount: 0,
											})
										}}
									/>
								</div>
								<div className='pt-4 border-border flex justify-between items-start'>
									<p className='text-ink-primary font-medium'>Subtotal</p>
									<div className='space-y-4'>
										<div className='text-right space-y-2'>
											<p className='text-ink-primary/50 text-sm'>
												Gaji pokok x hari kerja
											</p>
											<p className='text-ink-primary text-xl'>
												Rp {formatThousands(totalBasic)}
											</p>
										</div>
										<div className='text-right space-y-2'>
											<p className='text-ink-primary/50 text-sm'>
												Gaji lembur x jam lembur
											</p>
											<p className='text-ink-primary text-xl'>
												Rp {formatThousands(totalOvertime)}
											</p>
										</div>
										<div className='text-right space-y-2'>
											<p className='text-ink-primary/50 text-sm'>
												Jumlah potongan
											</p>
											<p className='text-ink-primary text-xl'>
												Rp {formatThousands(totalDeduction)}
											</p>
										</div>
										<div className='text-right space-y-2'>
											<p className='text-ink-primary/50'>Gaji diterima</p>
											<div className='w-[180px] text-right'>
												<p className='text-ink-primary font-medium text-xl'>
													Rp {formatThousands(totalIncome - totalDeduction)}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<DialogFooter className='px-6 pt-4'>
							<div className='flex justify-between items-center w-full'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<div className='flex gap-4 items-center'>
									{!isPayment && (
										<Button variant='secondary'>
											<RotateCcw
												size={16}
												className='text-ink-light'
												strokeWidth={3}
											/>
											<span className='px-1'>Ulangi</span>
										</Button>
									)}
									<Button
										id='btn-payment'
										type='button'
										variant={isPayment ? 'secondary' : 'default'}
										onClick={() => setIsPayment(!isPayment)}
									>
										{isPayment ? 'Kembali' : 'Lanjutkan Pembayaran'}
									</Button>
									{isPayment && <Button>Simpan</Button>}
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

const options = [
	{
		name: 'Persenan',
		value: 'percent',
	},
	{
		name: 'Angka',
		value: 'numeric',
	},
]

type modalProps = {
	onClick: (name: string, type: string) => void
}
function ModalAddDeduction({ onClick }: modalProps) {
	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		type: '',
	}

	type deductionForm = {
		name: string
		type: string
	}
	const form = useForm<deductionForm>({
		defaultValues,
	})

	const submit = (data: deductionForm) => {
		onClick(data.name, data.type)
		setOpen(false)
	}

	useEffect(() => {
		if (!open) form.reset(defaultValues)
		return () => form.reset(defaultValues)
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' type='button'>
					<Plus size={18} />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[400px]'>
				<DialogTitle className='text-center mb-2'>Potongan Baru</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className='space-y-6 px-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama potongan</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis potongan</FormLabel>
									<FormControl>
										<div>
											<RadioGroup
												value={field.value}
												onValueChange={field.onChange}
												className='grid grid-cols-1 md:grid-cols-2 gap-4'
											>
												{options.map((option) => (
													<label
														key={option.value}
														htmlFor={option.value}
														className={cn(
															'relative flex items-center rounded-lg border p-2 cursor-pointer transition-colors',
															field.value === option.value
																? 'bg-blue-50 border-brand'
																: 'bg-white border-gray-200 hover:border-gray-300'
														)}
													>
														<p>{option.name}</p>
														<div className='ml-auto'>
															<RadioGroupItem
																value={option.value}
																id={option.value}
																className={cn(
																	'h-6 w-6 border-2',
																	field.value === option.value
																		? 'border-brand text-brand'
																		: 'border-gray-300'
																)}
															/>
														</div>
													</label>
												))}
											</RadioGroup>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose>
								<Button variant='outline'>Batal</Button>
							</DialogClose>
							<Button
								type='button'
								onClick={() => {
									form.handleSubmit(submit)()
								}}
							>
								Simpan
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

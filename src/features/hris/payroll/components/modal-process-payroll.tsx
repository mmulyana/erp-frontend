import { useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useEffect, useState } from 'react'
import { id as ind } from 'date-fns/locale'
import { Pencil, RotateCcw } from 'lucide-react'
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
import ModalAddDeduction from './modal-add-deduction'
import { usePayroll } from '../api/use-payroll'
import { FormProcess } from '../types'
import { useCreateTransaction } from '../../cash-advance/api/use-create-transaction'
import { useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'

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
	name?: string
	employeeId?: string
	startDate?: string
	endDate?: string
	variant?: 'default' | 'update'
}
export default function ModalProcessPayroll({
	id,
	employeeId,
	startDate,
	endDate,
	name,
	variant = 'default',
}: props) {
	const queryClient = useQueryClient()

	const [open, setOpen] = useState(false)
	const [cashAdvances, setCashAdvances] = useState<string[]>([])
	const [isPayment, setIsPayment] = useState(false)

	const { data: payroll } = usePayroll({ id: open ? id : '' })
	const { data: summary, isPending } = useSummaryEmployee({
		id: open ? employeeId : '',
		startDate,
		endDate,
	})
	const { data: employee } = useEmployee(open ? employeeId : '')

	const { mutateAsync } = useCreateTransaction()
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
			workDay: payroll?.workDay || summary?.total.presence,
			overtimeHour: payroll?.overtimeHour || summary?.total.overtimes,
			overtimeSalary: payroll?.overtimeSalary,
			salary: payroll?.salary,
		})

		if (payroll?.note) {
			const [namesStr, amountsStr, typesStr] = payroll.note.split('|')

			if (namesStr && amountsStr && typesStr) {
				const names = namesStr.split(',')
				const amounts = amountsStr.split(',')
				const types = typesStr.split(',')

				if (names.length === amounts.length && names.length === types.length) {
					names.forEach((name, index) => {
						append({
							name: name,
							type: types[index],
							amount: Number(amounts[index]),
						})
					})
				}
			}
		}
	}, [summary, isPending])

	const submit = async (data: FormProcess) => {
		if (!payroll?.id) return

		if (cashAdvances.length > 0) {
			const promises = cashAdvances.map((id) =>
				mutateAsync({
					cashAdvanceId: id,
					date: new Date(),
					note: `Dipotong gaji - ${name}`,
					amount: summary?.cashAdvances.find((i) => i.id === id)?.amount,
				})
			)

			await Promise.all(promises)
		}

		const noteNames = data.deductions?.map((i) => i.name).join(',')
		const noteValue = data.deductions?.map((i) => i.amount).join(',')
		const noteType = data.deductions?.map((i) => i.type).join(',')
		const noteReference = data.deductions?.map((i) => i.referenceId).join(',')

		const note =
			noteNames !== ''
				? [noteNames, '|', noteValue, '|', noteType, '|', noteReference].join(
						''
				  )
				: ''

		mutate(
			{
				...data,
				deduction: totalDeduction,
				id: payroll?.id,
				status: 'done',
				doneAt: new Date().toLocaleString(),
				note,
			},
			{
				onSuccess: handleFormSuccess(setOpen, () => {
					queryClient.invalidateQueries({
						predicate: (query) =>
							Array.isArray(query.queryKey) &&
							query.queryKey[0] === keys.payrollTotal,
					})
					queryClient.invalidateQueries({
						predicate: (query) =>
							Array.isArray(query.queryKey) &&
							query.queryKey[0] === keys.payrollProgress,
					})
				}),
				onError: handleFormError<FormProcess>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					{variant !== 'default' && <Pencil size={16} />}
					<span className='px-0.5'>
						{variant == 'default' ? 'Proses gaji' : 'Ubah'}
					</span>
				</Button>
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
													onClick={() => {
														if (i.referenceId !== '') {
															setCashAdvances(
																cashAdvances.filter((c) => c !== i.referenceId)
															)
														}
														remove(index)
													}}
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
																							disabled={
																								i.referenceId !== undefined
																							}
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
									<div>
										<p className='text-ink-primary font-medium'>Kasbon</p>
										<p className='text-ink-primary/50'>
											Pilih kasbon sebagai potongan
										</p>
										<div className='flex gap-2 flex-wrap mt-2'>
											{summary?.cashAdvances
												.filter((i) => !cashAdvances.includes(i.id))
												.map((i) => (
													<Button
														variant='outline'
														type='button'
														className='rounded-full gap-0.5'
														onClick={() => {
															append({
																type: 'numeric',
																amount: i.amount,
																name: `kasbon-${format(
																	new Date(i.date),
																	'dd/MM/yyyy'
																)}`,
																referenceId: i.id,
															})
															setCashAdvances((prev) => [...prev, i.id])
														}}
													>
														<p>Rp {formatThousands(i.amount)}</p>-
														<p>
															{format(new Date(i.date), 'PPP', { locale: ind })}
														</p>
													</Button>
												))}
										</div>
									</div>
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

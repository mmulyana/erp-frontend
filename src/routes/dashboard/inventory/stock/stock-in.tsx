import { useFieldArray, useForm } from 'react-hook-form'
import { Plus, X, PackagePlus } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { PATH } from '@/utils/constant/_paths'
import { useState } from 'react'

import usePermission from '@/shared/hooks/use-permission'
import { useApiData } from '@/hooks/use-api-data'
import { useGoods } from '@/hooks/api/use-goods'
import {
	useCreateTransaction,
	useTransactionPagination,
} from '@/hooks/api/use-transaction'
import { CreateTransaction } from '@/utils/types/form'
import { BASE_URL } from '@/utils/constant/_urls'

import DetailTransaction from './_component/detail-transaction'
import DeleteTransaction from './_component/delete-transaction'
import TitlePage from '../../../../shared/component/title-page'
import { useInventoryData } from '../_hook/use-inventory-data'
import { DashboardLayout } from '../../../../shared/component/layout'
import { steps } from '../_component/tour-stock'
import { column } from './_component/column'

import Modal, { ModalContainer } from '@/components/modal-v2'
import SelectV1 from '@/components/common/select/select-v1'
import Tour from '@/components/common/tour'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { FilterTable } from '@/components/data-table/component'
import { CommandItem } from '@/components/ui/command'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/shared/store/title'

const links = [
	{
		name: 'Inventory',
		path: PATH.DASHBOARD_OVERVIEW,
	},
	{
		name: 'Kelola',
		path: PATH.PROJECT_INDEX,
	},
	{
		name: 'Barang Masuk',
		path: PATH.INVENTORY_STOCK_IN,
	},
]

const HIDE = ['project']

export default function StockInPage() {
	useTitle(links)

	const permission = usePermission()

	const [url] = useUrlState({ page: '' })

	const { data, isLoading } = useApiData(
		useTransactionPagination({
			type: 'in',
			...(url.page !== '' ? { page: url.page } : undefined),
		})
	)

	const { suppliers } = useInventoryData()

	const [search, setSearch] = useState('')
	const { data: goods } = useApiData(
		useGoods({
			name: search,
		})
	)

	const { mutate } = useCreateTransaction()
	const [open, setOpen] = useState(false)

	const form = useForm<CreateTransaction>({
		defaultValues: {
			date: '',
			supplierId: null,
			items: [{ goodsId: null, qty: null, price: null, type: 'in' }],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	})

	const onSubmit = async (data: CreateTransaction) => {
		mutate(
			{ payload: data },
			{
				onSuccess: () => {
					setOpen(false)
					form.reset()
				},
			}
		)
	}

	const isAllowed = permission.includes('transaction:create')

	return (
		<>
			<DashboardLayout className='overflow-hidden'>
				<TitlePage>
					<div className='flex gap-2 items-center'>
						<PackagePlus className='text-[#989CA8]' />
						<p className='text-dark font-medium'>Barang Masuk</p>
					</div>
				</TitlePage>
				<FilterTable
					onAdd={() => setOpen(!open)}
					className='border-t border-line'
					create={isAllowed}
				/>
				<DataTable
					columns={column.filter((item) => !HIDE.includes(String(item.id)))}
					totalPages={data?.total_pages}
					data={data?.data || []}
					isLoading={isLoading}
					withPagination
				/>
			</DashboardLayout>
			<DeleteTransaction />
			<DetailTransaction />
			<Modal title='Barang masuk' open={open} setOpen={setOpen}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<ModalContainer setOpen={setOpen}>
							{fields.map((field, index) => (
								<div key={field.id}>
									<div className='flex justify-between items-center bg-[#F1F5F9] pl-2 rounded-t-lg h-10 border-b border-[#E5EBF1]'>
										<h3 className='text-sm font-medium text-dark'>
											Barang ke-{index + 1}
										</h3>
										{index > 0 && (
											<Button
												type='button'
												variant='ghost'
												size='sm'
												className='text-slate-600 hover:text-red-400 hover:bg-transparent'
												onClick={() => remove(index)}
											>
												<X className='w-4 h-4' strokeWidth={3} />
											</Button>
										)}
									</div>
									<div className='p-4 bg-[#F8FAFC] rounded-b-lg'>
										<div className='grid grid-cols-5 gap-4'>
											<div className='flex flex-col gap-3 col-span-2'>
												<FormLabel>Barang</FormLabel>
												<SelectV1
													name={`items.${index}.goodsId`}
													placeholder='Pilih Barang'
													className='w-full col-span-2'
													onSearch={setSearch}
													shouldFilter={false}
													preview={(val) => (
														<span className='text-sm text-dark'>
															{goods?.find((s: any) => s.id === val)?.name}
														</span>
													)}
												>
													{goods?.map((item) => (
														<CommandItem
															key={item.id}
															value={item.name}
															onSelect={() => {
																form.setValue(`items.${index}.goodsId`, item.id)
															}}
															className='flex justify-between items-center'
														>
															<p className='text-dark'>{item.name}</p>
															{item.photoUrl && (
																<img
																	src={BASE_URL + '/img/' + item.photoUrl}
																	className='w-8 h-8 rounded-lg'
																/>
															)}
														</CommandItem>
													))}
												</SelectV1>
											</div>

											<FormField
												label='Kuantitas'
												control={form.control}
												name={`items.${index}.qty`}
												render={({ field }) => (
													<div className='relative'>
														<Input
															{...field}
															value={field.value ?? ''}
															onChange={(e) => {
																const value = e.target.value
																field.onChange(
																	value === '' ? null : Number(value)
																)
															}}
														/>
														{field.value && (
															<div className='absolute top-0 right-0 h-full pr-3 flex items-center text-dark capitalize text-sm font-medium'>
																{goods?.find(
																	(s) =>
																		s.id ===
																		Number(form.watch(`items.${index}.goodsId`))
																)?.measurement?.name || ''}
															</div>
														)}
													</div>
												)}
											/>

											<div className='col-span-2'>
												<FormField
													label='Harga beli'
													control={form.control}
													name={`items.${index}.price`}
													render={({ field }) => (
														<div className='relative'>
															<Input
																type='number'
																{...field}
																value={field.value ?? ''}
																onChange={(e) => {
																	const value = e.target.value
																	field.onChange(
																		value === '' ? null : Number(value)
																	)
																}}
															/>
														</div>
													)}
												/>
											</div>
										</div>
									</div>
									{index === fields.length - 1 && (
										<div className='pt-2'>
											<Button
												type='button'
												variant='secondary'
												size='sm'
												className='pl-2.5 pr-4 text-slate-600 font-normal gap-1'
												onClick={() =>
													append({
														goodsId: null,
														qty: null,
														price: null,
														type: 'in',
													})
												}
											>
												<Plus
													size={14}
													strokeWidth={2}
													className='text-slate-500'
												/>
												Tambah Item
											</Button>
										</div>
									)}
								</div>
							))}

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-4 mt-4 border-t border-line border-dashed'>
								<div className='flex flex-col gap-3'>
									<FormLabel>Supplier</FormLabel>
									<SelectV1
										name='supplierId'
										placeholder='Pilih supplier'
										preview={(val) => (
											<span>
												{
													suppliers?.find((s: any) => s.id === Number(val))
														?.name
												}
											</span>
										)}
									>
										{suppliers?.map((item: any) => (
											<CommandItem
												key={item.id}
												value={item.id.toString()}
												onSelect={(value) => {
													form.setValue('supplierId', Number(value))
												}}
											>
												<span>{item.name}</span>
											</CommandItem>
										))}
									</SelectV1>
								</div>

								<FormField
									label='Tanggal'
									control={form.control}
									name='date'
									render={({ field }) => (
										<Input type='date' {...field} className='block' />
									)}
								/>
							</div>
						</ModalContainer>
					</form>
				</Form>
			</Modal>

			<Tour steps={steps} name='manage-stock' />
		</>
	)
}

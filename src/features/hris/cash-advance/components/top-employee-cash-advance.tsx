import { Check, ChevronsUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/common/data-table'
import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { months, MONTHS_OBJ } from '@/shared/constants/months'
import { formatToRupiah } from '@/shared/utils/formatCurrency'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

const data = [
	{
		fullname: 'Bambang',
		position: 'Tukang',
		total: 5000000,
	},
	{
		fullname: 'Saepudin',
		position: 'Tukang',
		total: 5000000,
	},
	{
		fullname: 'Hendra',
		position: 'Tukang',
		total: 5000000,
	},
	{
		fullname: 'Bambang',
		position: 'Tukang',
		total: 5000000,
	},
	{
		fullname: 'Bambang',
		position: 'Tukang',
		total: 5000000,
	},
]

export default function TopEmployeeCashAdvance() {
	const { month } = useCurrentDate()

	const [CurrMonth, setCurrMonth] = useState(month)

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'fullname',
			header: 'Nama lengkap',
		},
		{
			accessorKey: 'position',
			header: 'Jabatan',
		},
		{
			accessorKey: 'total',
			header: 'Total',
			cell: ({ row }) => formatToRupiah(row.original.total),
		},
	]

	return (
		<Card className='p-6 col-span-1 lg:col-span-2'>
			<div className='flex justify-between items-center'>
				<CardTitle className='text-ink-secondary text-sm lg:text-base font-normal'>
					Top 5 Pegawai dengan jumlah kasbon terbanyak
				</CardTitle>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							className='w-[200px] justify-between font-medium text-ink-secondary'
						>
							{MONTHS_OBJ[CurrMonth - 1]}
							<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[200px] p-0'>
						<Command>
							<CommandInput placeholder='Cari bulan...' />
							<CommandList>
								<CommandEmpty>No framework found.</CommandEmpty>
								<CommandGroup>
									{months.map((i) => (
										<CommandItem
											key={i.value}
											value={String((i.value as number) + 1)}
											onSelect={(e) => {
												const value = Number(e)
												setCurrMonth(value)
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													CurrMonth === (i.value as number) + 1
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{i.name}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
			<CardContent className='p-0 pt-4'>
				<DataTable
					columns={columns}
					data={data}
					variant='rounded-bordered'
					style={{ footer: 'hidden' }}
				/>
			</CardContent>
		</Card>
	)
}

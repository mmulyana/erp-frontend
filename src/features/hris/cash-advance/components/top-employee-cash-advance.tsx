import { Check, ChevronsUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { months } from '@/shared/constants/months'
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
import { DataTable } from '@/shared/components/data-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'
import { formatToRupiah } from '@/shared/utils/formatCurrency'

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
	const [month, setMonth] = useState(0)

	const columns: ColumnDef<any>[] = [
		{
			id: 'fullname',
			header: 'Nama lengkap',
			accessorKey: 'fullname',
		},
		{
			id: 'position',
			header: 'Jabatan',
			accessorKey: 'position',
		},
		{
			id: 'total',
			header: 'Total',
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
							{month ? months.find((i) => i.value === month)?.name : ''}
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
											value={String(i.value)}
											onSelect={(e) => {
												const value = Number(e)
												setMonth(value)
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													month === i.value ? 'opacity-100' : 'opacity-0'
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
				<div className='rounded-xl border border-border overflow-hidden'>
					<Table>
						<TableHeader>
							<TableRow className='bg-surface'>
								<TableHead>Nama lengkap</TableHead>
								<TableHead>Jabatan</TableHead>
								<TableHead>Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((i, index) => (
								<TableRow
									key={index}
									className={index % 2 === 1 ? 'bg-surface' : ''}
								>
									<TableCell>{i.fullname}</TableCell>
									<TableCell>{i.position}</TableCell>
									<TableCell>{formatToRupiah(i.total)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}

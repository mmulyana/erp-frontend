import { useNavigate } from 'react-router-dom'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Pagination } from './component'
import LoadingState from '../../../components/common/loading-state'
import EmptyState from '../../../components/common/empty-state'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	isLoading?: boolean
	withPagination?: boolean
	totalPages?: number
	styleFooter?: string
	onCellClick?: (row: TData) => void
	redirectField?: string
	autoRedirect?: boolean
	clickableColumns?: string[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	withPagination,
	totalPages,
	styleFooter,
	onCellClick,
	redirectField,
	autoRedirect = false,
	clickableColumns = [],
}: DataTableProps<TData, TValue>) {
	const navigate = useNavigate()
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const isColumnClickable = (columnId: string) => {
		return clickableColumns.length === 0 || clickableColumns.includes(columnId)
	}

	const handleCellClick = (row: TData, columnId: string) => {
		if (!isColumnClickable(columnId) || !autoRedirect) return

		if (redirectField && row[redirectField as keyof TData]) {
			navigate(row[redirectField as keyof TData] as string)
		} else if (onCellClick) {
			onCellClick(row)
		}
	}

	const renderTableBody = () => {
		if (isLoading) {
			return (
				<TableRow className='h-28 py-0 w-fit relative'>
					<TableCell colSpan={columns.length} className='p-0'>
						<LoadingState />
					</TableCell>
				</TableRow>
			)
		}
		if (table.getRowModel().rows?.length) {
			return table.getRowModel().rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && 'selected'}
					className='h-10 py-0'
				>
					{row.getVisibleCells().map((cell, index) => (
						<TableCell
							key={cell.id}
							className={cn(
								'text-dark/70 font-normal text-sm h-10 py-0',
								index !== 0 &&
									index !== row.getVisibleCells().length - 1 &&
									'border-l border-line',
								isColumnClickable(cell.column.id) &&
									autoRedirect &&
									'cursor-pointer hover:bg-gray-50'
							)}
							onClick={() => handleCellClick(row.original, cell.column.id)}
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))
		}

		return (
			<TableRow>
				<TableCell colSpan={columns.length} className='h-fit py-4 text-center'>
					<EmptyState />
				</TableCell>
			</TableRow>
		)
	}

	return (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader className='border-y border-line'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header, index) => (
								<TableHead
									key={header.id}
									className={cn(
										'text-ink-secondary bg-surface font-normal text-sm h-9',
										index !== 0 &&
											index !== headerGroup.headers.length &&
											'border-l border-line'
									)}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className='relative'>{renderTableBody()}</TableBody>
			</Table>
			<div
				className={cn(
					'bg-[#F9FAFB] px-3 border-y border-line w-full h-12 flex justify-between items-center',
					styleFooter
				)}
			>
				{!!withPagination && !isLoading && (
					<Pagination totalPages={totalPages ?? 1} />
				)}
			</div>
		</div>
	)
}

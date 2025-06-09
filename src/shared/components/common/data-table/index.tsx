import { useNavigate } from 'react-router-dom'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { cn } from '@/shared/utils/cn'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table'
import LoadingState from '../loading-state'
import EmptyState from '../empty-state'

import { Pagination } from './component'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	isLoading?: boolean
	withPagination?: boolean
	totalPages?: number
	totalItems?: number
	onCellClick?: (row: TData) => void
	redirectField?: string
	autoRedirect?: boolean
	nonClickableColumns?: string[]
	style?: {
		header?: string
		footer?: string
		stripRowColor?: string
	}
	variant?: 'default' | 'rounded-bordered'
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	withPagination,
	totalPages,
	totalItems,
	onCellClick,
	redirectField,
	autoRedirect = false,
	nonClickableColumns = [],
	style,
	variant = 'default',
}: DataTableProps<TData, TValue>) {
	const navigate = useNavigate()
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const isColumnClickable = (columnId: string) => {
		return !nonClickableColumns.includes(columnId)
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
			return table.getRowModel().rows.map((row, rowIndex) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && 'selected'}
					className={cn(
						'h-10 py-0 border-none transition-colors hover:bg-ink-primary/5',
						rowIndex % 2 === 1 && (style?.stripRowColor || 'bg-[#FAFAFA]')
					)}
				>
					{row.getVisibleCells().map((cell) => (
						<TableCell
							key={cell.id}
							className={cn(
								'text-ink-primary/80 font-normal text-sm h-10 py-0 '
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
		<div
			className={cn(
				'max-w-[calc(100vw-104px)] md:max-w-full',
				variant === 'rounded-bordered' && 'rounded-xl border'
			)}
		>
			<Table>
				<TableHeader
					className={cn(variant === 'rounded-bordered' && 'border-none')}
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className='border-none'>
							{headerGroup.headers.map((header, index) => (
								<TableHead
									key={header.id}
									className={cn(
										'text-ink-primary bg-[#F7F7F7] font-normal text-sm h-9',
										index === 0 && 'rounded-l-md',
										index === headerGroup.headers.length - 1 && 'rounded-r-md',
										style?.header
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
					'w-full flex justify-between items-center h-fit',
					style?.footer,
					variant === 'rounded-bordered' && 'border-b-0'
				)}
			>
				{!!withPagination && !isLoading && (
					<Pagination
						totalItems={totalItems || 0}
						totalPages={totalPages || 0}
					/>
				)}
			</div>
		</div>
	)
}

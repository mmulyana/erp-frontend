import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pagination } from './component'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  withLoading?: boolean
  withPagination?: boolean
  totalPages?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  withLoading = false,
  withPagination,
  totalPages
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const renderSkeletonRows = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {columns.map((_, cellIndex) => (
            <TableCell key={`skeleton-cell-${cellIndex}`}>
              <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
            </TableCell>
          ))}
        </TableRow>
      ))
  }

  const renderTableBody = () => {
    if (withLoading && isLoading) {
      return renderSkeletonRows()
    }

    if (table.getRowModel().rows?.length) {
      return table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className='text-[#313951] text-sm'>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className='h-24 text-center'>
          No results.
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='rounded-md border overflow-hidden'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className='bg-[#F9FAFB] text-[#747C94] text-sm font-medium'
                >
                  {withLoading && isLoading ? (
                    <div className='h-4 w-full bg-gray-200 rounded animate-pulse'></div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
      <div className='bg-[#F9FAFB] py-2 px-3 border-t w-full min-h-12 flex justify-between items-center'>
        {!!withPagination && <Pagination totalPages={totalPages ?? 1} />}
      </div>
    </div>
  )
}

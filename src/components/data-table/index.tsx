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
import { cn } from '@/utils/cn'

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
  totalPages,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const renderTableBody = () => {
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
                  'border-l border-line'
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className='h-10 text-center'>
          No results.
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
                    'text-[#313951] font-normal text-sm h-9',
                    index !== 0 &&
                      index !== headerGroup.headers.length - 1 &&
                      'border-l border-line'
                  )}
                  style={{
                    width: `${header.column.columnDef.size}px`,
                    // minWidth: `${header.column.columnDef.size}px`,
                    // maxWidth: `${header.column.columnDef.size}px`,
                  }}
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
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
      <div className='bg-[#F9FAFB] px-3 border-y border-line w-full h-12 flex justify-between items-center'>
        {!!withPagination && <Pagination totalPages={totalPages ?? 1} />}
      </div>
    </div>
  )
}

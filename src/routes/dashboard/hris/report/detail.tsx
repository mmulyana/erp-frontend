import { format, parseISO, isSunday } from 'date-fns'
import useUrlState from '@ahooksjs/use-url-state'
import { useParams } from 'react-router-dom'
import { id as ind } from 'date-fns/locale'
import { toast } from 'sonner'
import React from 'react'

import { useDetailRecap, useRecapReport } from '@/hooks/api/use-recap'
import { useApiData } from '@/hooks/use-api-data'

import { formatToRupiah } from '@/utils/formatCurrency'
import { URLS } from '@/utils/constant/_urls'
import { cn } from '@/utils/cn'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DashboardLayout } from '../../_component/layout'

const TableSkeleton = () => (
  <div className='space-y-4'>
    <div className='h-10 w-[180px] bg-gray-200 rounded animate-pulse' />
    <div className='border rounded-lg'>
      <div className='h-20 bg-gray-100 rounded-t-lg' />
      <div className='space-y-2 p-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-12 bg-gray-200 rounded animate-pulse' />
        ))}
      </div>
    </div>
  </div>
)

export default function Detail() {
  const { id } = useParams()
  const [url, _] = useUrlState({ page: '', limit: '' })

  const { data: detail } = useApiData(
    useDetailRecap({ id: Number(id), enabled: true })
  )

  const { data, isLoading } = useApiData(
    useRecapReport({ id: Number(id), limit: url.limit, page: url.page })
  )

  const handleExport = async () => {
    try {
      const response = await fetch(`${URLS.RECAP}/${id}/report/export`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      // Create blob from response and trigger download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${detail?.name}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading excel:', error)
      toast.error('Error mendownload Excel silahkan coba lagi')
    }
  }

  return (
    <DashboardLayout className='overflow-hidden'>
      <div className='overflow-hidden w-full'>
        <div className='bg-[#F9FAFB] py-2 px-4 flex gap-4 items-center justify-end'>
          <Button onClick={handleExport}>Export</Button>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table className='border-y w-full'>
            <TableHeader className='bg-[#F9FAFB]'>
              <TableRow>
                <TableHead className='min-w-[160px] max-w-[180px] w-[170px] sticky top-0 left-0 bg-[#F9FAFB] z-20 border-r '>
                  Name
                </TableHead>
                {data?.dates?.map((date, index) => {
                  const parsedDate = parseISO(date)
                  const isWeekend = isSunday(parsedDate)

                  return (
                    <TableHead
                      key={index}
                      colSpan={2}
                      className={cn(
                        'text-center border px-1',
                        'min-w-14',
                        isWeekend && 'bg-red-300 hover:bg-red-400'
                      )}
                    >
                      <p className='text-xs text-[#313951]/50'>
                        {format(parsedDate, 'EE', { locale: ind })}
                      </p>
                      <p className='text-sm text-[#313951]'>
                        {format(parsedDate, 'd')}
                      </p>
                    </TableHead>
                  )
                })}
                <TableHead colSpan={2} className='text-center w-14 border-r'>
                  <p>Jumlah</p>
                </TableHead>
                <TableHead className='text-center border-r' colSpan={2}>
                  <p>Gaji</p>
                </TableHead>
                <TableHead
                  className='text-center border-r'
                  colSpan={2}
                  rowSpan={2}
                >
                  <p>Subtotal</p>
                </TableHead>
                <TableHead className='text-center border-r' rowSpan={2}>
                  <p>Kasbon</p>
                </TableHead>
                <TableHead className='text-center' rowSpan={2}>
                  <p>Total</p>
                </TableHead>
              </TableRow>
              <TableRow>
                <TableCell className='sticky left-0 bg-[#F9FAFB] z-20'></TableCell>
                {data?.dates?.map((date, index) => {
                  const parsedDate = parseISO(date)
                  const isWeekend = isSunday(parsedDate)

                  return (
                    <React.Fragment key={index}>
                      <TableCell
                        className={cn(
                          'border px-0 min-w-7 text-center text-sm',
                          isWeekend && 'bg-red-300 hover:bg-red-400'
                        )}
                      >
                        H
                      </TableCell>
                      <TableCell
                        className={cn(
                          'border px-0 min-w-7 text-center text-sm',
                          isWeekend && 'bg-red-300 hover:bg-red-400'
                        )}
                      >
                        J
                      </TableCell>
                    </React.Fragment>
                  )
                })}
                <TableCell className='border max-w-7 text-sm'>H</TableCell>
                <TableCell className='border max-w-7 text-sm'>J</TableCell>
                <TableCell className='border text-sm'>Harian</TableCell>
                <TableCell className='border text-sm'>Jam</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((employee) => {
                return (
                  <TableRow key={employee.employeeId}>
                    <TableCell className='sticky left-0 top-0 p-0 bg-white z-20 py-0'>
                      <div className='w-full min-h-full pl-4 flex items-start truncate flex-col h-full bg-white border-r py-2'>
                        <span className='truncate'>{employee.fullname}</span>
                        <span className='text-xs text-gray-500 whitespace-nowrap'>
                          ({employee.position})
                        </span>
                      </div>
                    </TableCell>
                    {data?.dates?.map((date, index) => {
                      const attendance = employee?.attendance?.[index]
                      const overtime = employee?.overtime?.[index]
                      const parsedDate = parseISO(date)
                      const isWeekend = isSunday(parsedDate)

                      return (
                        <React.Fragment key={index}>
                          <TableCell
                            className={cn(
                              'text-center border hover:bg-blue-100 px-0 text-sm',
                              isWeekend && 'bg-red-300 hover:bg-red-400'
                            )}
                          >
                            {attendance ? attendance.total_hour : ''}
                          </TableCell>
                          <TableCell
                            className={cn(
                              'text-center border hover:bg-blue-100 px-0 text-sm',
                              isWeekend && 'bg-red-300 hover:bg-red-400'
                            )}
                          >
                            {overtime ? overtime.total_hour : ''}
                          </TableCell>
                        </React.Fragment>
                      )
                    })}
                    <TableCell className='border text-center text-sm'>
                      {employee.attendanceTotal}
                    </TableCell>
                    <TableCell className='border text-center text-sm'>
                      {employee.overtimeTotal}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.basic_salary)}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.overtime_salary)}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.attendanceFee)}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.overtimeFee)}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.totalCashAdvace)}
                    </TableCell>
                    <TableCell className='border text-sm text-right'>
                      {formatToRupiah(employee.total)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  )
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { data, dates } from '../data'
import { format, isEqual, isSunday, parseISO } from 'date-fns'
import { cn } from '@/utils/cn'
import React, { useId } from 'react'
import {
  Breadcrumb,
  Container,
  DashboardLayout,
  useTitle,
} from '@/routes/dashboard/component'
import { PATH } from '@/utils/constant/_paths'
import { id } from 'date-fns/locale'
import Search from '@/components/common/search'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Absensi',
    href: PATH.EMPLOYEE_ATTENDANCE,
  },
  {
    name: 'Rekapan',
    href: PATH.EMPLOYEE_ATTENDANCE_SUMMARY,
  },
]

export default function TableDemo() {
  useTitle('Absensi')

  return (
    <DashboardLayout>
      <Container className='space-y-4'>
        <Breadcrumb links={links} />

        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-4'>
            <div className='max-w-[180px]'>
              <Search />
            </div>
          </div>
        </div>

        <Table className='border'>
          <TableHeader className='bg-[#F9FAFB]'>
            <TableRow>
              <TableHead className='min-w-[200px]'></TableHead>
              {dates.map((d, index) => {
                return (
                  <TableHead
                    key={index}
                    colSpan={2}
                    className={cn('text-center border')}
                  >
                    <p className='text-xs text-[#313951]/50'>
                      {format(d.date, 'EE', { locale: id })}
                    </p>
                    <p className='text-sm text-[#313951]'>
                      {format(d.date, 'd')}
                    </p>
                  </TableHead>
                )
              })}
              <TableHead colSpan={2} className='text-center'>
                <p>Jumlah</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              {dates.map((d, index) => {
                const dateParse = parseISO(d.date)
                const isWeekend = isSunday(dateParse)

                return (
                  <React.Fragment key={index}>
                    <TableCell
                      className={cn('border min-w-8', isWeekend && 'bg-red-400')}
                    >
                      H
                    </TableCell>
                    <TableCell
                      className={cn('border min-w-8', isWeekend && 'bg-red-400')}
                    >
                      J
                    </TableCell>
                  </React.Fragment>
                )
              })}
              <TableCell className='border'>Hari</TableCell>
              <TableCell className='border'>Jam</TableCell>
            </TableRow>
            {data.map((d) => (
              <React.Fragment key={d.id}>
                <TableRow>
                  <TableCell className='font-medium sticky left-0 bg-[#F9FAFB]'>
                    {d.name}
                  </TableCell>
                  <TableCell colSpan={34} className='bg-[#F9FAFB]'></TableCell>
                </TableRow>
                {!!d.employees?.length &&
                  d?.employees.map((emp) => {
                    const attendanceHours =
                      !!emp.attendances?.length &&
                      emp?.attendances?.reduce(
                        (sum, attendance) => sum + attendance.total_hour,
                        0
                      )
                    const overtimeHours =
                      !!emp.overtime?.length &&
                      emp.overtime.reduce(
                        (sum, overtime) => sum + overtime.total_hour,
                        0
                      )

                    return (
                      <TableRow key={emp.id}>
                        <TableCell className='sticky left-0 p-0 h-8 bg-white z-10'>
                          <div className='w-full min-h-full bg-white border-r flex pl-4 items-center'>
                            {emp.fullname}
                          </div>
                        </TableCell>
                        {dates.map((date) => {
                          const id = useId()
                          const attendance = emp.attendances?.find((att) =>
                            isEqual(parseISO(att.date), parseISO(date.date))
                          )
                          const overtime = emp.overtime?.find((att) =>
                            isEqual(parseISO(att.date), parseISO(date.date))
                          )
                          const dateParse = parseISO(date.date)
                          const isWeekend = isSunday(dateParse)

                          return (
                            <React.Fragment key={id}>
                              <TableCell
                                className={cn(
                                  'text-center border hover:bg-blue-100',
                                  isWeekend && 'bg-red-400 hover:bg-red-300'
                                )}
                              >
                                {attendance ? attendance.total_hour : ''}
                              </TableCell>
                              <TableCell
                                className={cn(
                                  'text-center border hover:bg-blue-100',
                                  isWeekend && 'bg-red-400 hover:bg-red-300'
                                )}
                              >
                                {overtime ? overtime.total_hour : ''}
                              </TableCell>
                            </React.Fragment>
                          )
                        })}
                        <TableCell className='border text-center'>{attendanceHours}</TableCell>
                        <TableCell className='border text-center'>{overtimeHours}</TableCell>
                      </TableRow>
                    )
                  })}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Container>
    </DashboardLayout>
  )
}

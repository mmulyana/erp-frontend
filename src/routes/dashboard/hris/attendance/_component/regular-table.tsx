import { endOfWeek, format, getWeek, setWeek, startOfWeek } from 'date-fns'
import { Check, MinusIcon, PlusIcon, X } from 'lucide-react'
import { id } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  useAttendances,
  useCreateAttendance,
  useUpdateAttendance,
} from '@/hooks/api/use-attendance'
import { useApiData } from '@/hooks/use-api-data'

import { Attendance } from '@/utils/types/api'
import { cn } from '@/utils/cn'
import useUrlState from '@ahooksjs/use-url-state'
import EmptyState from '@/components/common/empty-state'

export default function RegularTable() {
  const { mutate: create } = useCreateAttendance()
  const { mutate: update } = useUpdateAttendance()

  const [url] = useUrlState({ week: '', name: '' })

  const weekNumber = getWeek(new Date())
  const week = getWeekDates(url.week !== '' ? Number(url.week) : weekNumber)
  const dateRange = generateDateRange(week.startDate, week.endDate)

  const { data } = useApiData(
    useAttendances({
      date: format(week.startDate, 'yyyy-MM-dd'),
      endDate: format(week.endDate, 'yyyy-MM-dd'),
      name: url.name,
    })
  )

  return (
    <div>
      <Table className='w-full border'>
        <TableHeader className='border-b'>
          <TableRow className='border-none'>
            <TableHead className='min-w-[160px] max-w-[180px] w-[170px] sticky top-0 left-0 z-20'>
              Nama
            </TableHead>
            {dateRange.map((item, index) => (
              <TableHead key={index} className='bg-gray-100 border'>
                <div className='flex flex-col items-center'>
                  <p className='text-xs text-[#313951]/50'>
                    {format(item, 'EE', { locale: id })}
                  </p>
                  <p className='text-sm text-[#313951]'>{format(item, 'd')}</p>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length ? (
            data?.map((item, index) =>
              item?.employees?.map((employee: any) => (
                <TableRow key={`employee-${index}-${employee.id}`}>
                  <TableCell>
                    <p className='text-dark font-medium'>
                      {employee.fullname}{' '}
                      <span className='text-dark/50 font-normal'>
                        ({item.name})
                      </span>
                    </p>
                  </TableCell>
                  {employee.attendances.map(
                    (att: Attendance | null, attIndex: number) => {
                      const isPresence =
                        (att && att.type === 'presence') || false
                      const isAbsent = (att && att.type === 'absent') || false
                      const total_hour = (att && att.total_hour) || 0

                      return (
                        <TableCell
                          className='border p-0'
                          key={`attendance-${index}-${employee.id}-${attIndex}`}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className='flex items-center justify-center min-h-12 cursor-pointer'>
                                {att && (
                                  <>
                                    {att.type === 'presence' ? (
                                      <Check
                                        size={18}
                                        className='text-green-primary'
                                      />
                                    ) : (
                                      <X
                                        size={18}
                                        className='text-red-primary'
                                      />
                                    )}
                                  </>
                                )}
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-white p-2 rounded-xl shadow-lg shadow-gray-100 border'>
                              <div className='grid grid-cols-2 gap-2'>
                                <Button
                                  variant='outline'
                                  className={cn(
                                    'border py-2 md:py-1 px-3 md:px-2 border-line flex justify-center items-center gap-1 w-full flex-nowrap rounded-full',
                                    isPresence &&
                                      'bg-green-primary border-green-primary hover:bg-green-primary/90 text-white'
                                  )}
                                  onClick={() => {
                                    if (isPresence) return

                                    if (isAbsent) {
                                      if (!att) return
                                      update({
                                        id: att?.id,
                                        payload: {
                                          total_hour: 1,
                                          type: 'presence',
                                          date: format(
                                            dateRange[attIndex],
                                            'yyyy-MM-dd'
                                          ),
                                        },
                                      })
                                      return
                                    }
                                    create({
                                      date: format(
                                        dateRange[attIndex],
                                        'yyyy-MM-dd'
                                      ),
                                      employeeId: employee.id,
                                      total_hour: 1,
                                      type: 'presence',
                                    })
                                  }}
                                >
                                  <Check
                                    size={14}
                                    strokeWidth={4}
                                    className={cn(
                                      att?.type === 'presence'
                                        ? 'text-white'
                                        : 'text-green-primary'
                                    )}
                                  />
                                  <p
                                    className={cn(
                                      'text-dark text-sm',
                                      isPresence && ' text-white'
                                    )}
                                  >
                                    Hadir
                                  </p>
                                </Button>
                                <Button
                                  variant='outline'
                                  className={cn(
                                    'border py-2 px-3 md:px-2 md:py-1 border-line flex justify-center items-center gap-1 w-full flex-nowrap rounded-full',
                                    isAbsent &&
                                      'bg-[#C95F61] hover:bg-[#C95F61]/90 border-[#C95F61]'
                                  )}
                                  onClick={() => {
                                    if (isAbsent) return

                                    if (isPresence) {
                                      if (!att) return
                                      update({
                                        id: att?.id,
                                        payload: {
                                          total_hour: 0,
                                          type: 'absent',
                                          date: format(
                                            dateRange[attIndex],
                                            'yyyy-MM-dd'
                                          ),
                                        },
                                      })
                                      return
                                    }
                                    create({
                                      date: format(
                                        dateRange[attIndex],
                                        'yyyy-MM-dd'
                                      ),
                                      employeeId: employee.id,
                                      total_hour: 0,
                                      type: 'absent',
                                    })
                                  }}
                                >
                                  <X
                                    size={14}
                                    strokeWidth={3}
                                    className={cn(
                                      att?.type === 'absent'
                                        ? 'text-white'
                                        : 'text-red-primary'
                                    )}
                                  />
                                  <p
                                    className={cn(
                                      'text-dark text-sm',
                                      isAbsent && ' text-white'
                                    )}
                                  >
                                    Absen
                                  </p>
                                </Button>
                              </div>
                              {isPresence && (
                                <div className='h-12 flex items-center gap-4 mt-2'>
                                  <p className='text-dark text-sm'>
                                    Jumlah hari
                                  </p>
                                  <div className='p-1 rounded-full bg-[#E3E5E9] flex justify-between items-center gap-1'>
                                    <button
                                      disabled={total_hour === 1}
                                      className='h-[30px] w-[30px] rounded-full flex items-center justify-center'
                                      onClick={() => {
                                        if (!att) return

                                        update({
                                          id: att.id,
                                          payload: {
                                            total_hour: total_hour - 1,
                                            type: 'presence',
                                          },
                                        })
                                      }}
                                    >
                                      <MinusIcon className='w-4 h-4 text-[#7B8496] stroke-[3px]' />
                                    </button>
                                    <div className='h-[30px] w-[30px] rounded-full bg-white flex items-center justify-center text-sm text-dark'>
                                      {total_hour}
                                    </div>
                                    <button
                                      className='h-[30px] w-[30px] rounded-full flex items-center justify-center'
                                      onClick={() => {
                                        if (!att) return

                                        update({
                                          id: att.id,
                                          payload: {
                                            total_hour: total_hour + 1,
                                            type: 'presence',
                                          },
                                        })
                                      }}
                                    >
                                      <PlusIcon className='w-4 h-4 text-[#7B8496] stroke-[3px]' />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )
                    }
                  )}
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                <div className='flex justify-center'>
                  <EmptyState />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const getWeekDates = (weekNumber: number) => {
  const dateInWeek = setWeek(new Date(), weekNumber, { weekStartsOn: 1 })
  const startDate = startOfWeek(dateInWeek, { weekStartsOn: 1 })
  const endDate = endOfWeek(dateInWeek, { weekStartsOn: 1 })

  return { startDate, endDate }
}
export const generateDateRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = []
  const currentDate = new Date(startDate)
  const lastDate = new Date(endDate)

  currentDate.setHours(17, 0, 0, 0)
  lastDate.setHours(17, 0, 0, 0)

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString())
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

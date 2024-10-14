import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAttendances, useCreateAttendance } from '@/hooks/api/use-attendance'
import { cn } from '@/utils/cn'
import useUrlState from '@ahooksjs/use-url-state'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarDaysIcon, CheckIcon, XIcon } from 'lucide-react'
import { useMemo } from 'react'

export function Regular() {
  const [url, setUrl] = useUrlState({ name: '', date: '' })
  const { mutate } = useCreateAttendance()

  const {
    data: employees,
    isLoading,
    isFetching,
  } = useAttendances({
    name: url.name,
    ...(url.date !== ''
      ? {
          date: format(parse(url.date, 'dd-MM-yyyy', new Date()), 'dd-MM-yyyy'),
        }
      : undefined),
  })
  const data = useMemo(
    () => employees?.data.data || [],
    [isLoading, isFetching]
  )

  return (
    <div className='bg-[#F9FAFB] p-4 h-[calc(100vh-141px)]'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-fit pl-3 gap-2 text-left font-normal text-dark'
                )}
              >
                <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
                {url.date ? (
                  format(
                    parse(url.date, 'dd-MM-yyyy', new Date()),
                    'EEEE, dd MMM yyyy',
                    {
                      locale: id,
                    }
                  )
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={
                  url.date
                    ? parse(url.date, 'dd-MM-yyyy', new Date())
                    : undefined
                }
                onSelect={(val) => {
                  const originalDate = new Date(val as Date)
                  const formattedDate = format(originalDate, 'dd-MM-yyyy')
                  setUrl((prev) => ({ ...prev, date: formattedDate }))
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('2024-01-01')
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {!!data.length &&
          data?.map((item: any) => (
            <div
              key={'employee-' + item.id}
              className='bg-white w-full h-fit pb-3 px-3 pt-6 flex flex-col items-center border border-line hover:shadow-lg'
            >
              <img
                src={item.photo}
                className='w-20 h-20 rounded-full border'
              ></img>
              <p className='mt-4 text-dark'>{item.fullname}</p>
              <div className='mt-6 grid grid-cols-2 gap-3.5 w-full'>
                <button
                  className={cn(
                    'border py-3 border-line flex justify-center items-center gap-2 w-full flex-nowrap',
                    item.attendances.length &&
                      item.attendances[0].type == 'presence' &&
                      'bg-green-primary border-green-primary text-white'
                  )}
                  onClick={() => {
                    mutate({
                      date:
                        url.date !== ''
                          ? url.date
                          : format(new Date(), 'dd-MM-yyyy'),
                      employeeId: item.id,
                      total_hour: 1,
                      type: 'presence',
                    })
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'w-4 h-4 text-green-primary stroke-[3px]',
                      item.attendances.length &&
                        item.attendances[0].type == 'presence' &&
                        ' text-white'
                    )}
                  />
                  <p
                    className={cn(
                      'text-dark text-sm',
                      item.attendances.length &&
                        item.attendances[0].type == 'presence' &&
                        ' text-white'
                    )}
                  >
                    Hadir
                  </p>
                </button>
                <button
                  className={cn(
                    'border py-3 border-line flex justify-center items-center gap-2 w-full flex-nowrap',
                    item.attendances.length &&
                      item.attendances[0].type == 'absent' &&
                      'bg-[#C95F61] border-[#C95F61]'
                  )}
                  onClick={() => {
                    mutate({
                      date:
                        url.date !== ''
                          ? url.date
                          : format(new Date(), 'dd-MM-yyyy'),
                      employeeId: item.id,
                      total_hour: 0,
                      type: 'absent',
                    })
                  }}
                >
                  <XIcon
                    className={cn(
                      'w-4 h-4 text-[#C95F61] stroke-[3px]',
                      item.attendances.length &&
                        item.attendances[0].type == 'absent' &&
                        ' text-white'
                    )}
                  />
                  <p
                    className={cn(
                      'text-dark text-sm',
                      item.attendances.length &&
                        item.attendances[0].type == 'absent' &&
                        ' text-white'
                    )}
                  >
                    Tdk. Hadir
                  </p>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  useAttendances,
  useCreateAttendance,
  useUpdateAttendance,
} from '@/hooks/api/use-attendance'
import { cn } from '@/utils/cn'
import useUrlState from '@ahooksjs/use-url-state'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  CalendarDaysIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from 'lucide-react'
import { useMemo } from 'react'

export function Regular() {
  const [url, setUrl] = useUrlState({ name: '', date: '' })
  const { mutate: create } = useCreateAttendance()
  const { mutate: update } = useUpdateAttendance()

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
    <div className='bg-[#F9FAFB] p-4 min-h-[calc(100vh-141px)] pb-14'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <Search />
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
      <div>
        {!!data?.length &&
          data?.map((position: any) => (
            <div key={`position-${position.id}`}>
              <p className='text-dark mb-4'>{position.name}</p>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                {position?.employees?.map((item: any) => {
                  const isPresence =
                    !!item.attendances &&
                    item.attendances.length &&
                    item.attendances[0].type == 'presence'
                  const isAbsent =
                    !!item.attendances &&
                    item.attendances.length &&
                    item.attendances[0].type == 'absent'
                  const totalHour = !!item.attendances
                    ? item.attendances[0].total_hour
                    : null
                  return (
                    <div
                      key={'employee-' + item.id}
                      className='bg-white w-full h-fit pb-3 px-3 pt-6 flex flex-col items-center border border-line group relative hover:z-20 hover:shadow-lg'
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
                            isPresence &&
                              'bg-green-primary border-green-primary text-white'
                          )}
                          onClick={() => {
                            if (isAbsent) {
                              update({
                                id: item.attendances[0].id,
                                payload: {
                                  total_hour: 1,
                                  type: 'presence',
                                  date:
                                    url.date !== ''
                                      ? url.date
                                      : format(new Date(), 'dd-MM-yyyy'),
                                },
                              })
                              return
                            }
                            create({
                              date:
                                url.date !== ''
                                  ? url.date
                                  : format(new Date(), 'dd-MM-yyyy'),
                              employeeId: item.id,
                              total_hour: 1,
                              type: 'presence',
                            })
                          }}
                          disabled={isPresence}
                        >
                          <CheckIcon
                            className={cn(
                              'w-4 h-4 text-green-primary stroke-[3px]',
                              isPresence && ' text-white'
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
                        </button>
                        <button
                          className={cn(
                            'border py-3 border-line flex justify-center items-center gap-2 w-full flex-nowrap',
                            isAbsent && 'bg-[#C95F61] border-[#C95F61]'
                          )}
                          disabled={isAbsent}
                          onClick={() => {
                            if (isPresence) {
                              update({
                                id: item.attendances[0].id,
                                payload: {
                                  total_hour: 0,
                                  type: 'absent',
                                  date:
                                    url.date !== ''
                                      ? url.date
                                      : format(new Date(), 'dd-MM-yyyy'),
                                },
                              })
                              return
                            }
                            create({
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
                              isAbsent && ' text-white'
                            )}
                          />
                          <p
                            className={cn(
                              'text-dark text-sm',
                              isAbsent && ' text-white'
                            )}
                          >
                            Tdk. Hadir
                          </p>
                        </button>
                      </div>
                      {isPresence && (
                        <div className='-z-10 duration-150 group-hover:z-10 w-full h-12 absolute bottom-0 left-0 group-hover:bg-line translate-y-0 group-hover:translate-y-full flex items-center justify-center gap-4'>
                          <p className='text-dark text-sm'>Jumlah hari</p>
                          <div className='py-[1px] px-1 rounded-full bg-[#E3E5E9] flex justify-between items-center gap-1'>
                            <button
                              disabled={totalHour === 1}
                              onClick={() => {
                                update({
                                  id: item.attendances[0].id,
                                  payload: {
                                    total_hour: totalHour - 1,
                                    type: 'presence',
                                  },
                                })
                              }}
                            >
                              <MinusIcon className='w-4 h-4 text-[#7B8496] stroke-[3px]' />
                            </button>
                            <div className='h-[30px] w-[30px] rounded-full bg-white flex items-center justify-center text-sm text-dark'>
                              {totalHour}
                            </div>
                            <button
                              onClick={() => {
                                update({
                                  id: item.attendances[0].id,
                                  payload: {
                                    total_hour: totalHour + 1,
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
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

import useUrlState from '@ahooksjs/use-url-state'
import { format, parse } from 'date-fns'
import { id } from 'date-fns/locale'
import { useMemo } from 'react'

import { BASE_URL } from '@/utils/constant/_urls'
import { cn } from '@/utils/cn'

import {
  useAttendances,
  useCreateAttendance,
  useUpdateAttendance,
} from '@/hooks/api/use-attendance'

import Search from '@/components/common/search'

import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  CalendarDaysIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  X,
} from 'lucide-react'

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
          date: url.date,
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-fit pl-3 gap-2 text-left font-normal text-dark'
                )}
              >
                <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
                {url.date ? (
                  format(
                    parse(url.date, 'yyyy-MM-dd', new Date()),
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
                    ? parse(url.date, 'yyyy-MM-dd', new Date())
                    : undefined
                }
                onSelect={(val) => {
                  if (val) {
                    const formattedDate = format(val, 'yyyy-MM-dd')
                    setUrl((prev) => ({ ...prev, date: formattedDate }))
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('2024-01-01')
                }
              />
            </PopoverContent>
          </Popover>
          {(url.date !== '' || url.name !== '') && (
            <Button
              variant='ghost'
              className='font-normal flex items-center gap-1 relative pl-3 pr-6'
              onClick={() => {
                setUrl({ date: undefined, name: undefined })
              }}
            >
              Hapus filter
              <X
                size={14}
                className='text-red-primary/80 absolute top-[55%] right-1.5 -translate-y-1/2'
              />
            </Button>
          )}
        </div>
      </div>
      <div className='space-y-4'>
        {!!data?.length &&
          data?.map((position: any) => (
            <div key={`position-${position.id}`}>
              <p className='text-dark mb-4 font-medium'>{position.name}</p>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
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
                      className='bg-white w-full h-fit pb-3 px-3 pt-6 flex flex-row md:flex-col items-center border border-line group relative hover:z-20 hover:shadow-lg'
                    >
                      <div className='flex flex-col justify-center items-center'>
                        {item.photo ? (
                          <img
                            src={BASE_URL + '/img/' + item.photo}
                            className='w-10 md:w-20 h-10 md:h-20 rounded-full border object-cover'
                          />
                        ) : (
                          <div className='h-10 md:h-20 w-10 md:w-20 rounded-full bg-dark/5 flex justify-center items-center'>
                            <p className='text-2xl text-dark uppercase'>
                              {item.fullname.at(0)}
                            </p>
                          </div>
                        )}
                        <p className='mt-0 md:mt-4 text-dark'>
                          {item.fullname}
                        </p>
                      </div>

                      <div className='mt-0 md:mt-6 grid grid-cols-2 gap-3.5 w-fit md:w-full ml-auto'>
                        <button
                          className={cn(
                            'border py-2 md:py-1 px-3 md:px-2 border-line flex justify-center items-center gap-2 w-full flex-nowrap rounded-full',
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
                                      : format(new Date(), 'yyyy-MM-dd'),
                                },
                              })
                              return
                            }
                            create({
                              date:
                                url.date !== ''
                                  ? url.date
                                  : format(new Date(), 'yyyy-MM-dd'),
                              employeeId: item.id,
                              total_hour: 1,
                              type: 'presence',
                            })
                          }}
                          disabled={isPresence}
                        >
                          <CheckIcon
                            size={16}
                            className={cn(
                              'text-green-primary stroke-[3px]',
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
                            'border py-2 px-3 md:px-2 md:py-1 border-line flex justify-center items-center gap-2 w-full flex-nowrap rounded-full',
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
                                      : format(new Date(), 'yyyy-MM-dd'),
                                },
                              })
                              return
                            }
                            create({
                              date:
                                url.date !== ''
                                  ? url.date
                                  : format(new Date(), 'yyyy-MM-dd'),
                              employeeId: item.id,
                              total_hour: 0,
                              type: 'absent',
                            })
                          }}
                        >
                          <X
                            size={14}
                            className={cn(
                              'text-[#C95F61] stroke-[3px]',
                              isAbsent && ' text-white'
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

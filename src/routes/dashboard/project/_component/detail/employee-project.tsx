import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Plus, UserCircle, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  useAssigneEmployee,
  useUnassigneEmployee,
} from '@/hooks/api/use-project'
import { useFixPointerEvent } from '@/shared/hooks/use-fix-pointer-events'
import { useAllEmployees } from '@/features/hris/employee/api/use-employee'

import { BASE_URL } from '@/shared/constants/urls'
import { KEYS } from '@/shared/constants/keys'
import { Project } from '@/utils/types/api'
import { socket } from '@/shared/utils/socket'
import { cn } from '@/shared/utils/cn'

import ProtectedComponent from '@/components/protected'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type FormValues = {
  employeeId?: number | null
}
type Props = {
  id: number
  data: Pick<Project, 'employees' | 'leadId'>
  withSocket?: boolean
  permission?: string[]
}
export default function EmployeeProject({
  id: projectId,
  data: { employees, leadId },
  withSocket,
  permission,
}: Props) {
  const queryClient = useQueryClient()

  //   HANDLE SEARCH
  const [search, setSearch] = useState('')
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  useEffect(() => {
    if (!open) setSearch('')
  }, [search])

  // HANDLE OPEN SELECT
  const [open, setOpen] = useState(false)
  useFixPointerEvent(open)

  // HANDLE FORM
  const { mutate: add } = useAssigneEmployee()
  const { mutate: remove } = useUnassigneEmployee()

  const form = useForm<FormValues>({
    defaultValues: {
      employeeId: null,
    },
  })

  const handleSubmit = (data: FormValues) => {
    if (!projectId || !data.employeeId) return

    add(
      { projectId, employeeId: data.employeeId },
      {
        onSuccess: () => {
          form.reset()
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: [KEYS.PROJECT_DETAIL, projectId],
          })
          if (withSocket) socket.emit('request_board')
        },
      }
    )
  }

  //   GET EMPLOYEE
  const { data } = useAllEmployees({ enabled: open })
  const dataEmployees = useMemo(() => data?.data.data || [], [data])

  const filteredEmployees = useMemo(() => {
    const selectedEmployee = employees.map((item) => item.employee.id)

    const availableEmployee = dataEmployees
      .filter((item) => !selectedEmployee.includes(item.id))
      .filter((item) => item.id !== leadId)
    if (!search) {
      return availableEmployee
    }

    return availableEmployee.filter((item) =>
      item.fullname.toLowerCase().includes(search.toLowerCase())
    )
  }, [employees, search, dataEmployees])

  const isAllowed = permission?.includes('project:update')

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full pb-2 border-b border-line flex justify-between items-center'>
        <p className='text-dark/50'>Pegawai</p>
      </div>
      <div className='flex gap-2 items-center flex-wrap'>
        {employees.map(({ employee, id }) => (
          <div
            className='p-1 rounded-full bg-gray-100 flex gap-2.5 items-center pr-2'
            key={`employee-${employee.id}`}
          >
            {employee.photo ? (
              <img
                className='h-6 w-6 shadow-md rounded-full object-cover object-center'
                src={BASE_URL + '/img/' + employee.photo}
              />
            ) : (
              <div className='w-6 h-6 shadow-md rounded-full bg-gray-300 text-gray-500 flex items-center justify-center'>
                <UserCircle size={20} />
              </div>
            )}
            <p className='text-sm text-dark'>{employee.fullname}</p>
            <ProtectedComponent required={['project:update']}>
              <Button
                variant='ghost'
                className='ml-2 border p-0 w-4 h-4 cursor-pointer z-[1] hover:bg-transparent opacity-70 pt-0.5'
                onClick={() => {
                  remove(
                    { id },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: [KEYS.PROJECT_DETAIL, projectId],
                        })
                        if (withSocket) socket.emit('request_board')
                      },
                    }
                  )
                }}
              >
                <X size={14} strokeWidth={3} />
              </Button>
            </ProtectedComponent>
          </div>
        ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='employeeId'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant='ghost'
                          className={cn(
                            'font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 text-sm h-fit relative',
                            !isAllowed && 'hidden'
                          )}
                          disabled={!isAllowed}
                        >
                          <Plus size={14} />
                          Tambah
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='p-0 w-[160px]' align='start'>
                        <Command>
                          <CommandInput
                            placeholder='Cari...'
                            value={search}
                            onValueChange={handleSearch}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {filteredEmployees.length
                                ? `Tidak ditemukan ${search}`
                                : 'Kosong'}
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredEmployees.map((item, index) => (
                                <CommandItem
                                  key={`client-${index}`}
                                  value={String(item.id)}
                                  onSelect={() => {
                                    field.onChange(item.id)
                                    form.handleSubmit(handleSubmit)()
                                  }}
                                >
                                  <div className='space-y-2'>
                                    <div className='flex gap-2 items-center'>
                                      <p className='text-dark'>
                                        {item.fullname}{' '}
                                      </p>
                                      {item.position && (
                                        <span className='text-dark/50'>
                                          {item.position.name}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

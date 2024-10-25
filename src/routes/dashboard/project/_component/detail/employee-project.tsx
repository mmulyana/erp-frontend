import { Button } from '@/components/ui/button'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEmployees } from '@/hooks/api/use-employee'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BASE_URL } from '@/utils/constant/_urls'
import { Project } from '@/utils/types/api'
import { Command } from 'cmdk'
import { Plus, UserCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  employeeId?: number | null
}
type Props = {
  id: number
  data: Pick<Project, 'employees'>
}
export default function EmployeeProject({ id, data: { employees } }: Props) {
  //   HANDLE SEARCH
  const [search, setSearch] = useState('')
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  useEffect(() => {
    if (!open) setSearch('')
  }, [search])
  //   HANDLE SEARCH

  const [open, setOpen] = useState(false)
  useFixPointerEvent(open)

  const form = useForm<FormValues>({
    defaultValues: {
      employeeId: null,
    },
  })
  const handleSubmit = (data: FormValues) => {
    console.log(data)
  }

  //   GET CLIENT
  const { data } = useEmployees({ enabled: open })
  const dataEmployees = useMemo(() => data?.data.data || [], [data])

  const filteredEmployees = useMemo(() => {
    const selectedEmployee = employees.map((item) => item.employee.id)

    const availableEmployee = dataEmployees.filter(
      (item) => !selectedEmployee.includes(item.id)
    )
    if (!search) {
      return availableEmployee
    }

    return availableEmployee.filter((item) =>
      item.fullname.toLowerCase().includes(search.toLowerCase())
    )
  }, [employees, search, dataEmployees])

  return (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='w-full pb-2 border-b border-line flex justify-between items-center'>
        <p className='text-dark/50'>Pegawai</p>
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
                          variant='secondary'
                          className='text-sm text-dark font-normal'
                        >
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
      <div className='flex gap-2 items-center flex-wrap'>
        {employees.map(({ employee }) => (
          <div
            className='p-1 rounded-full bg-gray-100 flex gap-1.5 items-center pr-4'
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
          </div>
        ))}
      </div>
    </div>
  )
}

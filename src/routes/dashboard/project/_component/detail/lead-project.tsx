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
import { useAllEmployees } from '@/features/hris/employee/api/use-employee'
import { useUpdateProject } from '@/hooks/api/use-project'
import { useFixPointerEvent } from '@/shared/hooks/use-fix-pointer-events'
import { cn } from '@/utils/cn'
import { BASE_URL } from '@/utils/constant/_urls'
import { ProjectDetail } from '@/utils/types/api'
import { Command } from 'cmdk'
import { Pencil, User2, UserCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  leadId?: number | null
}
type Props = {
  id: number
  data: Pick<ProjectDetail, 'lead'>
  permission?: string[]
}
export default function LeadProject({ id, data: { lead }, permission }: Props) {
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

  const { mutate: update } = useUpdateProject()

  const form = useForm<FormValues>({
    defaultValues: {
      leadId: null,
    },
  })
  const handleSubmit = (data: FormValues) => {
    if (!id || !data.leadId) return

    update(
      { id, payload: { leadId: data.leadId } },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  //   GET CLIENT
  const { data } = useAllEmployees({ enabled: open })
  const leads = useMemo(() => data?.data.data || [], [data])

  const filteredClient = useMemo(() => {
    const availableClients = leads.filter((item) => item.id !== lead?.id)
    if (!search) {
      return availableClients
    }

    return availableClients.filter((item) =>
      item.fullname.toLowerCase().includes(search.toLowerCase())
    )
  }, [leads, search, lead])

  const isAllowed = permission?.includes('project:update')

  return (
    <div className='flex gap-2 flex-wrap items-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='leadId'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        className={cn(
                          'font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 h-fit relative gap-2',
                          lead && 'text-dark'
                        )}
                        disabled={!isAllowed}
                      >
                        {lead ? (
                          <>
                            <div className='flex items-center gap-2 group'>
                              {lead?.fullname}
                              <Pencil
                                size={14}
                                className='text-gray-400 hidden group-hover:block'
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {isAllowed ? (
                              <>
                                <User2 size={14} />
                                Pilih PJ
                              </>
                            ) : (
                              '-'
                            )}
                          </>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0 w-[200px]' align='start'>
                      <Command>
                        <CommandInput
                          placeholder='Cari...'
                          value={search}
                          onValueChange={handleSearch}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {leads.length
                              ? `Tidak ditemukan ${search}`
                              : 'Kosong'}
                          </CommandEmpty>
                          <CommandGroup>
                            {filteredClient.map((item, index) => (
                              <CommandItem
                                key={`leads-${index}`}
                                value={String(item.id)}
                                onSelect={() => {
                                  field.onChange(item.id)
                                  form.handleSubmit(handleSubmit)()
                                }}
                              >
                                <div className='flex gap-2 items-center'>
                                  {item.photo ? (
                                    <img
                                      className='h-8 w-8 rounded-full object-cover object-center'
                                      src={BASE_URL + '/img/' + item.photo}
                                    />
                                  ) : (
                                    <div className='w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center'>
                                      <UserCircle size={18} />
                                    </div>
                                  )}
                                  <p className='text-dark'>{item.fullname} </p>
                                  {item.position && (
                                    <span className='text-dark/50'>
                                      {item.position.name}
                                    </span>
                                  )}
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
  )
}

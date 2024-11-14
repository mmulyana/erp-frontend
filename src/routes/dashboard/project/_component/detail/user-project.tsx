import { Button } from '@/components/ui/button'
import {
  Command,
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
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { useUpdateProject } from '@/hooks/api/use-project'
import { useClient } from '@/hooks/api/use-client'
import { Project } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import { useEffect, useMemo, useState } from 'react'
import { Pencil, User2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { socket } from '@/utils/socket'

type FormValues = {
  clientId?: number | null
}
type Props = {
  id: number
  data: Pick<Project, 'client'>
  withSocket?: boolean
}
export default function UserProject({ id, data: { client } }: Props) {
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
      clientId: null,
    },
  })
  const handleSubmit = (data: FormValues) => {
    if (!id || !data.clientId) return

    update(
      { id, payload: { clientId: data.clientId } },
      {
        onSuccess: () => {
          setOpen(false)
          socket.emit('request_board')
        },
      }
    )
  }

  //   GET CLIENT
  const { data } = useClient()
  const clients = useMemo(() => data?.data.data || [], [data])

  const filteredClient = useMemo(() => {
    const availableClients = clients.filter((item) => item.id !== client?.id)

    if (!search) {
      return availableClients
    }

    return availableClients.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [clients, search, client])

  return (
    <div className='flex gap-2 items-center flex-wrap'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        className={cn(
                          'font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 h-fit relative gap-2',
                          client && 'text-dark'
                        )}
                      >
                        {client ? (
                          <>
                            <div className='flex items-center gap-2 group'>
                              {client.name}
                              <Pencil
                                size={14}
                                className='text-gray-400 hidden group-hover:block'
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <User2 size={14} />
                            Pilih klien
                          </>
                        )}
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
                            {clients.length
                              ? `Tidak ditemukan ${search}`
                              : 'Kosong'}
                          </CommandEmpty>
                          <CommandGroup>
                            {filteredClient.map((item, index) => (
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
                                    <p className='text-dark'>{item.name} </p>
                                    {item.position && (
                                      <span className='text-dark/50'>
                                        {item.position}
                                      </span>
                                    )}
                                  </div>
                                  {item.company && (
                                    <p className='text-dark'>
                                      <span className='text-dark/50'>dari</span>{' '}
                                      {item.company.name}
                                    </p>
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

import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { z } from 'zod'

import {
  useAddLabelProject,
  useRemoveLabelProject,
} from '@/hooks/api/use-project'
import { useProjectLabels } from '@/hooks/api/use-project-label'

import { KEYS } from '@/utils/constant/_keys'
import { Project } from '@/utils/types/api'
import { socket } from '@/utils/socket'
import { cn } from '@/utils/cn'

import { Form, FormControl, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import Label from '@/components/common/label'
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

const formSchema = z.object({
  labelId: z.number({
    required_error: 'Silahkan pilih label',
  }),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  id: number
  data: Pick<Project, 'labels'>
  withSocket?: boolean
  permission?: string[]
}
export default function LabelProject({
  id: projectId,
  data: { labels },
  withSocket,
  permission,
}: Props) {
  const queryClient = useQueryClient()

  // HANDLE SEARCH
  const [search, setSearch] = useState('')
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  // HANDLE SELECT
  const [open, setOpen] = useState(false)

  // GET DATA LABEL
  const { data, isLoading } = useProjectLabels()
  const dataLabels = useMemo(() => data?.data.data || [], [data, isLoading])

  // HANDLE FORM
  const { mutate: add } = useAddLabelProject()
  const { mutate: remove } = useRemoveLabelProject()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const submit = (data: FormValues) => {
    if (!projectId) return
    add(
      { projectId, labelId: data.labelId },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: [KEYS.PROJECT_DETAIL, projectId],
          })
          withSocket && socket.emit('request_board')
        },
      }
    )
  }

  // DATA FOR SELECT
  const filteredLabels = useMemo(() => {
    const existing = labels.map((item) => item.label.id)

    const available = dataLabels.filter((item) => !existing.includes(item.id))

    if (!search) {
      return available
    }

    return available.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [dataLabels, search, labels])

  const isAllowed = permission?.includes('project:update')

  return (
    <div className={cn('flex flex-wrap gap-2', labels.length > 2 && 'pt-2')}>
      {labels?.map((item) => (
        <Label
          key={`label-${item.id}`}
          color={item.label.color}
          name={item.label.name}
          suffix={
            isAllowed && (
              <Button
                variant='ghost'
                className='border p-0 w-4 h-4 cursor-pointer z-[1] hover:bg-transparent opacity-70 pt-0.5'
                style={{ color: item.label.color }}
                onClick={() => {
                  remove(
                    { id: item.id },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: [KEYS.PROJECT_DETAIL, projectId],
                        })

                        withSocket && socket.emit('request_board')
                      },
                    }
                  )
                }}
              >
                <X size={14} strokeWidth={3} />
              </Button>
            )
          }
        />
      ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Controller
            control={form.control}
            name='labelId'
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
                            {filteredLabels.length
                              ? `Tidak ditemukan ${search}`
                              : 'Kosong'}
                          </CommandEmpty>
                          <CommandGroup>
                            {filteredLabels.map((item, index) => (
                              <CommandItem
                                key={`competency-${index}`}
                                value={item.name}
                                onSelect={() => {
                                  field.onChange(item.id)
                                  form.handleSubmit(submit)()
                                }}
                              >
                                <Label name={item.name} color={item.color} />
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

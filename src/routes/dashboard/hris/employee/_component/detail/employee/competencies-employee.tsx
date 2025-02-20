import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import * as z from 'zod'

import { useAddCompetency, useRemoveCompetency } from '@/hooks/api/use-employee'
import { useFixPointerEvent } from '@/shared/hooks/use-fix-pointer-events'
import { useCompetency } from '@/hooks/api/use-competency'
import { EmployeeCompetency } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
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
  competencyId: z.number({
    required_error: 'Please select a competency',
  }),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  id?: number | null
  competencies: EmployeeCompetency[]
  permission?: string[]
  className?: string
}

export default function CompetenciesEmployee({
  id,
  competencies,
  permission,
  className,
}: Props) {
  const { mutate: add } = useAddCompetency()
  const { mutate: remove } = useRemoveCompetency()

  const { data } = useCompetency()

  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  useFixPointerEvent(open)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const dataCompetencies = useMemo(() => data?.data?.data || [], [data])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const filteredCompetencies = useMemo(() => {
    const existingCompetencyIds = competencies.map((item) => item.competency.id)

    const availableCompetencies = dataCompetencies.filter(
      (item) => !existingCompetencyIds.includes(item.id)
    )

    if (!search) {
      return availableCompetencies
    }

    return availableCompetencies.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [dataCompetencies, search, competencies])

  const handleSubmit = (data: FormValues) => {
    if (!id) return
    add(
      { id, payload: data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const isAllowed = permission?.includes('employee:update')

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <div className='flex gap-2 flex-wrap items-center'>
        {competencies?.map((item, index) => (
          <Label
            color={item.competency.color}
            name={item.competency.name}
            key={`label-${index}`}
            suffix={
              isAllowed && (
                <Button
                  variant='ghost'
                  className='border p-0 w-4 h-4 cursor-pointer z-[1] hover:bg-transparent opacity-70 pt-0.5'
                  style={{ color: item.competency.color }}
                  onClick={() => {
                    remove({ id: item.id })
                  }}
                >
                  <X size={14} strokeWidth={3} />
                </Button>
              )
            }
          />
        ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='competencyId'
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
                              {filteredCompetencies.length
                                ? `Tidak ditemukan ${search}`
                                : 'Kosong'}
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredCompetencies.map((item, index) => (
                                <CommandItem
                                  key={`competency-${index}`}
                                  value={item.name}
                                  onSelect={() => {
                                    field.onChange(item.id)
                                    form.handleSubmit(handleSubmit)()
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
    </div>
  )
}

import { useMemo, useState } from 'react'
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
import { useCompetency } from '@/hooks/api/use-competency'
import { cn } from '@/utils/cn'
import { EmployeeCompetency } from '@/utils/types/api'
import { Plus } from 'lucide-react'
import Label from '@/components/common/label'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { useAddCompetency } from '@/hooks/api/use-employee'

const formSchema = z.object({
  competencyId: z.number({
    required_error: 'Please select a competency',
  }),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  id?: number | null
  competencies: EmployeeCompetency[]
}

export default function CompetenciesEmployee({ id, competencies }: Props) {
  const { data } = useCompetency()
  const { mutate } = useAddCompetency()

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
    mutate(
      { id, payload: data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  return (
    <div
      className={cn('flex flex-wrap gap-2', !!competencies.length && 'pt-2')}
    >
      <div className='flex gap-2 flex-wrap items-center'>
        {competencies?.map((item, index) => (
          <Label
            color={item.competency.color}
            name={item.competency.name}
            key={`label-${index}`}
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
                          className='font-normal p-0 hover:bg-transparent inline-flex items-center text-gray-400 text-sm h-fit relative'
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

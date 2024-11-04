import Label from '@/components/common/label'
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
import { Supplier } from '@/utils/types/api'
import { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useSupplierLabels } from '@/hooks/api/use-supplier-label'
import { useUpdateTagSupplier } from '@/hooks/api/use-supplier'

type Props = {
  id?: number | null
  data: Pick<Supplier, 'tags'>
}
export default function LabelSupplier({ id, data: { tags } }: Props) {
  const { mutate } = useUpdateTagSupplier()
  const onAdd = (selectedId: number) => {
    if (!id) return
    const existing = tags.map((item) => item.tag.id)

    mutate({
      id,
      payload: {
        tagIds: [...existing, selectedId],
      },
    })
  }
  const onRemove = (selectedId: number) => {
    if (!id) return
    const tagIds = tags
      .map((item) => item.tag.id)
      .filter((item) => item !== selectedId)

    mutate({
      id,
      payload: {
        tagIds,
      },
    })
  }

  // HANDLE SEARCH
  const [search, setSearch] = useState('')
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  // HANDLE SELECT
  const [open, setOpen] = useState(false)

  // GET DATA LABEL
  const { data, isLoading } = useSupplierLabels()
  const dataLabels = useMemo(() => data?.data.data || [], [data, isLoading])

  // DATA FOR SELECT
  const filteredLabels = useMemo(() => {
    const existing = tags.map((item) => item.tag.id)

    const available = dataLabels.filter((item) => !existing.includes(item.id))

    if (!search) {
      return available
    }

    return available.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [dataLabels, search, tags])

  return (
    <div className={cn('flex flex-wrap items-center gap-2', )}>
      {tags?.map((item) => (
        <Label
          key={`label-${item.id}`}
          color={item.tag.color}
          name={item.tag.name}
          suffix={
            <Button
              variant='ghost'
              className='border p-0 w-4 h-4 cursor-pointer z-[1] hover:bg-transparent opacity-70 pt-0.5'
              style={{ color: item.tag.color }}
              onClick={() => {
                onRemove(item.tag.id)
              }}
            >
              <X size={14} strokeWidth={3} />
            </Button>
          }
        />
      ))}
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
                {filteredLabels.length ? `Tidak ditemukan ${search}` : 'Kosong'}
              </CommandEmpty>
              <CommandGroup>
                {filteredLabels.map((item, index) => (
                  <CommandItem
                    key={`competency-${index}`}
                    value={String(item.id)}
                    onSelect={() => {
                      onAdd(Number(item.id))
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
    </div>
  )
}

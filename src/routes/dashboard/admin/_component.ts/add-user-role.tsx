import { useAssignRoleAccount } from '@/hooks/api/use-account'
import { useApiData } from '@/hooks/use-api-data'
import { useRoles } from '@/hooks/api/use-role'

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

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  id?: number
  roleId?: number | null
}
export default function AddUserRole({ id, roleId }: Props) {
  const [openPopover, setOpenPopover] = useState(false)

  const { mutate: assign } = useAssignRoleAccount()

  const { data: roles } = useApiData(useRoles())

  return (
    <Popover modal={false} open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='pr-2 pl-2.5 gap-2 min-w-[104px] justify-between'
        >
          {roleId
            ? roles?.find((item) => item.id === roleId)?.name
            : 'Tambah role'}
          <ChevronsUpDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-0'
        style={{
          width: 'var(--radix-popover-trigger-width)',
        }}
      >
        <Command shouldFilter>
          <CommandInput placeholder='Cari peran' />
          <CommandList>
            <CommandEmpty>Peran tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {roles?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={String(item.name)}
                  onSelect={() => {
                    id && assign({ id, roleId: item.id })
                    setOpenPopover(false)
                  }}
                  className='flex justify-between items-center gap-1'
                >
                  <span>{item.name}</span>
                  {item.id === roleId && (
                    <div className='flex-shrink-0 h-5 w-5 rounded-full flex justify-center items-center bg-green-primary text-white'>
                      <Check size={14} strokeWidth={2.9} />
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

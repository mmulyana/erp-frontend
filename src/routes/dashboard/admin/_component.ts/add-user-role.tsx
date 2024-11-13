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

type Props = {
  id?: number
  roleId?: number | null
}
export default function AddUserRole({ id, roleId }: Props) {
  const { mutate: assign } = useAssignRoleAccount()

  const { data: roles } = useApiData(useRoles())

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='pr-2 pl-2.5 gap-2 min-w-[120px] justify-between'
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
                  onSelect={() => id && assign({ id, roleId: item.id })}
                  disabled={item.id === roleId}
                  className='flex justify-between items-center'
                >
                  <span>{item.name}</span>
                  {item.id === roleId && (
                    <div className='h-8 w-8 rounded-full flex justify-center items-center bg-green-primary/5 text-green-primary'>
                      <Check size={16} />
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

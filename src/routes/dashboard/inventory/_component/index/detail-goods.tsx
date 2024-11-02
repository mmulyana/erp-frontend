import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useDetailGoods, useUpdateGoods } from '@/hooks/api/use-goods'
import PhotoProfile from '@/components/common/photo-profile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { useCallback, useMemo, useState } from 'react'
import { BASE_URL } from '@/utils/constant/_urls'
import { createGoods } from '@/utils/types/form'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DataSheet from '@/components/common/data-sheet'

export const selectedGoodAtom = atom<{
  open: boolean
  id: number | null
} | null>(null)

export default function DetailGoods() {
  const [selected, setSelected] = useAtom(selectedGoodAtom)
  const { mutate: update } = useUpdateGoods()

  const { data, isLoading } = useDetailGoods({
    id: selected?.id,
    enabled: selected?.open || false,
  })
  const good = useMemo(() => data?.data.data, [data, isLoading])

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  const onClose = () => {
    setSelected(null)
  }

  const handleUpdate = (payload: Partial<createGoods>) => {
    if (!selected?.id) return
    update({ id: selected.id, payload })
    setEdit(null)
  }

  return (
    <Sheet open={selected?.open} onOpenChange={() => onClose()} modal>
      <SheetContent className='max-w-[512px] p-0'>
        <SheetTitle>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
            <p className='text-sm text-dark font-normal'>Detail Barang</p>
          </div>
        </SheetTitle>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='mt-4 px-4 pb-8'>
            <PhotoProfile
              defaultPreview={
                good?.photoUrl ? BASE_URL + '/img/' + good?.photoUrl : null
              }
              onUpdate={(photo) => {
                handleUpdate({ photo })
              }}
              onRemove={() => {
                handleUpdate({ photoUrl: null })
              }}
            />
            <div className='relative pr-7'>
              <Editable
                isEdit={isEdit}
                keyData='name'
                onEdit={onEdit}
                defaultData={good?.name}
                className='text-lg font-medium text-dark mt-4 py-1 px-1'
                classNameInput='text-lg font-medium text-dark mt-4 py-1 px-1'
                onUpdate={(name) => handleUpdate({ name: String(name) })}
              />
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='absolute flex justify-center items-center top-1/2 -translate-y-1/2 right-0 w-6 h-6 p-0'
                  >
                    <Ellipsis size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-fit -translate-x-4'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Hapus</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className='flex flex-col gap-4 w-fit mt-2'>
              <DataSheet>
                <p className='text-dark/50'>Minimum</p>
                <Editable
                  isEdit={isEdit}
                  onEdit={onEdit}
                  keyData='minimum'
                  defaultData={good?.minimum}
                />
              </DataSheet>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

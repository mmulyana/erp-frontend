import { Editable } from '@/components/common/editable'
import PhotoProfile from '@/components/common/photo-profile'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDetailGoods, useUpdateGoods } from '@/hooks/api/use-goods'
import { BASE_URL } from '@/utils/constant/_urls'
import { atom, useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'react'

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
  const good = useMemo(() => data?.data.data || {}, [data, isLoading])
  console.log(good)

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

  return (
    <Sheet open={selected?.open} onOpenChange={() => onClose()} modal>
      <SheetContent className='max-w-[512px] p-0'>
        <SheetTitle>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
            <p className='text-sm text-dark font-normal'>Detail Barang</p>
          </div>
        </SheetTitle>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          {/* <PhotoProfile/> */}
          <Tabs>
            <Tab label='Pegawai'>
              <div className='p-4'></div>
            </Tab>
            <Tab label='Transaksi'>
              <div className='p-4'></div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDetailSupplier } from '@/hooks/api/use-supplier'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id: number | null
}
export default function DetailSupplier({ open, setOpen, id }: Props) {
  const { data } = useDetailSupplier(id)
  console.log(data)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='max-w-[512px] p-0'>
        <SheetTitle>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
            <p className='text-sm text-dark font-normal'>Detail Supplier</p>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
        
      </SheetContent>
    </Sheet>
  )
}

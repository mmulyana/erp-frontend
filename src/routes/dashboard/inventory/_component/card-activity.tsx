import { PackageMinus, PackagePlus } from 'lucide-react'

type Props = {
  type: string
  isLast?: boolean
}
export default function CardActivity({ type, isLast }: Props) {
  return (
    <div className='grid grid-cols-[40px_1fr] gap-4'>
      <div className='relative'>
        <div className='w-full h-10 rounded-full bg-white border border-[#EFF0F2] flex items-center justify-center'>
          <TransactionIcon type={type} />
        </div>
        {!isLast && (
          <div className='h-[calc(100%-40px)] w-[1px] bg-[#EFF0F2] absolute left-1/2 -translate-x-1/2 -z-10' />
        )}
      </div>
      <div className='relative flex flex-col gap-2 mb-4'>
        <TransactionType type={type} />
        <p className='text-sm text-[#313951]'>
          Produk 1 kini tersedia, masuk stok sebanyak 10 pcs!
        </p>
        <p className='text-sm text-[#313951]/50'>10 Februari 2024</p>
      </div>
    </div>
  )
}

function TransactionType({ type }: Pick<Props, 'type'>) {
  if (type == 'in') {
    return (
      <div className='flex items-center gap-1.5'>
        <div className='w-1 h-1 rounded-full bg-[#5FC985]'></div>
        <p className='text-xs text-[#5FC985]'>Barang masuk</p>
      </div>
    )
  }
  if (type == 'out') {
    return (
      <div className='flex items-center gap-1.5'>
        <div className='w-1 h-1 rounded-full bg-[#C95F61]'></div>
        <p className='text-xs text-[#C95F61]'>Barang keluar</p>
      </div>
    )
  }

  return null
}

function TransactionIcon({ type }: Pick<Props, 'type'>) {
  if (type == 'in') {
    return <PackagePlus className='w-5 h-5 text-[#313951]' />
  }
  if (type == 'out') {
    return <PackageMinus className='w-5 h-5 text-[#313951]' />
  }
  return null
}

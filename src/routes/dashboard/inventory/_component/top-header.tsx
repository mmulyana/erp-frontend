import Filter from '@/components/common/filter'
import SearchV2 from '@/components/common/search/search-v2'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
  filterContent?: React.ReactNode
  title: string
  titleButton?: string | React.ReactNode
  onClick?: (val: any) => void
}
export default function TopHeader({
  filterContent,
  title,
  titleButton,
  onClick,
}: Props) {
  return (
    <div className='pb-1.5 border-b border-[#EFF0F2] flex justify-between items-center relative'>
      <div className='relative px-2'>
        <p className='text-[#313951] font-medium'>{title}</p>
        <div className='w-full h-0.5 bg-[#5463E8] absolute -bottom-2.5 left-0'></div>
      </div>
      <div className='flex gap-2 items-center'>
        <SearchV2 />
        <Filter>
          <div className='flex flex-col gap-2'>{filterContent}</div>
        </Filter>
        <Button onClick={onClick}>{titleButton ?? 'Tambah'}</Button>
      </div>
    </div>
  )
}

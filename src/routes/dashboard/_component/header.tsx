import { atom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import {
  Breadcrumb as BreadCrumbWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronRight, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cn } from '@/utils/cn'

export type Title = {
  name: string
  path: string
  icon?: React.ReactNode | string
}

const titleAtom = atom<Title[]>([])
export const useTitle = (title: Title[]) => {
  const setTitle = useSetAtom(titleAtom)

  useEffect(() => {
    setTitle(title)
  }, [title])
}
export default function Header() {
  const links = useAtomValue(titleAtom)
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-[#EFF0F2] px-4 h-12 bg-white sticky top-0 left-0 w-full z-20',
        isSmall && 'pl-[calc(48px+8px)]'
      )}
    >
      <BreadCrumbWrapper>
        <BreadcrumbList className='flex items-center'>
          {links.map((link, index) => {
            const lastIndex = links.length - 1

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === lastIndex ? (
                    <BreadcrumbPage className='text-[#021328] text-sm font-medium'>
                      {link.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={link.path}
                      className='text-[#989CA8] text-sm'
                    >
                      {link.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== lastIndex && (
                  <BreadcrumbSeparator>
                    <ChevronRight className='w-2 h-2 text-[#989CA8]' />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </BreadCrumbWrapper>
      <div className='flex gap-2 items-center'>
        <Button
          variant='secondary'
          className='w-8 h-8 p-0 rounded-full bg-[#EFF0F2]'
        >
          <Settings className='w-5 h-5 text-[#313951]/70' />
        </Button>
        <Button
          variant='secondary'
          className='w-8 h-8 rounded-full bg-[#FFF] border-[1.5px] border-[#2A9D90] p-0.5 relative'
        >
          <div className='w-full h-full rounded-full bg-gray-400'></div>
          <div className='w-3 h-3 rounded-full border-2 border-white bg-[#2A9D90] absolute -right-0.5 -bottom-0.5'></div>
        </Button>
      </div>
    </div>
  )
}

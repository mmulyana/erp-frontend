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
import { SlashIcon } from 'lucide-react'

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
  return (
    <div className='flex items-center justify-between border-b border-[#EFF0F2] px-4 h-12'>
      <BreadCrumbWrapper>
        <BreadcrumbList>
          {links.map((link, index) => {
            const lastIndex = links.length - 1
            const firstIndex = index == 0

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
                    <SlashIcon className='w-[10px] h-[10px] text-[#989CA8]' />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </BreadCrumbWrapper>
    </div>
  )
}

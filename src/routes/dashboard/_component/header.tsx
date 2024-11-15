import { atom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'

import { cn } from '@/utils/cn'

import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb as BreadCrumbWrapper,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { settingConfig } from './setting/setting'

import { ChevronRight, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { userAtom } from '@/atom/auth'
import { BASE_URL } from '@/utils/constant/_urls'
import { useIsMobile } from '@/hooks/use-mobile'

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
  const setSettingConfig = useSetAtom(settingConfig)

  const links = useAtomValue(titleAtom)
  const user = useAtomValue(userAtom)

  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-[#EFF0F2] px-4 h-16 md:h-12 bg-white sticky top-0 left-0 min-w-full z-10'
      )}
    >
      <div className='flex gap-2 items-center'>
        <SidebarTrigger />
        {!isMobile && (
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
                        <Link to={link.path} className='text-[#989CA8] text-sm'>
                          {link.name}
                        </Link>
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
        )}
      </div>

      <div className='flex gap-2 items-center'>
        <Button
          variant='secondary'
          className='w-10 h-10 p-0 rounded-full bg-[#EFF0F2]'
          onClick={() => {
            setSettingConfig({ open: true })
          }}
        >
          <Settings className='w-5 h-5 text-[#313951]/70' />
        </Button>
        <Button
          variant='secondary'
          className='w-10 h-10 rounded-full bg-[#FFF] border-[1.5px] border-[#2A9D90] p-0.5 relative'
        >
          {user?.photo ? (
            <img
              src={BASE_URL + '/img/' + user?.photo}
              className='h-full w-full rounded-full object-cover'
            />
          ) : (
            <div className='w-full h-full rounded-full bg-blue-primary/20 flex justify-center items-center pb-0.5'>
              <p className='text-sm uppercase text-blue-primary'>
                {user?.name.at(0)}
              </p>
            </div>
          )}
          <div className='w-2.5 h-2.5 rounded-full border-2 border-white bg-[#2A9D90] absolute -right-[2px] -top-[1px]'></div>
        </Button>
      </div>
    </div>
  )
}

import { ChevronRight, Settings, Telescope } from 'lucide-react'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { userAtom } from '@/atom/auth'
import { startTourAtom } from '@/hooks/use-tour'
import { useIsMobile } from '@/hooks/use-mobile'
import { BASE_URL } from '@/utils/constant/_urls'
import { cn } from '@/utils/cn'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb as BreadCrumbWrapper,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { settingConfig } from './setting/setting'

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
  const setStart = useSetAtom(startTourAtom)
  const links = useAtomValue(titleAtom)
  const user = useAtomValue(userAtom)

  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-[#EFF0F2] px-4 h-16 md:h-12 bg-white sticky top-0 left-0 min-w-full z-10'
      )}
    >
      <div className='flex gap-3 items-center'>
        <SidebarTrigger />
        {!!links.length && !isMobile && (
          <Separator
            className='border border-line h-7'
            orientation='vertical'
          />
        )}
        {!isMobile && (
          <BreadCrumbWrapper>
            <BreadcrumbList className='ml-2 flex items-center'>
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
          className='mr-2 rounded-full px-3 text-gray-400'
          onClick={() => setStart(true)}
        >
          <Telescope size={16} />
          <span className='px-1 text-gray-600'>Lihat tutorial</span>
        </Button>
        <Button
          variant='secondary'
          className='w-10 h-10 md:w-8 md:h-8 p-0 rounded-full bg-[#EFF0F2]'
          onClick={() => {
            setSettingConfig({ open: true })
          }}
        >
          <Settings className='w-5 h-5 text-[#313951]/70' />
        </Button>
        <Button
          variant='secondary'
          className='w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#FFF] border-[1.5px] border-[#2A9D90] p-0.5 relative'
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
        </Button>
      </div>
    </div>
  )
}

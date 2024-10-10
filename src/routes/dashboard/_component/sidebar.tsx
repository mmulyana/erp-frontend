import { useState } from 'react'
import SidebarMenus from '@/utils/constant/sidebar-menus'
import LinkGroup from './link-group'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cn } from '@/utils/cn'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function Sidebar({ open, setOpen }: Props) {
  const [openMenu, setOpenMenu] = useState('')
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  if (isSmall) {
    return (
      <>
        <button
          className='h-12 w-12 fixed flex items-center justify-center border-r border-[#EFF0F2]'
          onClick={() => setOpen(!open)}
        >
          <div className='rounded h-6 w-6 bg-[#365EFF] flex justify-center items-center'>
            <span className='uppercase text-white'>B</span>
          </div>
        </button>
        {!!open && (
          <div
            className='bg-black/50 fixed top-0 left-0 w-full h-full z-10'
            onClick={() => setOpen(false)}
          ></div>
        )}
        <div
          className={cn(
            'fixed top-0 left-0 w-[264px] h-full bg-white z-10 duration-150 ease-out',
            !open && '-left-[264px]'
          )}
        >
          <div className='h-12 w-full border-b border-[#EFF0F2] flex items-center'>
            <div className='h-12 w-12 flex items-center justify-center'>
              <div className='rounded h-6 w-6 bg-[#365EFF] flex justify-center items-center'>
                <span className='uppercase text-white'>B</span>
              </div>
            </div>
            <p className='text-[#3D556B] font-semibold'>BJS ERP</p>
          </div>
          <div className='p-4 flex flex-col gap-2'>
            {SidebarMenus.map((menu, index) => (
              <LinkGroup
                key={index}
                {...menu}
                open={openMenu}
                setOpen={setOpenMenu}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-[264px] h-[100dvh] border-r border-[#EFF0F2]'
      )}
    >
      <div className='px-4 h-12 w-full border-b border-[#EFF0F2] flex items-center gap-2'>
        <div className='rounded h-6 w-6 bg-[#365EFF] flex justify-center items-center'>
          <span className='uppercase text-white'>B</span>
        </div>
        <p className='text-[#3D556B] font-semibold'>BJS ERP</p>
      </div>
      <div className='p-4 flex flex-col gap-2'>
        {SidebarMenus.map((menu, index) => (
          <LinkGroup
            key={index}
            {...menu}
            open={openMenu}
            setOpen={setOpenMenu}
          />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import UserCard from './user-card'
import SidebarMenus from '@/utils/constant/sidebar-menus'
import LinkGroup from './link-group'

export default function Sidebar() {
  const [open, setOpen] = useState('')
  return (
    <div className='fixed top-0 left-0 w-[264px] h-[100dvh] border-r border-[#EFF0F2]'>
      <div className='px-4 h-12 w-full border-b border-[#EFF0F2] flex items-center gap-2'>
        <div className='rounded h-6 w-6 bg-[#365EFF] flex justify-center items-center'>
          <span className='uppercase text-white'>B</span>
        </div>
        <p className='text-[#3D556B] font-semibold'>BJS ERP</p>
      </div>
      <div className='p-4 flex flex-col gap-2'>
        <UserCard />
        {SidebarMenus.map((menu, index) => (
          <LinkGroup key={index} {...menu} open={open} setOpen={setOpen} />
        ))}
      </div>
    </div>
  )
}

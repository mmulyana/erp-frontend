import { cn } from '@/utils/cn'
import { PATH } from '@/utils/constant/_paths'
import { useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'

type MenuItem = {
  name: string
  path: string
  menus?: MenuItem[]
}

type LinkGroupProps = {
  name: string
  path: string
  menus?: MenuItem[]
  open: string
  setOpen: (val: string) => void
}

export default function LinkGroup({
  name,
  path,
  menus,
  open,
  setOpen,
}: LinkGroupProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const activeMenu = location.pathname.includes(path)
  
  return (
    <div className='w-full relative'>
      <button
        className={cn(
          'flex justify-between items-center p-2 gap-4 text-[#8298AD] text-sm w-full h-8',
          activeMenu && 'text-[#365EFF]'
        )}
        onClick={() => {
          if (path === PATH.DASHBOARD_OVERVIEW) {
            navigate(path)
          } else setOpen(path)
        }}
      >
        {name}
      </button>
      {(open === path || activeMenu) && (
        <div className='absolute top-8 left-0 w-8 h-[calc(100%-45px)]'>
          <div className='absolute w-[1px] h-full bg-[#EFF0F2] left-1/2 -translate-x-1/2'></div>
        </div>
      )}
      {!!menus?.length && (open === path || activeMenu) && (
        <div className='flex flex-col gap-2 pl-8 mt-2'>
          {menus.map((menu, index) => {
            if (menu.menus && menu.menus.length) {
              const [activeSubMenu, setActiveSubMenu] = useState('')
              const isActive = location.pathname.includes(menu.path)

              return (
                <div className='w-full relative' key={index}>
                  <button
                    className={cn(
                      'flex items-center px-4 rounded-[8px] h-8 text-sm',
                      isActive
                        ? 'text-gray-700 bg-[#E3E3E3]/20'
                        : 'text-gray-500'
                    )}
                    onClick={() => setActiveSubMenu(menu.path)}
                  >
                    {menu.name}
                  </button>
                  {(isActive || activeSubMenu === menu.path) && (
                    <div className='flex flex-col gap-2 pl-8 mt-2'>
                      {menu.menus.map((itemMenu, index) => (
                        <LinkItem
                          key={index}
                          {...itemMenu}
                          pathname={location.pathname}
                        />
                      ))}
                    </div>
                  )}
                  {(isActive || activeSubMenu === menu.path) && (
                    <div className='absolute top-8 left-0 w-8 h-[calc(100%-45px)]'>
                      <div className='absolute w-[1px] h-full bg-[#EFF0F2] left-1/2 -translate-x-1/2'></div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <LinkItem key={index} {...menu} pathname={location.pathname} />
            )
          })}
        </div>
      )}
    </div>
  )
}

type LinkProps = {
  name: string
  path: string
  pathname: string
}

function LinkItem({ name, path, pathname }: LinkProps) {
  const isActive = !!matchPath({ path }, pathname)
  return (
    <Link
      to={path}
      className={cn(
        'flex items-center px-4 rounded-[8px] h-8 text-sm',
        isActive ? 'text-gray-700 bg-[#E3E3E3]/20' : 'text-gray-500'
      )}
    >
      {name}
    </Link>
  )
}

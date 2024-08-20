import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/utils/cn'
import { PATH } from '@/utils/constant/_paths'
import { ChevronLeft } from 'lucide-react'
import { useMemo } from 'react'
import Logo from '/public/erp-logo.svg'
import { Link, matchPath, useLocation } from 'react-router-dom'

export function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <div className='pl-[240px]'>
        <div>{children}</div>
      </div>
    </>
  )
}

function Sidebar() {
  const location = useLocation()

  const sidebarMenus = useMemo(
    () => [
      {
        name: 'Index',
        menus: [
          {
            name: 'Dashboard',
            path: PATH.DASHBOARD_OVERVIEW,
          },
        ],
      },
      {
        name: 'HRIS',
        menus: [
          {
            name: 'Pegawai',
            path: PATH.EMPLOYEE,
          },
          {
            name: 'Kehadiran',
            path: PATH.EMPLOYEE_ATTENDANCE,
          },
          {
            name: 'Cuti', 
            path: PATH.EMPLOYEE_PAID_LEAVE,
          },
          {
            name: 'Kasbon',
            path: PATH.EMPLOYEE_CASH_ADVANCES,
          },
        ],
      },
      {
        name: 'Admin',
        menus: [
          {
            name: 'Akun',
            path: PATH.ACCOUNT,
          },
          {
            name: 'Peran',
            path: PATH.ROLES,
          },
          {
            name: 'Hak istimewa',
            path: PATH.ROLES_PERMISSION,
          },
        ],
      },
    ],
    []
  )

  return (
    <div className='fixed top-0 left-0 w-[240px] bg-[#F8F8F8] h-[100dvh] border-r border-[#e1e1e2]'>
      <button className='w-6 h-6 rounded-full bg-white border border-[#e1e1e2] absolute top-2.5 -right-3 flex items-center justify-center'>
        <ChevronLeft className='w-4 text-gray-500' />
      </button>
      <div className='px-4 pt-2.5'>
        <div className='flex gap-2 items-center'>
          <div className='w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center'>
            <img src={Logo} alt='logo erp' className='w-5' />
          </div>
          <span>ERP BJS</span>
        </div>
      </div>
      <ScrollArea className='px-4 mt-4'>
        <div className='flex flex-col gap-2.5'>
          {sidebarMenus.map((sidebar, index) => (
            <div key={index}>
              {sidebar.name !== 'Index' && (
                <p className='text-xs text-gray-400'>{sidebar.name}</p>
              )}
              <div className='flex flex-col gap-1 mt-1.5'>
                {sidebar?.menus.map((menu, menuIndex) => {
                  const isActive = matchPath(
                    { path: menu.path },
                    location.pathname
                  )

                  return (
                    <Link
                      to={menu.path}
                      key={menuIndex}
                      className={cn(
                        'flex justify-between px-2.5 py-1.5 rounded-md border',
                        isActive
                          ? 'bg-white border-[#e1e1e2] shadow-sm'
                          : 'border-transparent hover:bg-white/50 hover:border-[#e1e1e2]/50'
                      )}
                    >
                      <span className='text-sm text-[#00071D]'>
                        {menu.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

type Link = {
  name: string
  path: string
  show: boolean
}

type HeaderProps = React.PropsWithChildren & {
  subtitle?: string
  title?: string
  icon?: React.ReactNode
}
export function Header(props: HeaderProps) {
  return (
    <div className='pt-2.5 pb-2 flex items-center justify-between border-b-[0.5px] border-gray-200 px-8'>
      <div>
        <p className='text-xs text-gray-400'>{props.subtitle || 'subtitle'}</p>
        <p className='text-lg text-gray-800 font-medium'>{props.title || 'title'}</p>
      </div>
      {props.children}
    </div>
  )
}

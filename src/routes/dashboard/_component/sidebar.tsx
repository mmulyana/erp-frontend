import { useMediaQuery } from '@uidotdev/usehooks'
import { cn } from '@/utils/cn'
import { PATH } from '@/utils/constant/_paths'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}
export default function Sidebar({ open, setOpen }: Props) {
  const isSmall = useMediaQuery('only screen and (max-width : 768px)')

  if (isSmall) {
    return (
      <>
        <button
          className='h-12 w-12 fixed flex items-center justify-center border-r border-[#EFF0F2]'
          onClick={() => setOpen(!open)}
        >
          <div className='rounded h-6 w-6 bg-[#5463E8] flex justify-center items-center'>
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
            'fixed top-0 left-0 w-[264px] h-full bg-white z-10 duration-150 ease-in',
            !open && '-left-[264px]'
          )}
        >
          <div className='h-12 w-full border-b border-[#EFF0F2] flex items-center'>
            <div className='h-12 w-12 flex items-center justify-center'>
              <div className='rounded h-6 w-6 bg-[#5463E8] flex justify-center items-center'>
                <span className='uppercase text-white'>B</span>
              </div>
            </div>
            <p className='text-[#3D556B] font-semibold'>BJS ERP</p>
          </div>
          <div className='p-4 flex flex-col gap-2'></div>
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
        <div className='rounded h-6 w-6 bg-[#5463E8] flex justify-center items-center'>
          <span className='uppercase text-white'>B</span>
        </div>
        <p className='text-[#3D556B] font-semibold'>BJS ERP</p>
      </div>
      <div className='p-4 flex flex-col gap-4'>
        {menus.map((menu) => (
          <div key={`menus-${menu.name}`}>
            {menu.path ? (
              <Link to={menu.path} className='text-dark'>
                {menu.name}
              </Link>
            ) : (
              <p className='text-dark/50 text-xs'>{menu.name}</p>
            )}
            {menu.submenus && (
              <div className='mt-3 flex flex-col gap-3'>
                {menu.submenus.map((submenu) => (
                  <Link
                    key={`submenu-${submenu.name}`}
                    to={submenu.path}
                    className='text-dark text-sm'
                  >
                    {submenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const menus = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
    submenus: null,
  },
  {
    name: 'HRIS',
    path: null,
    submenus: [
      {
        name: 'Pegawai',
        path: PATH.EMPLOYEE,
      },
      {
        name: 'Absen',
        path: PATH.EMPLOYEE_ATTENDANCE,
      },
      {
        name: 'Kasbon',
        path: PATH.EMPLOYEE_CASH_ADVANCES,
      },
    ],
  },
  {
    name: 'Proyek',
    path: null,
    submenus: [
      {
        name: 'Ringkasan',
        path: PATH.PROJECT_INDEX,
      },
      {
        name: 'Kelola',
        path: PATH.PROJECT_MANAGE,
      },
      {
        name: 'Klien',
        path: PATH.PROJECT_CLIENT,
      },
    ],
  },
  {
    name: 'Inventaris',
    path: null,
    submenus: [
      {
        name: 'Dashboard',
        path: PATH.INVENTORY_INDEX,
      },
      {
        name: 'Kelola',
        path: PATH.INVENTORY_STOCK,
      },
      {
        name: 'Supplier',
        path: PATH.INVENTORY_SUPPLIER,
      },
    ],
  },
]

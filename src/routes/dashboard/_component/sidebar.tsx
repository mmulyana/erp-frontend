import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { userAtom } from '@/atom/auth'

import { PATH } from '@/utils/constant/_paths'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import {
  BlocksIcon,
  ChevronDown,
  HardHat,
  House,
  UserCircle,
  Users,
} from 'lucide-react'
import Logo from '../../../../public/erp-logo.svg'
import React from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export default function AppSidebar() {
  const user = useAtomValue(userAtom)
  return (
    <Sidebar variant='sidebar'className='z-20'>
      <SidebarHeader>
        <div className='rounded-lg w-full border px-1 py-1.5 border-line bg-white flex gap-2 items-center'>
          <div className='w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center'>
            <img src={Logo} className='h-4 w-4 rounded' />
          </div>
          <p className='text-dark font-medium text-sm'>ERP BJS</p>
        </div>
      </SidebarHeader>
      <ScrollArea>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link to='/dashboard'>
                  <House size={20} />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuButton className='hover:bg-transparent cursor-default'>
                <Users size={20} />
                HRIS
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  {hrisMenus.map((item) => (
                    <SidebarMenuSubButton key={`submenu-${item.url}`} asChild>
                      <Link to={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  ))}
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuButton className='hover:bg-transparent cursor-default'>
                <HardHat size={20} />
                Proyek
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  {ProjectMenus.map((item) => (
                    <SidebarMenuSubButton key={`submenu-${item.url}`} asChild>
                      <Link to={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  ))}
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuButton className='hover:bg-transparent cursor-default'>
                <BlocksIcon size={20} />
                Inventory
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  {InventoryMenus.map((item) => {
                    if (item.children) {
                      return (
                        <Collapsible
                          key={`submenu-${item.url}`}
                          className='group/collapsible'
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className='flex justify-between items-center'>
                              <span>{item.title}</span>
                              <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children?.map((sub) => (
                                <SidebarMenuSubItem key={`submenu-${sub.url}`}>
                                  <SidebarMenuSubButton asChild>
                                    <Link to={sub.url}>
                                      <span>{sub.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    }

                    return (
                      <React.Fragment key={`submenu-${item.url}`}>
                        <SidebarMenuSubButton asChild>
                          <Link to={item.url}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </React.Fragment>
                    )
                  })}
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenu>

            <SidebarMenu>
              {user?.role.name === 'Superadmin' && (
                <>
                  <SidebarMenuButton className='hover:bg-transparent cursor-default'>
                    <UserCircle size={20} />
                    Admin
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      {AdminMenus.map((item) => (
                        <SidebarMenuSubButton
                          key={`submenu-${item.url}`}
                          asChild
                        >
                          <Link to={item.url}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </>
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  )
}

const hrisMenus = [
  {
    title: 'Pegawai',
    url: PATH.EMPLOYEE,
  },
  {
    title: 'Presensi',
    url: PATH.EMPLOYEE_ATTENDANCE,
  },
  {
    title: 'Kasbon',
    url: PATH.EMPLOYEE_CASH_ADVANCES,
  },
  {
    title: 'Rekapan',
    url: PATH.EMPLOYEE_RECAP,
  },
]
const ProjectMenus = [
  {
    title: 'Dashboard',
    url: PATH.PROJECT_INDEX,
  },
  {
    title: 'Kelola',
    url: PATH.PROJECT_MANAGE,
  },
  {
    title: 'Klien',
    url: PATH.PROJECT_CLIENT,
  },
]
const InventoryMenus = [
  {
    title: 'Dashboard',
    url: PATH.INVENTORY_INDEX,
  },
  {
    title: 'Kelola',
    url: PATH.INVENTORY_STOCK,
    children: [
      {
        title: 'Barang Masuk',
        url: PATH.INVENTORY_STOCK_IN,
      },
      {
        title: 'Barang Keluar',
        url: PATH.INVENTORY_STOCK_OUT,
      },
      {
        title: 'Opname',
        url: PATH.INVENTORY_STOCK_OPNAME,
      },
      {
        title: 'Peminjaman',
        url: PATH.INVENTORY_STOCK_BORROWED,
      },
    ],
  },
  {
    title: 'Supplier',
    url: PATH.INVENTORY_SUPPLIER,
  },
]
const AdminMenus = [
  {
    title: 'User',
    url: PATH.ADMIN_USER,
  },
  {
    title: 'Role',
    url: PATH.ADMIN_ROLE,
  },
]

import { Link } from 'react-router-dom'

import { PATH } from '@/utils/constant/_paths'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Album,
  BlocksIcon,
  BookUser,
  CalendarFold,
  HardHat,
  House,
  Presentation,
  Store,
  User2,
  Wallet,
} from 'lucide-react'

export default function AppSidebar() {
  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader>
        <p>BJS</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link to='/dashboard'>
              <House size={20} />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton>
            <User2 size={20} />
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

          <SidebarMenuButton>
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

          <SidebarMenuButton>
            <BlocksIcon size={20} />
            Inventory
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              {InventoryMenus.map((item) => (
                <SidebarMenuSubButton key={`submenu-${item.url}`} asChild>
                  <Link to={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              ))}
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

const hrisMenus = [
  {
    title: 'Pegawai',
    url: PATH.EMPLOYEE,
    icon: User2,
  },
  {
    title: 'Absen',
    url: PATH.EMPLOYEE_ATTENDANCE,
    icon: CalendarFold,
  },
  {
    title: 'Kasbon',
    url: PATH.EMPLOYEE_CASH_ADVANCES,
    icon: Wallet,
  },
]
const ProjectMenus = [
  {
    title: 'Dashboard',
    url: PATH.PROJECT_INDEX,
    icon: HardHat,
  },
  {
    title: 'Kelola',
    url: PATH.PROJECT_MANAGE,
    icon: Presentation,
  },
  {
    title: 'Klien',
    url: PATH.PROJECT_CLIENT,
    icon: BookUser,
  },
]
const InventoryMenus = [
  {
    title: 'Dashboard',
    url: PATH.INVENTORY_INDEX,
    icon: Album,
  },
  {
    title: 'Kelola',
    url: PATH.INVENTORY_STOCK,
    icon: BlocksIcon,
  },
  {
    title: 'Supplier',
    url: PATH.INVENTORY_SUPPLIER,
    icon: Store,
  },
]

import { Link } from 'react-router-dom'

import { PATH } from '@/utils/constant/_paths'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar collapsible='icon' variant='sidebar'>
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

          <SidebarGroupLabel>HRIS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hrisMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ProjectMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {InventoryMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
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

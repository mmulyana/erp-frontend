import { PATH } from './_paths'

const SidebarMenus = [
  {
    name: 'HRIS',
    path: "employee",
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
    name: 'Proyek',
    path: "project",
    menus: [
      {
        name: 'Overview',
        path: PATH.PROJECT_INDEX,
      },
      {
        name: 'View',
        path: PATH.PROJECT_VIEW,
      },
    ],
  },
  {
    name: 'Inventory',
    path: "inventory",
    menus: [
      {
        name: 'Barang',
        path: PATH.INVENTORY_INDEX,
      },
      {
        name: 'Supplier',
        path: PATH.INVENTORY_SUPPLIER,
      },
      {
        name: 'Pengaturan',
        path: PATH.INVENTORY_SETTING,
      },
    ],
  },
  {
    name: 'Admin',
    path: 'admin',
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
]

export default SidebarMenus

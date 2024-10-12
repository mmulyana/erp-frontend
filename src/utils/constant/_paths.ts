export const PATH = {
  BASE: '/',
  LOGIN: '/login',
  FORGOT: '/forgot',
  REGISTER: '/register',
  NOT_FOUND: '*',
  DASHBOARD_OVERVIEW: '/dashboard',
  ACCOUNT: '/dashboard/accounts',
  ROLES: '/dashboard/roles',
  ROLES_PERMISSION: '/dashboard/roles-permission',
  EMPLOYEE: '/dashboard/employee',
  EMPLOYEE_DETAIL: '/dashboard/employee/:detail',
  EMPLOYEE_ADD: '/dashboard/employee/add',
  EMPLOYEE_PAID_LEAVE: '/dashboard/employee/paid-leave',
  EMPLOYEE_ATTENDANCE: '/dashboard/employee/attendance',
  EMPLOYEE_CASH_ADVANCES: '/dashboard/employee/cash-advances',
  EMPLOYEE_ATTENDANCE_SUMMARY: '/dashboard/employee/attendance/summary',

  PROJECT_INDEX: '/dashboard/project',
  PROJECT_MANAGE: '/dashboard/project/manage',
  PROJECT_CLIENT: '/dashboard/project/client',

  INVENTORY_INDEX: '/dashboard/inventory',
  INVENTORY_SUPPLIER: '/dashboard/inventory/supplier',
  INVENTORY_SUPPLIER_EMPLOYEE: '/dashboard/inventory/supplier/:detail',
  INVENTORY_SETTING: '/dashboard/inventory/setting',

  INVENTORY_STOCK: '/dashboard/inventory/manage',
  INVENTORY_STOCK_IN: '/dashboard/inventory/manage/in',
  INVENTORY_STOCK_OUT: '/dashboard/inventory/manage/out',
  INVENTORY_STOCK_OPNAME: '/dashboard/inventory/manage/opname',
  INVENTORY_STOCK_BORROWED: '/dashboard/inventory/manage/borrowed',
  INVENTORY_STOCK_DETAIL: "/dashboard/inventory/detail/:detail"
}

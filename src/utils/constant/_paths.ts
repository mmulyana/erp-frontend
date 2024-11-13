export const PATH = {
  BASE: '/',
  LOGIN: '/login',
  FORGOT: '/forgot',
  NOT_FOUND: '*',
  DASHBOARD_OVERVIEW: '/dashboard',

  EMPLOYEE: '/dashboard/hris/employee',
  EMPLOYEE_DETAIL: '/dashboard/hris/employee/:detail',
  EMPLOYEE_PAID_LEAVE: '/dashboard/hris/paid-leave',
  EMPLOYEE_ATTENDANCE: '/dashboard/hris/attendance',
  EMPLOYEE_CASH_ADVANCES: '/dashboard/hris/cash-advances',
  EMPLOYEE_RECAP: '/dashboard/hris/recap',
  EMPLOYEE_RECAP_REPORT: '/dashboard/hris/recap/:detail',

  PROJECT_INDEX: '/dashboard/project',
  PROJECT_MANAGE: '/dashboard/project/manage',
  PROJECT_CLIENT: '/dashboard/project/client',
  PROJECT_LABEL: '/dashboard/project/label',

  INVENTORY_INDEX: '/dashboard/inventory',
  INVENTORY_SUPPLIER: '/dashboard/inventory/supplier',
  INVENTORY_SUPPLIER_EMPLOYEE: '/dashboard/inventory/supplier/:detail',
  INVENTORY_SETTING: '/dashboard/inventory/setting',
  INVENTORY_STOCK: '/dashboard/inventory/manage',
  INVENTORY_STOCK_IN: '/dashboard/inventory/manage/in',
  INVENTORY_STOCK_OUT: '/dashboard/inventory/manage/out',
  INVENTORY_STOCK_OPNAME: '/dashboard/inventory/manage/opname',
  INVENTORY_STOCK_BORROWED: '/dashboard/inventory/manage/borrowed',

  ADMIN_USER: '/dashboard/admin/users',
  ADMIN_ROLE: '/dashboard/admin/role',
  ADMIN_PERMISSION: '/dashboard/admin/permission',
}

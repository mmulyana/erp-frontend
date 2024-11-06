export const BASE_URL = import.meta.env.VITE_BASE_URL
const V1 = BASE_URL + '/api/v1'

export const URLS = {
  LOGIN: V1 + '/auth/login',
  REGISTER: V1 + '/auth/register',
  CHECK_EMAIL: V1 + '/auth/check/email',
  CHECK_NAME: V1 + '/auth/check/name',
  ACCOUNT: V1 + '/account',
  ROLES: V1 + '/roles',
  PERMISSION_GROUP: V1 + '/permission-group',
  PERMISSION_CHECK: V1 + '/permission/check',
  PERMISSION: V1 + '/permission',
  DASHBOARD: V1 + '/dashboard',

  // HRIS
  HRIS_POSITION: V1 + '/hris/position',
  EMPLOYEE: V1 + '/hris/employee',
  CASH_ADVANCES: V1 + '/hris/cash-advance',
  ATTENDANCE: V1 + '/hris/attendance',
  OVERTIME: V1 + '/hris/overtime',
  COMPETENCY: V1 + '/hris/competency',

  PROJECT: V1 + '/project/index',
  PROJECT_LABEL: V1 + '/project/label',
  PROJECT_CLIENT: V1 + '/project/client',
  PROJECT_CLIENT_COMPANY: V1 + '/project/client-company',
  PROJECT_ACTIVITY: V1 + '/project/activity',
  PROJECT_ESTIMATE: V1 + '/project/estimate',
  PROJECT_ATTACHMENT: V1 + '/project/attachment',
  KANBAN_BOARDD: V1 + '/project/board',

  // INVENTORY
  INVENTORY_GOODS: V1 + '/inventory/goods',
  INVENTORY_CATEGORY: V1 + '/inventory/category',
  INVENTORY_LOCATION: V1 + '/inventory/location',
  INVENTORY_SUPPLIER_TAG: V1 + '/inventory/tag',
  INVENTORY_MEASUREMENT: V1 + '/inventory/measurement',
  INVENTORY_SUPPLIER: V1 + '/inventory/supplier',
  INVENTORY_SUPPLIER_EMPLOYEE: V1 + '/inventory/supplier-employee',
  INVENTORY_SUPPLIER_LABEL: V1 + '/inventory/supplier-label',
  INVENTORY_BRAND: V1 + '/inventory/brand',
  INVENTORY_TRANSACTION: V1 + '/inventory/transaction',
}

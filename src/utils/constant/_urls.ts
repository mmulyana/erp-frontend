const BASE_URL = import.meta.env.VITE_BASE_URL
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
  HRIS_POSITION: V1 + '/hris/position',
  EMPLOYEE: V1 + '/hris/employee',
  LEAVES: V1 + '/hris/leave',
  CASH_ADVANCES: V1 + '/hris/cash-advance',
  ATTENDANCE: V1 + '/hris/attendance',
  OVERTIME: V1 + '/hris/overtime'
}

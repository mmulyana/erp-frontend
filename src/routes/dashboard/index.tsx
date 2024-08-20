import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Permission = lazy(
  () => import('./account-and-roles/permission/index.tsx')
)
const Account = lazy(() => import('./account-and-roles/account/index.tsx'))
const Roles = lazy(() => import('./account-and-roles/roles/index.tsx'))
const Overview = lazy(() => import('./overview/index.tsx'))
const Employee = lazy(() => import('./employee/index.tsx'))

export const dashboardRoutes = [
  {
    path: PATH.DASHBOARD_OVERVIEW,
    element: <Overview />,
  },
  {
    path: PATH.ACCOUNT,
    element: <Account />,
    permission: 'manage_account',
  },
  {
    path: PATH.ROLES,
    element: <Roles />,
    permission: 'manage_role',
  },
  {
    path: PATH.ROLES_PERMISSION,
    element: <Permission />,
    permission: 'manage_role_permission',
  },
  {
    path: PATH.EMPLOYEE,
    element: <Employee />,
    permission: 'manage_employee',
  },
]

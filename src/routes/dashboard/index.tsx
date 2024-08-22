import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Permission = lazy(
  () => import('./account/permission/index.tsx')
)
const Account = lazy(() => import('./account/account/index.tsx'))
const Roles = lazy(() => import('./account/roles/index.tsx'))
const Overview = lazy(() => import('./overview/index.tsx'))
const Employee = lazy(() => import('./hris/employee/index.tsx'))

export const dashboardRoutes = [
  {
    path: PATH.DASHBOARD_OVERVIEW,
    element: <Overview />,
  },
  {
    path: PATH.ACCOUNT,
    element: <Account />,
  },
  {
    path: PATH.ROLES,
    element: <Roles />,
  },
  {
    path: PATH.ROLES_PERMISSION,
    element: <Permission />,
  },
  {
    path: PATH.EMPLOYEE,
    element: <Employee />,
  },
]

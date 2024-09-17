import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Permission = lazy(() => import('./account/permission/index.tsx'))
const Account = lazy(() => import('./account/account/index.tsx'))
const Roles = lazy(() => import('./account/roles/index.tsx'))
const Overview = lazy(() => import('./overview/index.tsx'))
const Employee = lazy(() => import('./hris/employee/index.tsx'))
const EmployeeByPosition = lazy(() => import('./hris/employee/detail/index.tsx'))
const EmployeeCreate = lazy(() => import('./hris/employee/detail/create/index.tsx'))
const Attendance = lazy(() => import('./hris/attendance/index.tsx'))
const AttendanceSummary = lazy(() => import('./hris/attendance/summary/index.tsx'))
const CashAdvance = lazy(() => import('./hris/cash-advance/index.tsx'))
const Leave = lazy(() => import('./hris/leave/index.tsx'))
const Project = lazy(() => import('./project/index.tsx'))
const ProjectView = lazy(() => import('./project/view/index.tsx'))

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
  {
    path: PATH.EMPLOYEE_DETAIL,
    element: <EmployeeByPosition />,
  },
  {
    path: PATH.EMPLOYEE_ADD,
    element: <EmployeeCreate />
  },
  {
    path: PATH.EMPLOYEE_ATTENDANCE,
    element: <Attendance />
  },
  {
    path: PATH.EMPLOYEE_ATTENDANCE_SUMMARY,
    element: <AttendanceSummary />
  },
  {
    path: PATH.EMPLOYEE_CASH_ADVANCES,
    element: <CashAdvance />
  },
  {
    path: PATH.EMPLOYEE_PAID_LEAVE,
    element: <Leave />
  },
  {
    path: PATH.PROJECT_INDEX,
    element: <Project />
  },
  {
    path: PATH.PROJECT_VIEW,
    element: <ProjectView />
  }
]

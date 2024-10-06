import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Permission = lazy(() => import('./account/permission/index.tsx'))
const Account = lazy(() => import('./account/account/index.tsx'))
const Roles = lazy(() => import('./account/roles/index.tsx'))
const Overview = lazy(() => import('./index.tsx'))

// HRIS
const Employee = lazy(() => import('./hris/employee/index.tsx'))
const EmployeeByPosition = lazy(() => import('./hris/employee/detail/index.tsx'))
const EmployeeCreate = lazy(() => import('./hris/employee/detail/create/index.tsx'))
const Attendance = lazy(() => import('./hris/attendance/index.tsx'))
const AttendanceSummary = lazy(() => import('./hris/attendance/summary/index.tsx'))
const CashAdvance = lazy(() => import('./hris/cash-advance/index.tsx'))
const Leave = lazy(() => import('./hris/leave/index.tsx'))

// PROJECT
const Project = lazy(() => import('./project/index.tsx'))
const ProjectView = lazy(() => import('./project/view/index.tsx'))

// INVENTORY
const Inventory = lazy(() => import('./inventory/index.tsx'))
const InventorySupplier = lazy(() => import('./inventory/supplier/index.tsx'))
const InventorySupplierEmployee = lazy(() => import('./inventory/supplier/employee.tsx'))
const InventorySetting = lazy(() => import('./inventory/setting/index.tsx'))
const InventoryStockIn = lazy(() => import('./inventory/manage/stock-in.tsx'))
const InventoryStockOut = lazy(() => import('./inventory/manage/stock-out.tsx'))
const InventoryStockOpname = lazy(() => import('./inventory/manage/stock-opname.tsx'))
const InventoryStockBorrowed = lazy(() => import('./inventory/manage/stock-borrowed.tsx'))

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
    element: <EmployeeCreate />,
  },
  {
    path: PATH.EMPLOYEE_ATTENDANCE,
    element: <Attendance />,
  },
  {
    path: PATH.EMPLOYEE_ATTENDANCE_SUMMARY,
    element: <AttendanceSummary />,
  },
  {
    path: PATH.EMPLOYEE_CASH_ADVANCES,
    element: <CashAdvance />,
  },
  {
    path: PATH.EMPLOYEE_PAID_LEAVE,
    element: <Leave />,
  },
  {
    path: PATH.PROJECT_INDEX,
    element: <Project />,
  },
  {
    path: PATH.PROJECT_VIEW,
    element: <ProjectView />,
  },
  {
    path: PATH.INVENTORY_INDEX,
    element: <Inventory />,
  },
  {
    path: PATH.INVENTORY_SUPPLIER,
    element: <InventorySupplier />,
  },
  {
    path: PATH.INVENTORY_SUPPLIER_EMPLOYEE,
    element: <InventorySupplierEmployee />,
  },
  {
    path: PATH.INVENTORY_SETTING,
    element: <InventorySetting />,
  },
  {
    path: PATH.INVENTORY_STOCK_IN,
    element: <InventoryStockIn />,
  },
  {
    path: PATH.INVENTORY_STOCK_OUT,
    element: <InventoryStockOut />,
  },
  {
    path: PATH.INVENTORY_STOCK_OPNAME,
    element: <InventoryStockOpname />,
  },
  {
    path: PATH.INVENTORY_STOCK_BORROWED,
    element: <InventoryStockBorrowed />,
  },
]

import { PATH } from '@/utils/constant/_paths.ts'
import { lazy } from 'react'

const Overview = lazy(() => import('./overview.tsx'))

// HRIS
const Employee = lazy(() => import('./hris/employee/index.tsx'))
const EmployeeByPosition = lazy(() => import('./hris/employee/detail.tsx'))
const Attendance = lazy(() => import('./hris/attendance/index.tsx'))
const CashAdvance = lazy(() => import('./hris/cash-advance/index.tsx'))
const Report = lazy(() => import('./hris/report/index.tsx'))
const ReportDetail = lazy(() => import('./hris/report/detail.tsx'))

// PROJECT
const ProjectOverview = lazy(() => import('./project/overview.tsx'))
const ProjectView = lazy(() => import('./project/manage.tsx'))
const ProjectClient = lazy(() => import('./project/client.tsx'))

// INVENTORY
const Inventory = lazy(() => import('./inventory/index.tsx'))
const InventorySupplier = lazy(() => import('./inventory/supplier.tsx'))
const InventoryStockIn = lazy(() => import('./inventory/stock/stock-in.tsx'))
const InventoryStockOut = lazy(() => import('./inventory/stock/stock-out.tsx'))
const InventoryStockBorrow = lazy(() => import('./inventory/stock/stock-borrowed.tsx'))
const InventoryStockOpname = lazy(() => import('./inventory/stock/stock-opname.tsx'))

// ADMIN
const User = lazy(() => import('./admin/index.tsx'))
const Role = lazy(() => import('./admin/role.tsx'))

export const dashboardRoutes = [
  {
    path: PATH.DASHBOARD_OVERVIEW,
    element: <Overview />,
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
    path: PATH.EMPLOYEE_ATTENDANCE,
    element: <Attendance />,
  },
  {
    path: PATH.EMPLOYEE_CASH_ADVANCES,
    element: <CashAdvance />,
  },
  {
    path: PATH.PROJECT_INDEX,
    element: <ProjectOverview />,
  },
  {
    path: PATH.PROJECT_MANAGE,
    element: <ProjectView />,
  },
  {
    path: PATH.PROJECT_CLIENT,
    element: <ProjectClient />,
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
    path: PATH.EMPLOYEE_RECAP,
    element: <Report />,
  },
  {
    path: PATH.EMPLOYEE_RECAP_REPORT,
    element: <ReportDetail />,
  },
  {
    path: PATH.ADMIN_USER,
    element: <User />,
  },
  {
    path: PATH.ADMIN_ROLE,
    element: <Role />,
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
    element: <InventoryStockBorrow />,
  },
]

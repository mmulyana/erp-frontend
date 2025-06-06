import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingScreen from '@/shared/components/common/loading-screen'
import ProtectedRoute from '@/shared/utils/protected-route'
import { paths } from '@/shared/constants/paths'
import { RoutesConfig } from '@/shared/types'

const NotFound = lazy(() => import('./pages/not-found'))
const Login = lazy(() => import('./pages/login'))

// HRIS
const HrisDashboard = lazy(() => import('./pages/hris/dashboard'))
const Employee = lazy(() => import('./pages/hris/employee'))
const NewEmployee = lazy(() => import('./pages/hris/new-employee'))
const DetailEmployee = lazy(() => import('./pages/hris/detail-employee'))
const CashAdvance = lazy(() => import('./pages/hris/cash-advance'))
const CashAdvanceDetail = lazy(() => import('./pages/hris/cash-advance-detail'))
const Regular = lazy(() => import('./pages/hris/regular'))
const Overtime = lazy(() => import('./pages/hris/overtime'))
const Payroll = lazy(() => import('./pages/hris/payroll'))
const PayrollDetail = lazy(() => import('./pages/hris/payroll-detail'))
const SalarySlip = lazy(() => import('./pages/hris/salary-slip'))

// PROJECT
const ProjectDashboard = lazy(() => import('./pages/project/dashboard'))
const Projects = lazy(() => import('./pages/project/projects'))
const ProjectNew = lazy(() => import('./pages/project/new-project'))
const Client = lazy(() => import('./pages/project/client'))
const Company = lazy(() => import('./pages/project/company'))
const DetailClient = lazy(() => import('./pages/project/detail-client'))
const DetailCompany = lazy(() => import('./pages/project/detail-company'))
const DetailProject = lazy(() => import('./pages/project/detail-project'))

// INVENTORY
const InventoryDashboard = lazy(() => import('./pages/inventory/dashboard'))
const Item = lazy(() => import('./pages/inventory/item'))
const ItemDetail = lazy(() => import('./pages/inventory/detail-item'))
const Location = lazy(() => import('./pages/inventory/location'))
const LocationDetail = lazy(() => import('./pages/inventory/location-detail'))
const Brand = lazy(() => import('./pages/inventory/brand'))
const BrandDetail = lazy(() => import('./pages/inventory/brand-detail'))
const Supplier = lazy(() => import('./pages/inventory/supplier'))
const SupplierDetail = lazy(() => import('./pages/inventory/detail-supplier'))
const StockIn = lazy(() => import('./pages/inventory/stock-in'))
const StockInDetail = lazy(() => import('./pages/inventory/stock-in-detail'))
const NewStockIn = lazy(() => import('./pages/inventory/new-stock-in'))
const StockOut = lazy(() => import('./pages/inventory/stock-out'))
const StockOutDetail = lazy(() => import('./pages/inventory/stock-out-detail'))
const NewStockOut = lazy(() => import('./pages/inventory/new-stock-out'))
const Loan = lazy(() => import('./pages/inventory/loan'))
const LoanDetail = lazy(() => import('./pages/inventory/loan-detail'))
const NewLoan = lazy(() => import('./pages/inventory/new-loan'))

const Account = lazy(() => import('./pages/account'))
const User = lazy(() => import('./pages/admin/user'))
const Role = lazy(() => import('./pages/admin/role'))
const RoleDetail = lazy(() => import('./pages/admin/detail-role'))

const routes: RoutesConfig[] = [
	{
		path: paths.notFound,
		component: <NotFound />,
		withoutAuth: true,
	},
	{
		path: paths.base,
		component: <Login />,
		withoutAuth: true,
	},
	{
		path: paths.account,
		component: <Account />,
	},

	// project
	{
		path: paths.project,
		component: <ProjectDashboard />,
	},
	{
		path: paths.projectMasterdataProjects,
		component: <Projects />,
	},
	{
		path: paths.projectMasterdataProjectsDetail,
		component: <DetailProject />,
	},
	{
		path: paths.projectMasterdataClient,
		component: <Client />,
	},
	{
		path: paths.projectMasterdataClientDetail,
		component: <DetailClient />,
	},
	{
		path: paths.projectMasterdataClientCompany,
		component: <Company />,
	},
	{
		path: paths.projectMasterdataClientCompanyDetail,
		component: <DetailCompany />,
	},
	{
		path: paths.projectNew,
		component: <ProjectNew />,
	},

	// hris
	{
		path: paths.hris,
		component: <HrisDashboard />,
	},
	{
		path: paths.hrisMasterdataEmployee,
		component: <Employee />,
	},
	{
		path: paths.hrisMasterdataEmployeeCreate,
		component: <NewEmployee />,
	},
	{
		path: paths.hrisMasterdataEmployeeDetail,
		component: <DetailEmployee />,
	},
	{
		path: paths.hrisCashAdvance,
		component: <CashAdvance />,
	},
	{
		path: paths.hrisCashAdvanceDetail,
		component: <CashAdvanceDetail />,
	},
	{
		path: paths.hrisAttendanceRegular,
		component: <Regular />,
	},
	{
		path: paths.hrisAttendanceOvertime,
		component: <Overtime />,
	},
	{
		path: paths.hrisPayroll,
		component: <Payroll />,
	},
	{
		path: paths.hrisPayrollDetail,
		component: <PayrollDetail />,
	},
	{
		path: paths.hrisSalarySlip,
		component: <SalarySlip />,
	},

	// inventory
	{
		path: paths.inventory,
		component: <InventoryDashboard />,
	},
	{
		path: paths.inventoryMasterdataItem,
		component: <Item />,
	},
	{
		path: paths.inventoryMasterdataItemDetail,
		component: <ItemDetail />,
	},
	{
		path: paths.inventoryMasterdataBrand,
		component: <Brand />,
	},
	{
		path: paths.inventoryMasterdataBrandDetail,
		component: <BrandDetail />,
	},
	{
		path: paths.inventoryMasterdataLocation,
		component: <Location />,
	},
	{
		path: paths.inventoryMasterdataLocationDetail,
		component: <LocationDetail />,
	},
	{
		path: paths.inventoryMasterdataSupplier,
		component: <Supplier />,
	},
	{
		path: paths.inventoryMasterdataSupplierDetail,
		component: <SupplierDetail />,
	},
	{
		path: paths.inventoryStockIn,
		component: <StockIn />,
	},
	{
		path: paths.inventoryStockInDetail,
		component: <StockInDetail />,
	},
	{
		path: paths.inventoryStockInNew,
		component: <NewStockIn />,
	},
	{
		path: paths.inventoryStockOut,
		component: <StockOut />,
	},
	{
		path: paths.inventoryStockOutNew,
		component: <NewStockOut />,
	},
	{
		path: paths.inventoryStockOutDetail,
		component: <StockOutDetail />,
	},
	{
		path: paths.inventoryStockLoan,
		component: <Loan />,
	},
	{
		path: paths.inventoryStockLoanDetail,
		component: <LoanDetail />,
	},
	{
		path: paths.inventoryStockLoanNew,
		component: <NewLoan />,
	},

	// admin
	{
		path: paths.adminUser,
		component: <User />,
	},
	{
		path: paths.adminRole,
		component: <Role />,
	},
	{
		path: paths.adminRoleDetail,
		component: <RoleDetail />,
	},
]

export default function MainRoutes() {
	return (
		<Routes>
			{routes.map((item, index) => (
				<Route
					key={index}
					path={item.path}
					element={
						<Suspense fallback={<LoadingScreen />}>
							{!item.withoutAuth ? (
								<ProtectedRoute requiredPermissions={item?.permission || []}>
									{item.component}
								</ProtectedRoute>
							) : (
								item.component
							)}
						</Suspense>
					}
				/>
			))}
		</Routes>
	)
}

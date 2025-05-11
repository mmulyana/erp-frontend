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
const Regular = lazy(() => import('./pages/hris/regular'))
const Overtime = lazy(() => import('./pages/hris/overtime'))
const Payroll = lazy(() => import('./pages/hris/payroll'))

// PROJECT
const ProjectDashboard = lazy(() => import('./pages/project/dashboard'))
const Projects = lazy(() => import('./pages/project/projects'))
const ProjectNew = lazy(() => import('./pages/project/new-project'))
const Client = lazy(() => import('./pages/project/client'))
const Company = lazy(() => import('./pages/project/company'))
const DetailProject = lazy(() => import('./pages/project/detail-project'))

// INVENTORY
const InventoryDashboard = lazy(() => import('./pages/inventory/dashboard'))
const Item = lazy(() => import('./pages/inventory/item'))
const ItemDetail = lazy(() => import('./pages/inventory/detail-item'))
const Location = lazy(() => import('./pages/inventory/location'))
const Brand = lazy(() => import('./pages/inventory/brand'))
const Supplier = lazy(() => import('./pages/inventory/supplier'))
const SupplierDetail = lazy(() => import('./pages/inventory/detail-supplier'))

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
		path: paths.projectMasterdataClientCompany,
		component: <Company />,
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
		path: paths.inventoryMasterdataLocation,
		component: <Location />,
	},
	{
		path: paths.inventoryMasterdataSupplier,
		component: <Supplier />,
	},
	{
		path: paths.inventoryMasterdataSupplierDetail,
		component: <SupplierDetail />,
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

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
const ReportCashAdvance = lazy(() => import('./pages/hris/report-cash-advance'))
const Regular = lazy(() => import('./pages/hris/regular'))
const Overtime = lazy(() => import('./pages/hris/overtime'))
const ReportAttendance = lazy(() => import('./pages/hris/report-attendance'))

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
		withoutAuth: true,
	},
	{
		path: paths.projectMasterdataProjects,
		component: <Projects />,
		withoutAuth: true,
	},
	{
		path: paths.projectMasterdataProjectsDetail,
		component: <DetailProject />,
		withoutAuth: true,
	},
	{
		path: paths.projectMasterdataClient,
		component: <Client />,
		withoutAuth: true,
	},
	{
		path: paths.projectMasterdataClientCompany,
		component: <Company />,
		withoutAuth: true,
	},
	{
		path: paths.projectNew,
		component: <ProjectNew />,
		withoutAuth: true,
	},

	// hris
	{
		path: paths.hris,
		component: <HrisDashboard />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterdataEmployee,
		component: <Employee />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterdataEmployeeCreate,
		component: <NewEmployee />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterdataEmployeeDetail,
		component: <DetailEmployee />,
		withoutAuth: true,
	},
	{
		path: paths.hrisCashAdvance,
		component: <CashAdvance />,
		withoutAuth: true,
	},
	{
		path: paths.hrisCashAdvanceReport,
		component: <ReportCashAdvance />,
		withoutAuth: true,
	},
	{
		path: paths.hrisAttendanceRegular,
		component: <Regular />,
		withoutAuth: true,
	},
	{
		path: paths.hrisAttendanceOvertime,
		component: <Overtime />,
		withoutAuth: true,
	},
	{
		path: paths.hrisAttendanceReport,
		component: <ReportAttendance />,
		withoutAuth: true,
	},

	// inventory
	{
		path: paths.inventory,
		component: <InventoryDashboard />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataItem,
		component: <Item />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataItemDetail,
		component: <ItemDetail />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataBrand,
		component: <Brand />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataLocation,
		component: <Location />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataSupplier,
		component: <Supplier />,
		withoutAuth: true,
	},
	{
		path: paths.inventoryMasterdataSupplierDetail,
		component: <SupplierDetail />,
		withoutAuth: true,
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

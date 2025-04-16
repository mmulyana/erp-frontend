import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingScreen from '@/shared/components/loading-screen'
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

// PROJECT
const ProjectDashboard = lazy(() => import('./pages/project/dashboard'))

// INVENTORY
const InventoryDashboard = lazy(() => import('./pages/inventory/dashboard'))

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
		path: paths.hris,
		component: <HrisDashboard />,
		withoutAuth: true,
	},
	{
		path: paths.project,
		component: <ProjectDashboard />,
		withoutAuth: true,
	},
	{
		path: paths.inventory,
		component: <InventoryDashboard />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterDataEmployee,
		component: <Employee />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterDataEmployeeCreate,
		component: <NewEmployee />,
		withoutAuth: true,
	},
	{
		path: paths.hrisMasterDataEmployeeDetail,
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

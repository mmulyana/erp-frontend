import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingScreen from '@/components/common/loading-screen'

import ProtectedRoute from '@/utils/protected-route'
import { paths } from '@/utils/constant/_paths'

import { RoutesConfig } from '@/shared/types'

const Login = lazy(() => import('./pages/login'))
const User = lazy(() => import('./pages/user'))
const Role = lazy(() => import('./pages/role'))

// HRIS
const HrisDashboard = lazy(() => import('./pages/hris/dashboard'))
const Employee = lazy(() => import('./pages/hris/employee'))
const NewEmployee = lazy(() => import('./pages/hris/new-employee'))

// PROJECT
const ProjectDashboard = lazy(() => import('./pages/project/dashboard'))

// INVENTORY
const InventoryDashboard = lazy(() => import('./pages/inventory/dashboard'))

const routes: RoutesConfig[] = [
	{
		path: paths.base,
		component: <Login />,
		withoutAuth: true,
	},
	{
		path: paths.adminUser,
		component: <User />,
	},
	{
		path: paths.adminRole,
		component: <Role />,
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

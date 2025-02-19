import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingScreen from '@/components/common/loading-screen'
import ProtectedRoute from '@/utils/protected-route'
import { PATH } from '@/utils/constant/_paths'
import { RoutesConfig } from '@/shared/types'

const Login = lazy(() => import('./pages/login'))
const User = lazy(() => import('./pages/user'))
const Role = lazy(() => import('./pages/role'))

const routes: RoutesConfig[] = [
	{
		path: PATH.BASE,
		component: <Login />,
		withoutAuth: true,
	},
	{
		path: PATH.ADMIN_USER,
		component: <User />,
	},
	{
		path: PATH.ADMIN_ROLE,
		component: <Role />,
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
